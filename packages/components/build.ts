import glob from "glob";
import path from "path";
import chokidar from "chokidar";
import { rollup } from "rollup";
import fs from "fs-extra";
import typescript from "@rollup/plugin-typescript";
import externals from "rollup-plugin-node-externals";
import replace from "@rollup/plugin-replace";
import rimraf from "rimraf";
import log from "npmlog";

const platform = getPlatform();

const pkg = fs.readJsonSync(path.join(__dirname, "package.json"));

const argv = process.argv.slice(2);
const startWatch = argv.includes("-watch") || argv.includes("--w");

function getPlatform() {
  const defaultPlatform = "h5";
  const platform = ["h5", "native"];
  const _platform = process.env.BUILD_PLATFORM || defaultPlatform;
  if (platform.includes(_platform)) {
    return _platform;
  } else {
    return defaultPlatform;
  }
}

function onFileChange(file: string, stats: fs.Stats) {
  const shortPath = path.relative(__dirname, path.resolve(__dirname, file));
  const matches = glob.sync(`./src/**/@(${platform}|index).@(ts|tsx)`);
  const isEqual = matches.some((m) => pathsAreEqual(file, m));
  if (stats.isFile() && isEqual) {
    log.info(pkg.name, "file `%s` changed", shortPath);
    toBuildFile(file);
  }
}

function pathsAreEqual(path1: string, path2: string) {
  path1 = path.resolve(path1);
  path2 = path.resolve(path2);
  if (process.platform === "win32") {
    return path1.toLowerCase() === path2.toLowerCase();
  }
  return path1 === path2;
}

function toBuildFile(file: string) {
  return rollup({
    input: file,
    plugins: [
      typescript(), 
      externals(),
      replace({
        __PLATFORM__: JSON.stringify(platform),
        preventAssignment: true,
      }),
    ]
  }).then((bundle) => {
    const outPath = path.dirname(file).replace("src", "dist");
    return bundle.write({
      file: outPath + "/index.js"
    }).then(() => {
      const shortPath = path.relative(__dirname, path.resolve(__dirname, file));
      log.info(pkg.name, "file `%s` compile finished", shortPath);
      return Promise.resolve();
    });
  });
}

function toBuild() {
  glob(`./src/**/${platform}.@(ts|tsx)`, (err, matches) => {
    if (err) throw err;
    rimraf("./dist", (err1) => {
      if (err1) throw err1;
      Promise.all(
        matches.map((file) => {
          return toBuildFile(file);
        })
      ).then(() => {
        log.info(pkg.name, "all files compiled!");
      });
    });
  });
}

function toWatch() {
  log.info(pkg.name, "start watching...");
  rimraf("./dist", (err) => {
    if (err) throw err;
    const watcher = chokidar.watch("./src", {
      usePolling: true,
      interval: 300,
      alwaysStat: true,
      awaitWriteFinish: true,
    }).on("add", onFileChange).on("change", onFileChange);

    process.on("exit", () => {
      log.info(pkg.name, "watch exit!");
      watcher.close();
    });
  });
}

if (startWatch) {
  toWatch();
} else {
  toBuild();
}
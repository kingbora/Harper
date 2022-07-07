const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const HappyPack = require("happypack");
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const PORT = 8080;

const isProd = process.env.NODE_ENV === "production";

const env = isProd ? "production" : "development";

const platform = getPlatform();

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

function resolve(relatedPath) {
  return path.resolve(__dirname, relatedPath);
}

function getStyleLoaders(module) {
  const styleLoaders = [];

  if (isProd) {
    styleLoaders.push(MiniCssExtractPlugin.loader);
  } else {
    styleLoaders.push({
      loader: "thread-loader",
      options: {
        worker: os.cpus().length - 1,
      }
    }, "style-loader");
  }

  styleLoaders.push(
    {
      loader: 'css-loader',
      // TODO: css module source map not work correct
      options: module ? {
        sourceMap: true,
        esModule: true,
        importLoaders: 2,
        modules: {
          // namedExport: true, // 开启后不支持默认default export， import style from "./style.less"
          localIdentName: isProd
            ? "[hash:base64]"
            : "[path][name]__[local]--[hash:base64:5]",
          localIdentContext: resolve("src"),
        }
      } : {
        sourceMap: true,
        importLoaders: 2,
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,//为true,在样式追溯时，显示的是编写时的样式，为false，则为编译后的样式
        postcssOptions: {
          plugins: ["postcss-preset-env"]
        }
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: true,
      }
    }
  );
  return styleLoaders;
}

module.exports = {
  mode: env,
  entry: {
    index: "./src/main.tsx",
  },
  output: {
    path: resolve("dist"),
    filename: isProd ? "js/[name].[contenthash].js" : "js/[name].[hash:4].js",
    chunkFilename: isProd ? "js/[name].[contenthash].js" : "js/[name].[hash:4].js"
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".less"],
    alias: {
      // "react-dom": isProd ? "react-dom" : "@hot-loader/react-dom",
    },
    symlinks: true,
  },
  performance: false,
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
      minSize: 30000, // 模块超过30k自动被抽离成公共模块
      minChunks: 1, // 模块被引用>=1次，便分割
      automaticNameDelimiter: "~", // 命名分隔符
      cacheGroups: {
        default: { // 模块缓存规则，设置为false，默认缓存组将禁用
          minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
          priority: -20, // 优先级
          reuseExistingChunk: true, // 默认使用已有的模块
        },
        vendor: {
          // 过滤需要打入的模块
          // test: module => {
          //   if (module.resource) {
          //     const include = [/[\\/]node_modules[\\/]/].every(reg => {
          //       return reg.test(module.resource);
          //     });
          //     const exclude = [/[\\/]node_modules[\\/](react|redux|antd|react-dom|react-router)/].some(reg => {
          //       return reg.test(module.resource);
          //     });
          //     return include && !exclude;
          //   }
          //   return false;
          // },
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          // minChunks: 1,
          priority: -10,// 确定模块打入的优先级
          reuseExistingChunk: true,// 使用复用已经存在的模块
          enforce: true,
        }
      }
    },
    minimize: isProd,
    minimizer: isProd ? [
      new TerserJSPlugin({ // 多进程压缩
        // 设置缓存目录
        parallel: os.cpus().length - 1,// 开启多进程压缩
        // sourceMap,
        terserOptions: {
          compress: {
            // 删除所有的 `console` 语句
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ] : [],
  },
  devtool: isProd ? false : "eval-cheap-module-source-map",
  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      include: [resolve("src")],
      use: ["happypack/loader?id=happyBabel"]
    }, {
      test: /\.js$/,
      enforce: "pre",
      use: ["source-map-loader"],
    }, {
      test: /\.less$/,
      exclude: [/node_modules/, /\.module\.less$/],
      include: [resolve("src")],
      use: getStyleLoaders()
    }, {
      test: /\.module\.less$/,
      include: [resolve("src")],
      use: getStyleLoaders(true)
    }
    ]
  },
  plugins: [
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader',
        options: {
          babelrc: false,
          cacheDirectory: true, // 启用缓存
          presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
        }
      }],
      //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: false,
    }),
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      __PLATFORM__: JSON.stringify(platform)
    }),
    new HtmlWebpackPlugin({
      template: resolve("index.html"),
    }),
    // new webpack.WatchIgnorePlugin({
    //   paths: [
    //     /css\.d\.ts$/
    //   ]
    // })
  ].concat(isProd ? [new MiniCssExtractPlugin({
    filename: isProd ? "css/style.[contenthash].css" : "css/style.[hash:4].css",
    chunkFilename: isProd ? "css/style.[contenthash].[id].css" : "css/style.[hash:4].[id].css",
  }), new CleanWebpackPlugin()] : []),
  devServer: {
    historyApiFallback: true,
    port: PORT,
  },
};
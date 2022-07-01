### 项目说明
* 使用pnpm管理依赖包
* changesets

### pnpm
#### 命令集
1. 安装依赖包到工程的根目录下
`pnpm install react -w`
2. 开发依赖
`pnpm install webpack -wD`
3. 给某个package单独安装指定依赖，`--filter`可指定具体name名，也可以是文件匹配规则
`pnpm add axios --filter @cus/pgk1`
4. 给某个package单独安装执行命令，`--filter`可指定具体name名，也可以是文件匹配规则
`pnpm --filter "@cus/pkg1" build`
5. 若pkg1中将pkg2作为依赖进行安装
`pnpm install @cus/pkg2 -r --filter @cus/pkg1`

### changeset
#### 初始化工程
1. 安装`pnpm add -Dw @changesets/cli`
2. 初始化`pnpm changeset init`
#### .changeset/config.json参数说明
* changelog: changelog 生成方式
* commit: 不要让 changeset 在 publish 的时候帮我们做 git add
* linked: 配置哪些包要共享版本
* access: 公私有安全设定，内网建议 restricted ，开源使用 public
* baseBranch: 项目主分支
* updateInternalDependencies: 确保某包依赖的包发生 upgrade，该包也要发生 version upgrade 的衡量单位（量级）
* ignore: 不需要变动 version 的包
* ___experimentalUnsafeOptions_WILL_CHANGE_IN_PATCH: 在每次 version 变动时一定无理由 patch 抬升依赖他的那些包的版本，防止陷入 major 优先的未更新问题

### 代码提交规范
type 必须是下面的其中之一：

* feat: 增加新功能
* fix: 修复 bug
* docs: 只改动了文档相关的内容
* style: 不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
* refactor: 代码重构时使用，既不是新增功能也不是代码的bud修复
* perf: 提高性能的修改
* test: 添加或修改测试代码
* build: 构建工具或者外部依赖包的修改，比如更新依赖包的版本
* ci: 持续集成的配置文件或者脚本的修改
* chore: 杂项，其他不需要修改源代码或不需要修改测试代码的修改
* revert: 撤销某次提交

### Mac中husky提交报错问题
#### npm not found
新建`touch ~/.huskyrc`，若为系统node则
```
export PATH="/usr/local/bin/:$PATH"
```
若为nvm则
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```
#### Husky pre commit hook exited with code 3 (error)
使用nvm切换全局统一node，不能vscode command和全局command的node版本不一致
`nvm use default`

### 要点说明
* `"preinstall": "npx only-allow pnpm"`: 该命令会在运行`npm install`或`yarn install`时强制使用pnpm安装依赖

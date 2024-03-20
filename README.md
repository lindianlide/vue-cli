| 包名       | 用途                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| commander  | 命令行工具，读取命令行命令，知道用户想要做什么                                                                                       |
| inquirer   | 交互式命令工具，给用户提供一个提问流方式                                                                                             |
| chalk      | 颜色插件，用来修改命令行输出样式，通过颜色区分 info、error 日志，清晰直观                                                            |
| ora        | 用于显示加载中的效果，类似于前端页面的 loading 效果，想下载模版这种耗时的操作，有了 loading 效果，可以提示用户正在进行中，请耐心等待 |
| globby     | 用于检索文件                                                                                                                         |
| fs-extra   | node fs 文件系统模块的增强版                                                                                                         |
| pacote     | 获取 node 包最新版本等信息                                                                                                           |
| handlebars | 提供了必要的功能，使你可以高效地构建语义化模板                                                                                       |

目录结构

````md
cli-template
├─ .gitignore
├─ README.md
├─ build // 打包后文件夹
├─ project-template // 初始化项目模版
├─ bin.js // 生产环境执行文件入口，具体见下
├─ bin-local.js // 本底调试执行文件入口，具体见下
├─ package.json // 配置文件，具体见下
├─ src
│ ├─ commands // 命令文件夹
│ │ ├─ create.ts // create 命令
│ │ ├─ scope.ts // scope 命令
│ │ ├─ package.ts // package 命令
│ │ └─ utils // 公共函数
│ ├─ index.ts // 入口文件
│ └─ lib // 公共第三方包
│ ├─ consts.ts // 常量
│ ├─ index.ts
│ ├─ logger.ts // 控制台颜色输出
│ └─ spinner.ts // 控制台 loading
├─ tsconfig.json // TypeScript 配置文件
└─ tslint.json // tslint 配置文件

重点需要关注`bin字段`和`files字段`

- `bin字段`见下面（2）
- `files字段`即 npm 的白名单，如下图，npm 官方解释，也就是说发包后需要包括哪些文件，不配置的话默认发布全部文件,所以这里我们配置了`"files": [
  "build",
  "bin.js"
]`，包括 build 跟 bin.js，src 文件夹不在白名单内

```shell
self-cli create project
```
````

# 学习笔记

# 自动部署

## 编写服务器

通过 scp 命令传输文件到远程主机(`-P` 指定传输时使用的端口，默认为22)。

将整个文件夹上传到服务器，不建议在服务器上执行`npm install`，
由于无法保证所有依赖包遵循`semantic version`，重新执行install可能导致包不一致的问题；
或者通过package-lock.json来保证一致性（生产环境中使用`npm ci`命令）。

npm ci: 1. 先会删除掉 node_modules ；
        2. 使用 package-lock.json 下载确切版本的依赖包；
        3. 工程中必须要有 package-lock.json 文件；
        4. ci 命令不会修改 package-lock.json 文件；

## Node.js 的流

[Node.js的流式传输](https://nodejs.org/docs/latest-v13.x/api/stream.html#stream_class_stream_readable)

流式传输需要使用 POST 方法， 同时在请求的 headers 参数中添加
`'Content-Type': 'application/octet-stream'`

## 改造 server

在服务端创建写入流(`createWriteStream`), 将本地文件传输到服务端。

## 实现多文件发布

使用 Node.js 中的压缩包: `Archiver`, `unzipper`;

使用 Stream 的 `pipe` 方法，将一个可读的流导入到可写的流中。

利用压缩、解压实现多文件传输；利用`pipe`方法简化传输代码

# 持续集成 - 发布前检查 

持续集成概念：
* daily build：每天晚上全局build一次，是否可以build成功
* BVT：build verification test，构建的验证测试，属于一种冒烟测试，测试case一般都是最基本最简单的case，对build成功之后的结果进行一个基本的验证

现在前端一般通过Git Hook来完成检查的时机

.git/hook/*.sample
* applypatch-msg.sample
* commit-msg.sample
* fsmonitor-watchman.sample
* post-update.sample
* pre-applypatch.sample
* pre-commit.sample：commit之前的操作，lint之类的操作会放到pre-commit里面
* pre-push.sample：push之前的操作
* pre-rebase.sample
* pre-receive.sample：
* prepare-commit-msg.sample
* update.sample
去掉.sample后缀，变为linux可执行文件，shell脚本编写
同样也可以使用node编写，只需在文件第一行加上 #!/usr/bin/env node

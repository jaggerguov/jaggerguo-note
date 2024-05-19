# 7、node常用知识

## 7.1 node版本管理常用指令

> 在开发过程中，对于不同的开发环境可能需要切换不同的node版本，此过程会涉及到node版本的升级与降级。

一、安装node版本管理模块n（sudo命令）
1. 全局安装n模块
```bash
1|sudo npm install n -g
```
2. 安装当前稳定版本
```bash
1|sudo n stable
```
3. 安装最新版本
```bash
1|sudo n latest
```
4. node版本降级/升级（安装指定 node版本）
```bash
1|sudo n 版本号
```
5. 卸载指定 node版本
```bash
1|sudo n rm 版本号
```
6. 检测目前安装了哪些node版本
```bash
1|n
```
7. 切换 node版本（不会删除已安装的其他版本）
```bash
1|n 版本号
```
8. 查看 node版本号
```bash
1|node -v
```


## 7.2 node基础知识点
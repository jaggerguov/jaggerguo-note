# 基于husky钩子的个性化提交注释处理

### 提出问题:
> 实现git根据特定的commit-msg信息，转化为标准的commit-msg以便于能够生成CHANGELOG.md文件;

```条件如下：```
- 提交的格式为：
```shell

--bug=85713855 XXXXXXXXX
--story=861906211 XXXXXXXX
--task=858211409 XXXXXXXX
```
- 转换后对应的格式：

```shell

fix: --bug=85713855 XXXXXXXXX
feat: --story=861906211 XXXXXXXX
feat: --task=858211409 XXXXXXXX
```
### 分析问题：
1. 提交commit-msg的校验，是否符和提交要求，如果是标准的提交就无需处理；
2. 针对提交的commit-msg进行转换为目标格式；
3. 校验目标格式是否正确；
针对上面3种要求，通过调研给出的方案如下：

功能1，2方案两种：
- 直接在```git```的```hooks```的```commit-msg```中，写shell脚本来完成；
- 通过```husky```来监听```commit-msg```钩子，使用nodejs中来执行shell语句完成；

功能3：
引入commitlint依赖解决。

最终，根据本来是一个前端项目，所以还是采用```husky```来完成```commit-msg```的校验和修改，```commitlint```来完成最后输出的校验。

### 解决问题：
1. 安装依赖 husky,作用就是将git的hooks开放出来，给到开发进行扩展:
```shell
npm install husky --save-dev

```
2. 安装commitlint，用来校验commit信息:
```shell
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```
3.  在工程的根目录下创建 ```commit-msg.js``` 文件来处理```commit-msg```信息:
```JS
/* commit-msg信息
*/

const fs = require('fs');
// 获取命令参数路径
const param = process.argv[process.argv.length - 1]; // 获取git commit消息临时存放文件地址
// 读取msg 
let contentsStr = fs.readFileSync(param).toString();
contentsStr = contentsStr.trim();
//用户提交的msg格式
const customTypeArr = ["--bug", "--story", "--bug"];
const customType = contentsStr.split('=')[0];
// 标准的格式
const standardTypeArr = ['upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert'];
const standardType = contentsStr.split(':')[0];
if (standardTypeArr.indexOf(standardType) > -1) {
  // 正常退出
  process.exit(0);
}
if (customTypeArr.indexOf(customType) > -1) {
  // 组装新的msg
  if (customType === customTypeArr[0]) {
    contentsStr = 'fix: ' + contentsStr;
  } else {

    contentsStr = 'feat: ' + contentsStr;
  }
  // 写参数内容
  fs.writeFileSync(param, contentsStr);
  // 正常退出
  process.exit(0);
} else {
  console.log('\x1B[31m', 'type must be one of [--bug, --story, --task]');
  process.exit(1);
}
```
4. 在工程的根目录下创建```commitlint.config.js```文件来进行校验commit信息：

```js
// commitlint.config.js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    parserPreset: 'conventional-changelog-conventionalcommits',
    rules: {
        'type-enum': [2, 'always', [
            'upd', 'feat', 'fix', 'refactor', 'docs', 'chore', 'style', 'revert'
        ]],
        'body-leading-blank': [0, 'never'],
        'body-max-line-length': [2, 'always', 100],
        'footer-leading-blank': [1, 'always'],
        'footer-max-line-length': [2, 'always', 100],
        'header-max-length': [2, 'always', 100],
        'scope-case': [0, 'never', 'lower-case'],
        'subject-case': [
            0,
            'never'
        ],
        'subject-full-stop': [0, 'never', '.'],
        'type-case': [0, 'always', 'kebab-case'],
    },
};
```

5. 在工程的 ```package.json``` 的 ```husky```添加如下：
```shell
 "husky": {
    "hooks": {
      "commit-msg": "node ./hooks/commit-msg $HUSKY_GIT_PARAMS && commitlint -E HUSKY_GIT_PARAMS"
    }
  }
```
至此，问题已解决。
效果如下：
- commit到仓库：
```bash
 git commit -m"--bug=85713855 XXXXXXXXX"

```
- 查看提交log
```bash
commit cbc5d042c5d4ad6f9609dddde8eb9d6f503db661 (HEAD -> feature/test)
Author: XXX <XXX@XXX.com>
Date:   Tue Mar 9 14:06:17 2021 +0800

    fix: --bug=85713855 XXXXXXXXX
```
5. 生成```CHANGELOG.md```;
 - 安装 ```standard-version``` 依赖：
```shell
npm install standard-version -D
```
- 在```package.json```的```scripts```添加脚本如下：
```js
"scripts": {
    "release": "standard-version",
  },
```
- 运行下面脚本生成```CHANGELOG.md```文件：
```shell
npm run release;
```

### 总结：
>husky 的功能让 git 的钩子变得容易，利用这些钩子可以做好多定制化的事情，可以有效阻止不好的 git commit, git push 等等，上面只是用来解决项目中的一个小问题，更多的功能后面可以根据项目要求，继续探索~


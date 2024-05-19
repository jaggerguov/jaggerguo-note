# JS复制内容到剪切板
最近项目开发，需要实现一个复制内容到剪切板功能，凭借着有问题找google的第一原则，顺利的找到解决方案；
1. 使用原生```document.execCommand()```api实现；
2. 依赖于第三方js插件：```clipboard.js```；

鉴于，方便用原生api实现的就用原生的，减少不必要的引入其他库，根据当前的实际情况选择方案1实现,这里就不赘述方案2；

### 前期准备：
1. 通过[MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)平台查看该api的文档;
> 重点：

```
document暴露 execCommand 方法，该方法允许运行命令来操纵可编辑内容区域的元素。
```
> 语法：
```js
bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)

```

2. 该api的兼容性怎么样：
从下图可以看到，当前的主流浏览器已经支持；

<img src="./img/execCommand.png" lt="图片无法加载时显示的文字"/>


### 需求ui图：

<img src="./img/copy.png" lt="图片无法加载时显示的文字"/>

### 实现：

因为只能操纵可编辑内容区域，所以选中input来显示需要复制的内容，所以使用input标签来显示；

> html:

```html
<input id="vertyCode" value="XXXXXXX" readonly />
<span id="codeCopy">复制</span>
```

> js:

```js
var codeCopy = document.getElementById('codeCopy');
    codeCopy.addEventListener('click', function () {
      var inpt = document.getElementById('vertyCode');
      inpt.select();
      if (document.execCommand('copy')) {
        console.log(document.execCommand('copy'));
      }
    })
```
### 复盘： 
#### 优点： 
1. 使用简单，方便；
2. 兼容性好；
#### 局限性：
1. 操纵可编辑内容区域的元素；导致使用普通的其他元素如：div等不可用；

#### 踩坑：
1. 使用input来显示要复制的内容时，input可编辑，于是使用disabled来禁止编辑，但是禁止后使用该api会不起作用，于是查看input元素文档，使用```readonly```属性完美解决；

### 扩展：
1. 复制任意元素内容（没有条件也要创造条件上）：

```js
 var codeCopy = ocument.getElementById('codeCopy');
    codeCopy.addEventListener('click', () => {
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly');
      document.body.appendChild(input);
      input.setAttribute('value', '复制内容');
      input.select();
      if (document.execCommand('copy')) {
        document.execCommand('copy');
        console.log('复制成功');
      }
      document.body.removeChild(input);
    })
```



# 设计模式

基础的23种，js主要涉及的14种：

1. 单例模式
- 特点： 唯一实例，全局访问；
- 典型实例(登录浮框的生成)：技术：高阶函数、闭包
- 场景：登录
```js
// 懒单例模式
var getSingle = function(fn){
  var result;
  return function(){
    return result||(result=fn.apply(this,arguments));
  }
}

var createLoginLayer = function(){
  var  div;
  div = document.createElement('div');
  div.innerHtml = '我是登录框';
  div.style.display='none';
  document.body.appendChild(div);
  return div;
}

var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick=function(){
  var loginLayer=createSingleLoginLayer();
  loginLayer.style.display='block';
}
```

```js
function Singleton(name){
  this.name=name;
  this.instance=null;
}

Singleton.getInstance=function(name){
  if(!this.instance){
    this.instance = new Login();
  }
  return this.instance;
}

console.log(Singleton.getInstance('obj1'));
console.log(Singleton.getInstance('obj2'));

function Singleton(name){
  this.name = name;
}
Singleton.getInstance=(
  function(name){
  let instance=null;
  return function(name){
    if(!instance){
      instance=new Singleton(name);
    }
    return instance;
  }
}
)();

// 匿名自执行函数、闭包、私有变量给公开出去
const CreateDiv=(
  function(){
    let instance = null;
    function CreateDiv(html){
      if(instance){
        return instance;
      };
      this.html = html;
      this.init();
      return instance=this;
    }
    CreateDiv.prototype.init=function(){
      var div = document.createElement('div');
      div.innerHtml = this.html;
      document.body.appendChild(div);
    }
    return CreateDiv;
})();

// 代理模式

function CreateDiv(html){
  this.html = html;
  this.init();
}

CreateDiv.prototype.init=function(){
  let div = document.createElement('div');
  div.html=this.html;
  document.body.appendChild(div);
}

let ProxySingletonCreateDiv=(
  function(){
    let instance = null;
    return function(html){
      if(!instance){
        instance=new CreateDiv(html);
      }
      return instance;
    }
  }
)();
var a = new ProxySingletonCreateDiv('sven1');
var b = new ProxySingletonCreateDiv('sven2');
console.log(a,b);
```

2. 策略模式
- 特点： 定义算法并封装，可互相替换；
- 意义： 飞机、火车、汽车都可以到达目的地，可替换的。
- 场景： 奖金计算、游戏中动画、表单校验
- 优点：
>1. 利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句；
>2. 提供了对开放-封闭原则的完美支持，将算法封装在独立的策略类中，易于切换、理解、扩展；
>3. 复用性高；
>4. 利用组合和委托来让环境类拥有执行算法的能力，是继承的一种轻便替代方案；
- 缺点：
> 违反最少知识原则；

- 实例1: ```传统的```策略类 + 环境类
```js
const  PerformS=function(){}
PerformS.prototype.calculate=function(salary){
  return salary * 4;
}

const  PerformA=function(){}
PerformS.prototype.calculate=function(salary){
  return salary * 3;
}

const  PerformB=function(){}
PerformS.prototype.calculate=function(salary){
  return salary * 2;
}

function Bound(){
  this.salary=null;
  this.perform=null;
}

Bound.prototype.setSalary=function(salary){
  this.salary=salary;
}
Bound.prototype.setPerform=function(perform){
   this.perform=perform;
}
Bound.prototype.getBound=function(){
  return this.perform.calculate(this.salary);
}

const bounds = new Bound();
bounds.setSalary(100);
bounds.setPerform(new PerformS());
console.log(bounds.getBound());

```

- 实例2: ```js实现```函数形式
```js
const perform={
  "S":function(salary){
    return salary*4;
  },
  "A":function(salary){
    return salary*3;
  },
  "B":function(salary){
    return salary*2;
  }
}

const calculateBound=function(leval,salary){
  return perform[leval](salary);
}
console.log(calculateBound('S',100));
```

3. 代理模式
- 特点： 为对象提供一个代用品或占位符，以便控制对他的访问；

- 保护代理：

- 虚拟代理：代理B会选择在A心情好时再执行new Flower，这是代理模式的另一种形式;
* 实例1 虚拟代理实现图片预加载：
```js
var myImage = (function(){
  var imageNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return{
    setSrc: function(src){
      imgNode.src=src;s
    }
  }
})();

myImage.setSrc('');

var proxyImage=(
  function(){
  var img = new Image;
  img.onload=function(){
    myImage.setSrc(this.src);
  }
  return {
    setSrc:function(src){
      myImage.setSrc('./gif');
      img.src=src;
    }
  }
});
proxyImage.setSrc('');
```


- 缓存代理：为开销大的运算结果提供暂时存储，下次参数一致可直接返回存储的运算结果；


* 实例1 计算乘积
```js
  // 1. 创建求积函数
  var mult = function(){
    console.log("开始计算乘积");
    var a = 1;
    for(let i=0,len=arguments.length;i<len;i++){
      a*=arguments[i];
    }
    return a;
  }

  // 2. 加入缓存代理
  var proxyMult = (function(){
    var cache= {};
    return function(){
      var args = Array.prototype.join.call(arguments,",");
      if(args in cache){
        return cache[args];
      }
      return cache[args] = mult.apply(this,arguments);
    }
  })();
```
* 实例2 用于ajax异步请求数据(分页请求);
- 防火墙代理： 控制网络资源的访问，保护主题防止非法访问；

4. 迭代器模式：

- 特点：迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
- 场景： js的Array.prototype.foreach
* 实例1：实现一个迭代器
```js
var each = function(arr,callback){
  for(let i=0,len=arr.length;i<len;i++){
    if(typeof callback === 'function'){
      callback.call(arr[i],i,arr[i]);
    }
  }
}
```
5. 观察者模式：
- 特点：被观察者《=》观察者（低耦合）
- 场景：登录事件监听
* 实例1 流程控制
```js
startBtn.addEventListener('click',(event)=>{
  console.log('开始执行任务');
  const startTask=new Event('startTask');
  document.dispatchEvent(startTask);
})

document.addEventListener('startTask',(event)=>{
  console.log('产品设计开始');
  document.dispatchEvent(new Event('productSucc'));
})

document.addEventListener('productSucc',(event)=>{
  console.log('开始开发功能');
})
```
6. 发布-订阅模式：
- 特点：发布者《=》第三者《=》订阅者（无耦合）
- 场景：登录事件监听(登录完成后回调执行设置header用户图像=》header主动监听登录完成后修改自己)
* 实例1 网站登录
```js
login.succ((data)=>{header.setAvatar(data.avatar)});
||
//发布登录成功的消息
$.ajax('',(data)=>{
  login.trigger('loginSucc',data); 
});

// 各模块监听登录成功的消息
var header = (function(){
  login.listen('loginSucc',function(data){
    header.setAvatar(data.avatar);
  });
  return{
    setAvatar:function(data){
      console.log('设置header模块的头像')
    }
  }
})()
```

* 实例2 实现中介者
```js
var Event=(function(){
  var clientList={},
  listen,
  trigger,
  remove;
  listen=function(key,fn){
    if(!clientList[key]){
      clientList[key]=[];
    }
    clientList[key].push(fn);
  };
  trigger=function(){
    var key = Array.prototype.shift.call(arguments),
    fns=clientList[key];
    if(!fns || fns.length===0){
      return false;
    }
    for(var i=0,fn;fn=fns[i++];){
      fn.apply(this,arguments);
    }
  };
  remove=function(key,fn){
    var fns = clientList[key];
    if(!fns){
      return false;
    }
    if(!fn){
      fns&&(fns.length=0);
    }else{
      for(var len=fns.length-1;len>=0;len-- ){
        var _fn = fns[len];
        if(_fn===fn){
          fns.splice(len,1);
        }
      }
    }
  }
  return {
    listen,
    trigger,
    remove
  }
})()
```
* 发布-订阅 VS 观察者模式： 像快递的发展， 快递员《=》用户  快递员《=》菜鸟驿站《=》用户
7. 命令模式：
- 特点：执行某些特定事情的指令；
- 场景：请求发送者和请求接收者








## AOP 改善js代码
- 场景，一个函数需要在before => fun => after做一些操作；
fun.before();
fun.after();

```js
Function.prototype.before = function(func){
  var _self = this;
  console.log('_self:',_self);
  return function(){
      if(func.apply(this, arguments)===false){
          return false;
      }
      console.log('this:',this);
      return _self.apply(this, arguments);
  }
}
```
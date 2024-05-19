# 初识NestJs

随着公司新的业务发展，大佬们选用了NestJS框架作为BFF层开发技术栈，不明觉厉，于是赶紧学起来，从此开启了NestJS的入坑之旅。

## 是啥？
>Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架；

## 为啥？
>* Nest.js将TypeScript引入Node.js中并基于Express封装
>* 提供了一个开箱即用的应用程序体系结构，允许开发者及其团队创建高度可测试、可扩展、松散耦合且易于维护的应用程序
>* 文档和生态都很全

## 盘它：
#### 1.跟随NestJS官方指导，快速跑起来一个项目：
1. 安装cli并初始化一个名为my-nest的starter项目：
```bash

npm i -g @nestjs/cli
nest new my-nest

```
安装的过程中提示选择包管理器 npm/yarn 默认是npm，这里我选择的是yarn；
<img src="/nest/create.png" width="50%" lt="图片无法加载时显示的文字"/>

2. 根据步骤1中的提示进入项目,安装依赖,并启动项目：
```bash

cd my-nest
yarn run start

```

3. 打开浏览器并导航到```http://localhost:3000/```

<img src="/nest/helloworld.png" width="50%" lt="图片无法加载时显示的文字"/>

#### 2. 基础项目结构和模块功能

```shell
.my-nest
├── README.md
├── nest-cli.json
├── package.json
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tree.txt
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock

```
##### 1. 控制器（controller）
- 作用：控制器负责处理传入的请求并将响应返回给客户端；起到路由的功能，通常每个控制器具有多个路由，
不同的路由也就是不同的接口执行不同的动作；
创建一个基本的控制器，使用类和装饰器。并使Nest能够创建路由映射（将请求绑定到相应的控制器)
```javascript
app.controller.ts

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```
上面的```app.controller.ts```是个单一的控制器，其实正常项目中使用比较多的场景下面这种，按照业务模块进行划分,例如：
###### 创建业务模块：
如下使用cli创建一个名为```user```的业务模块：
```shell

nest g controller user
```
此时,在```/src```目录下生成如下文件：
```shell
.user
├── user.controller.spec.ts
└── user.controller.ts

```
控制器中代码如下：

```javascript
user.controller.ts

import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {}

```

- @Controller()：控制器的装饰器，接受指定前缀避免路径公共部分重复，如 @Controller('user') 中的```user```

###### 请求：
例如在```user.controller.ts```添加一个GET接口 ```/user/list```
```javascript
user.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('list')
  findAll():any[] {
    return  ['张三','李四']
  }
}

```
同理添加POST请求```/user/add```：
```javascript
  @Post('add')
  create(id:string):string{
    return 'success';
  }
```

- @Get get请求的装饰器，接受指定前缀，如：@Get('list')中的```list```,前装饰```findAll```方法告诉Nest将此路由映射到该方法进行处理，也就是GET调用```/user/list```接口时就映射到此方法。

###### 路径通配符：

```javascript
 @Get('li*t')
  findAll():any[] {
    return  ['张三','李四']
  }
```
其中 *  可以通配```list、lit、li_t```等；

##### 2. 提供服务（Providers）
- 作用：获取控制器中传递的参数进行处理后返回结果；例如对数据库的```CURD```操作等。

```javascript
app.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

同理使用cli创建服务：

```shell
nest g service user
```
此时,在```/src/user```目录下生成如下文件：
```shell
.user
├── user.controller.spec.ts
├── user.controller.ts
├── user.service.spec.ts
└── user.service.ts
```
服务代码如下：
```javascript
user.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll():any[] {
    return ['张三','李四'];
  }

  create(id: string): string {
    return 'success'
  }
}


```
- 依赖注入
在```user.controller.ts```中引入```user.service.ts```,如下：

```javascript
user.controller.ts

import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService){}
  @Get('list')
  findAll():any[] {
    return  this.userService.findAll();
  }

  @Post('add')
  create(id:string):string{
    return this.userService.create(id);
  }
}

```
依赖注入后，将```controller``` 与 ```service```关联起来了。


##### 3. 模块（module）
作用：管理和管理各个模块安排程序树的地方，应用都有一个根模块，模块是用@Module()装饰器注释的类，@Module()装饰提供了元数据；
<img src="/nest/Modules.png" width="50%" lt="图片无法加载时显示的文字"/>

使用cli创建一个```user.module.ts```文件：
```shell
nest g module user
```
在上一节，中```user.controller.ts```和```user.service.ts```在同一个业务模块域中，我们将他们移动到```user.module.ts```中，如下：
```javascript
user.module.ts

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}

```

执行完上面的1、2、3步骤后，就会自动将```src/user```目录下的模块导入到应用模块```（app.module.ts）```如下：
```javascript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}

```
##### 4. 启动应用
最后将```app.module```模块导入到```main.ts```文件中通过NestFactory进行应用的创建；
```javascript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

```
最后src的目录结构：
```shell
.src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
└── user
    ├── user.controller.spec.ts
    ├── user.controller.ts
    ├── user.module.ts
    ├── user.service.spec.ts
    └── user.service.ts
```

使用Postman进行接口调用测试，如下图：
- GET: ```/user/list```
<img src="./nest/GET.jpg" width="50%" lt="图片无法加载时显示的文字"/>

- POST: ```/user/add```
<img src="./nest/POST.jpg" width="50%" lt="图片无法加载时显示的文字"/>


## 总结：
- Nest应用的模块是按业务逻辑划分基本单元，每个单元都包含基本控制器和服务。
- 模块是安排程序树的地方，控制器是处理请求和响应数据的部件，服务处理实际业务逻辑的部件。






 
# 重温： mysql的基础语法

>摸了一天鱼,重温一下mysql的基础语法，以下操作基于mac平台； root/admin_123
## 安装mysql
1. 使用brew工具安装mysql
```shell
brew install mysql
```
2. 查看安装路径：
```shell
 which mysql 
```
## 配置数据库
1. 检查mysql服务进程：
```shell
ps -ef | grep mysqld
```
2. 启动服务：
```shell
 mysql.server start
```
3. 停止服务：
```shell
 mysql.server stop
```
4. 查看服务状态：
```shell
 mysql.server status
```
5. 重启服务状态：
```shell
 mysql.server restart
```
6. 重载配置（不影响数据写入)：
```
mysql.server reload
```
7. 强制重载配置(不影响数据写入)：
```
  mysql.server force-reload
```
6. 退出mysql命令:
<kbd>Ctrl</kbd>+<kbd>D</kbd>

## 连接数据库
```shell
mysql -u root -p 

```
## 操作数据库
#### 1. 新建数据库：
##### 语法：
```
CREATE DATABASE 数据库名
```
##### 实例：

- sql语句：
```shell
CREATE DATABASE mentu;
```
- 效果：
```shell
mysql> CREATE DATABASE mentu;
Query OK, 1 row affected (0.01 sec)
```
#### 2. 查看数据库列表：
##### 语法：
```shell
SHOW DATABASES;
```
##### 实例：
- sql语句：
```shell
SHOW DATABASES;
```
* 效果：
```shell
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| logic_engine       |
| mentu              |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
6 rows in set (0.02 sec)
```
#### 3. 选择数据库：
##### 语法：
```shell
use 数据库名;
```
##### 实例：
- sql语句：
```shell
use mentu;
```
* 效果：
```shell
mysql> use mentu;
Database changed
```
#### 4. 删除数据库：
- sql语句：
```shell
DROP DATABASE;
```
- 效果：
```shell
mysql> DROP DATABASE IF EXISTS mentu;
Query OK, 0 rows affected, 1 warning (0.00 sec)
```

#### 5. 创建数据表：
##### 语法：
```shell
CREATE TABLE table_name (column_name column_type);

```
##### 实例：
- sql语句：
```shell
CREATE TABLE IF NOT EXISTS `user`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `age` INT  NOT NULL,
   `gender` VARCHAR(100)  NOT NULL,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

```

 - 运行效果：

```shell
mysql> CREATE TABLE IF NOT EXISTS `user`(
    ->    `id` INT UNSIGNED AUTO_INCREMENT,
    ->    `name` VARCHAR(100) NOT NULL,
    ->    `age` INT  NOT NULL,
    ->    `gender` VARCHAR(100)  NOT NULL,
    ->    PRIMARY KEY ( `id` )
    -> )ENGINE=InnoDB DEFAULT CHARSET=utf8;
Query OK, 0 rows affected, 1 warning (0.03 sec)
```
#### 6. 查看数据表
* sql语句：
```shell
SHOW TABLES;
```
* 效果：
```shell
mysql> SHOW TABLES;
+-----------------+
| Tables_in_mentu |
+-----------------+
| user            |
+-----------------+
1 row in set (0.00 sec)
```

#### 7. 删除数据表：
##### 语法：
```shell
DROP TABLE table_name ;
```
##### 实例：
- sql语句：
```shell
DROP TABLE user;
```
* 效果：
```shell
mysql> DROP TABLE user;
Query OK, 0 rows affected (0.07 sec)
```
#### 8. 插入数据：
##### 语法：
```
INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );
```
##### 实例：
- sql语句:
```shell
INSERT INTO user (name,age,gender) VALUES ("阿门",18,"female");
```

* 效果：
```schell
mysql> INSERT INTO user (name,age,gender) VALUES ("阿门",18,"female");
Query OK, 1 row affected (0.02 sec)
```
#### 9. 查询数据
先造一些数据：
```shell
user:
+----+--------------+-----+--------+
| id | name         | age | gender |
+----+--------------+-----+--------+
|  1 | 阿门1号      | 188 | female |
|  2 | 阿门1号      |  19 | male   |
|  3 | 阿门2号      |  20 | female |
|  4 | 阿门3号      |  21 | male   |
|  5 | 阿门888号    | 888 | female |
|  6 | 阿门5号      |  23 | male   |
|  7 | 阿门6号      |  24 | female |
|  8 | 阿门7号      |  25 | male   |
|  9 | 阿门8号      |  26 | female |
+----+--------------+-----+--------+

auth:
+----+---------+-------+-----------------+
| id | user_id | level | level_name      |
+----+---------+-------+-----------------+
|  1 | 1       |     0 | 超级管理员      |
|  2 | 2       |     1 | 管理员          |
|  3 | 3       |     1 | 管理员          |
|  4 | 4       |     2 | 操作员          |
|  5 | 5       |     2 | 操作员          |
|  6 | 6       |     2 | 操作员          |
|  7 | 7       |     2 | 操作员          |
|  8 | 8       |     2 | 操作员          |
|  9 | 9       |     2 | 操作员          |
| 10 | 10      |     2 | 操作员          |
+----+---------+-------+-----------------+


student:
+----+--------+-----+---------+
| id | name   | age | country |
+----+--------+-----+---------+
|  1 | 张三   |  12 | USA     |
|  2 | 李四   |  12 | CN      |
|  3 | 王五   |  12 | USA     |
|  4 | 沈六   |  12 | CN      |
+----+--------+-----+--------

teacher:
+----+------+-----+---------+
| id | name | age | country |
+----+------+-----+---------+
|  1 | 老A  |  21 | USA     |
|  2 | 老B  |  22 | CN      |
|  3 | 老C  |  23 | USA     |
|  4 | 老D  |  24 | CN      |
+----+------+-----+---------+
4 rows in set (0.00 sec)
```
##### 语法：
```shell
SELECT column_name,column_name
FROM table_name
[WHERE Clause]
[LIMIT N][ OFFSET M]
```
##### 实例：
1. 读取数据表：
- sql语句：
```shell
SELECT * FROM student;
```

- 效果：
```shell
mysql> SELECT * FROM student;
+----+--------+-----+---------+
| id | name   | age | country |
+----+--------+-----+---------+
|  1 | 张三   |  12 | USA     |
|  2 | 李四   |  12 | CN      |
|  3 | 王五   |  12 | USA     |
|  4 | 沈六   |  12 | CN      |
+----+--------+-----+---------+
4 rows in set (0.00 sec)
```
2. WHERE的使用：
* 语法：
```shell
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
[WHERE condition1 [AND [OR]] condition2.....
```
* 条件：
> 1. 逻辑操作符：AND 或者 OR 指定一个或多个条件;
> 2. 关系操作符： = 、> 、< 、<= 、>=、<> 、!= ;
实例：
- 基础用法1(单表单条件)：
sql语句：
```shell
SELECT name,age FROM user WHERE gender='male';
```
效果：
```shell
mysql> SELECT name,age FROM user WHERE gender='male';
+------------+-----+
| name       | age |
+------------+-----+
| 阿门1号    |  19 |
| 阿门3号    |  21 |
| 阿门5号    |  23 |
| 阿门7号    |  25 |
+------------+-----+
4 rows in set (0.03 sec)
```
- 基础用法2(单表多条件)：
sql语句：
```shell
SELECT name,age FROM user WHERE gender='male' AND age>21 OR age=19;
```
效果：
```shell
mysql> SELECT name,age FROM user WHERE gender='male' AND age>21 OR age=19;
+------------+-----+
| name       | age |
+------------+-----+
| 阿门1号    |  19 |
| 阿门5号    |  23 |
| 阿门7号    |  25 |
+------------+-----+
3 rows in set (0.00 sec)
```
- 基础用法3(多表多条件)：

sql语句：
```shell
SELECT name,age,level_name FROM user,auth WHERE user.id=auth.user_id AND user.age>25;
```
效果：
```shell
mysql> SELECT name,age,level_name FROM user,auth WHERE user.id=auth.user_id AND user.age>25;
+--------------+-----+-----------------+
| name         | age | level_name      |
+--------------+-----+-----------------+
| 阿门1号      | 188 | 超级管理员      |
| 阿门888号    | 888 | 操作员          |
| 阿门8号      |  26 | 操作员          |
+--------------+-----+-----------------+
3 rows in set (0.00 sec)
```

3. like的使用(主要用于模糊查询)：
语法：
```shell
SELECT * from table  WHERE gender LIKE '%fe';
```
实例：
- sql语句:
```shell
SELECT * from user  WHERE gender LIKE '%fe%';

```
- 效果：
```shell
mysql> SELECT * from user  WHERE gender LIKE '%fe%';
+----+--------------+-----+--------+
| id | name         | age | gender |
+----+--------------+-----+--------+
|  1 | 阿门1号      | 188 | female |
|  3 | 阿门2号      |  20 | female |
|  5 | 阿门888号    | 888 | female |
|  7 | 阿门6号      |  24 | female |
|  9 | 阿门8号      |  26 | female |
+----+--------------+-----+--------+
```
4. UNION(联表)：
语法
```shell
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions]
UNION [ALL | DISTINCT]
SELECT expression1, expression2, ... expression_n
FROM tables
[WHERE conditions];
```
实例:
- sql语句：
```shell
SELECT name, age, country
FROM student
UNION ALL
SELECT name, age, country
FROM teacher;
```
- 效果：
```shell
mysql> SELECT name, age, country
    -> FROM student
    -> UNION ALL
    -> SELECT name, age, country
    -> FROM teacher;
+--------+-----+---------+
| name   | age | country |
+--------+-----+---------+
| 张三   |  12 | USA     |
| 李四   |  12 | CN      |
| 王五   |  12 | USA     |
| 沈六   |  12 | CN      |
| 老A    |  21 | USA     |
| 老B    |  22 | CN      |
| 老C    |  23 | USA     |
| 老D    |  24 | CN      |
+--------+-----+---------+
8 rows in set (0.01 sec)
```
5. 排序：

语法：
```shell
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]

```
```ASC```升序 
```DESC```降序

实例：
-sql语句：
```shell
SELECT name, age, country
FROM student
UNION ALL
SELECT name, age, country
FROM teacher ORDER BY age DESC;
```
- 效果：
```shell
mysql> SELECT name, age, country
    -> FROM student
    -> UNION ALL
    -> SELECT name, age, country
    -> FROM teacher ORDER BY age DESC;
+--------+-----+---------+
| name   | age | country |
+--------+-----+---------+
| 老D    |  24 | CN      |
| 老C    |  23 | USA     |
| 老B    |  22 | CN      |
| 老A    |  21 | USA     |
| 张三   |  12 | USA     |
| 李四   |  12 | CN      |
| 王五   |  12 | USA     |
| 沈六   |  12 | CN      |
+--------+-----+---------+
8 rows in set (0.01 sec)

```
#### 10. 更新数据数据：
##### 语法：
```shell
UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]
```
##### 实例：
1. 基础用法:
- sql语句：
```shell
UPDATE user SET name='阿门1号', age='188';
```
- 效果：
```shell
mysql> UPDATE user SET name='阿门1号', age='188';
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```
- 更新后的效果：
```schell
mysql> SELECT * FROM user;
+----+------------+-----+--------+
| id | name       | age | gender |
+----+------------+-----+--------+
|  1 | 阿门1号    | 188 | female |
+----+------------+-----+--------+
1 row in set (0.00 sec)
```
2. 使用WHERE条件:
- 语法：

```shell
UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE condition1 [AND [OR]] condition2.....
```
- 实例:
sql语句：
```shell
UPDATE user SET name='阿门888号', age='888' WHERE id=5;
```
```WHERE```的条件使用参考 <b>查询数据</b> 模块的```WHERE```


#### 11. 删除数据
##### 语法：

```shell

DELETE FROM table_name [WHERE Clause]
```
##### 实例：

- sql语句：

```shell

DELETE FROM user WHERE id=10;
```

```WHERE```的条件使用参考 <b>1.查询数据</b> 模块的```WHERE```使用；

- 效果：
```shell
mysql> DELETE FROM user WHERE id=10;
Query OK, 1 row affected (0.00 sec)
```
- 执行后表的数据：
```shell
mysql> select * from user;
+----+--------------+-----+--------+
| id | name         | age | gender |
+----+--------------+-----+--------+
|  1 | 阿门1号      | 188 | female |
|  2 | 阿门1号      |  19 | male   |
|  3 | 阿门2号      |  20 | female |
|  4 | 阿门3号      |  21 | male   |
|  5 | 阿门888号    | 888 | female |
|  6 | 阿门5号      |  23 | male   |
|  7 | 阿门6号      |  24 | female |
|  8 | 阿门7号      |  25 | male   |
|  9 | 阿门8号      |  26 | female |
+----+--------------+-----+--------+
9 rows in set (0.00 sec)
```
#### 12. 退出myql编辑模式：
```shell
quit;
```

















sql语句：
```shell
CREATE TABLE IF NOT EXISTS `auth`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `user_id` VARCHAR(100) NOT NULL,
   `level` INT  NOT NULL,
   `level_name` VARCHAR(100)  NOT NULL,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO auth (user_id,level,level_name) VALUES (1,0,"超级管理员");
INSERT INTO auth (user_id,level,level_name) VALUES (2,1,"管理员");
INSERT INTO auth (user_id,level,level_name) VALUES (3,1,"管理员");
INSERT INTO auth (user_id,level,level_name) VALUES (4,2,"操作员");
INSERT INTO auth (user_id,level,level_name) VALUES (5,2,"操作员");
INSERT INTO auth (user_id,level,level_name) VALUES (6,2,"操作员");
INSERT INTO auth (user_id,level,level_name) VALUES (7,2,"操作员");
INSERT INTO auth (user_id,level,level_name) VALUES (8,2,"操作员");
INSERT INTO auth (user_id,level,level_name) VALUES (9,2,"操作员");
INSERT INTO auth (user_id,level,level_name) VALUES (10,2,"操作员");


CREATE TABLE IF NOT EXISTS `student`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `age` INT  NOT NULL,
   `country` VARCHAR(100)  NOT NULL,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO student (name,age,country) VALUES ('张三',12,"USA");
INSERT INTO student (name,age,country) VALUES ('李四',12,"CN");
INSERT INTO student (name,age,country) VALUES ('王五',12,"USA");
INSERT INTO student (name,age,country) VALUES ('沈六',12,"CN");


CREATE TABLE IF NOT EXISTS `teacher`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `age` INT  NOT NULL,
   `country` VARCHAR(100)  NOT NULL,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO teacher (name,age,country) VALUES ('老A',21,"USA");
INSERT INTO teacher (name,age,country) VALUES ('老B',22,"CN");
INSERT INTO teacher (name,age,country) VALUES ('老C',23,"USA");
INSERT INTO teacher (name,age,country) VALUES ('老D',24,"CN");

```







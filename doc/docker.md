# docker

### 5.3 容器命令
```shell
# 列出本机正在运行的容器，-a 列出本机所有容器包括终止运行的容器，-q 静默模式只显示容器编号，-l 显示最近创建的容器
$ docker container ls     # 等价于下面这个命令
$ docker ps

# 新建并启动容器
$ docker run [option] [容器名]

# 启动容器
$ docker start [容器ID]/[容器Names]

# 重启容器
$ docker restart [容器ID]/[容器Names]

# 终止容器运行
$ docker kill [容器ID]  # 强行终止，相当于向容器里面的主进程发出 SIGKILL 信号，那些正在进行中的操作会全部丢失
$ docker kill $(docker ps -a -q) # 强行终止所有容器
$ docker stop [容器ID]  # 从容终止，相当于向容器里面的主进程发出 SIGTERM 信号，然后过一段时间再发出 SIGKILL 信号
$ docker stop $(docker ps -a -q) # 终止所有容器

# 终止运行的容器文件，依然会占据硬盘空间，可以使用 docker container rm 命令删除，-f 强制删除可以删除正在运行的容器
$ docker rm [容器ID]
$ docker rm `docker ps -aq`    # 删除所有已经停止的容器，因为没停止的rm删不了需要加-f

# 查看容器的输出，-t加入时间戳，-f跟随最新日志打印，--tail数字显示最后多少条，如果docker run时，没有使用-it，就要用这个命令查看输出
$ docker logs [容器ID]

# 查看容器进程信息
$ docker top [容器ID]/[容器Names]
$ docker port [容器ID]/[容器Names]

# 退出容器
$ exit# 容器退出
ctrl + p + q     # 容器退出，快捷键

# 进入容器
$ docker attach [容器ID]      # 退出容器时会让容器停止，本机的输入直接输到容器中
$ docker exec -it [容器ID] bash   # 退出容器时不会让容器停止，在已运行的容器中执行命令，不创建和启动新的容器

# 设置容器在docker启动时自动启动
$ docker container update --restart=always [容器名字]
```
- 这里要特别说一下 docker run 的 option，因为最常用：
* --name 为容器指定一个名称；
* -d 容器启动后进入后台，并返回容器 ID，即启动守护式容器；
* -P 随机端口映射；
* -p 80:8080 将本地 80 端口映射到容器的 8080 端口；
* bash 容器启动以后，内部第一个执行的命令。这里启动 bash，保证用户可以使用 Shell；
* -i 以交互模式运行容器，通常与 -t 同时使用；
* -t 为容器重新分配一个伪输入终端，容器的 Shell 会映射到当前的 Shell，然后在本机窗口输入的命令，就会传入容器，通常与 -i  同时使用；
* --rm 在容器终止运行后自动删除容器文件；
* --restart=always 设置容器自启动；
* -v /xxx:/yyy 映射命令，把本机的 xxx 目录映射到容器中的 yyy 目录，也就是说改变本机的 xxx 目录下的内容， 容器 yyy 目录中的内容也会改变；

# 安装数据库

```shell
# docker 中下载 mysql
docker pull mysql

#启动
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=Lzslov123! -d mysql

#进入容器
docker exec -it mysql bash

#登录mysql
mysql -u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Lzslov123!';

#添加远程登录用户
CREATE USER 'liaozesong'@'%' IDENTIFIED WITH mysql_native_password BY 'Lzslov123!';
GRANT ALL PRIVILEGES ON *.* TO 'liaozesong'@'%';
$ docker run -itd --name mysql-container -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql

```


### 报错信息：

1. 容器内使用sudo 报bash: sudo: command not found

```shell
  yum install sudo
```

2. 
```bash

[root@afb857d50239 /]# sudo systemctl start docke
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
```


```shell
docker run -itd --name mycentos --privileged=true 300e315adb2f /sbin/init
docker exec -it mycentos /bin/bash
```


sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo


```shell
[root@85427a5b71a6 /]# yum list installed | grep docker
Failed to set locale, defaulting to C.UTF-8


# 解决

 dnf install langpacks-en glibc-all-langpacks -y
```


1. mac 安装 docker;
2. docker 下载 centos镜像；
3. 运行centos容器；
4. centos容器中安装docker;
5. docker安装数据库镜像
6. 


```shell
Last login: Thu Mar 11 19:23:15 on console
➜  ~ enable docke
enable: no such hash table element: docke
➜  ~ enable docker
enable: no such hash table element: docker
➜  ~ docker -h
Flag shorthand -h has been deprecated, please use --help

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default
                           "/Users/jaggerguo/.docker")
  -c, --context string     Name of the context to use to connect to the
                           daemon (overrides DOCKER_HOST env var and
                           default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level
                           ("debug"|"info"|"warn"|"error"|"fatal")
                           (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default
                           "/Users/jaggerguo/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default
                           "/Users/jaggerguo/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default
                           "/Users/jaggerguo/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  app*        Docker App (Docker Inc., v0.9.1-beta3)
  builder     Manage builds
  buildx*     Build with BuildKit (Docker Inc., v0.5.1-docker)
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  scan*       Docker Scan (Docker Inc., v0.5.0)
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/
➜  ~ docker image ls
REPOSITORY   TAG           IMAGE ID       CREATED        SIZE
<none>       <none>        0623857f8795   7 weeks ago    8.94MB
<none>       <none>        d2a52e33df37   7 weeks ago    300MB
golang       1.15-alpine   6af5835b113c   7 weeks ago    300MB
alpine       3.12          389fef711851   2 months ago   5.58MB
➜  ~ docker images  
REPOSITORY   TAG           IMAGE ID       CREATED        SIZE
<none>       <none>        0623857f8795   7 weeks ago    8.94MB
<none>       <none>        d2a52e33df37   7 weeks ago    300MB
golang       1.15-alpine   6af5835b113c   7 weeks ago    300MB
alpine       3.12          389fef711851   2 months ago   5.58MB
➜  ~ docker pull centos
Using default tag: latest
latest: Pulling from library/centos
7a0437f04f83: Downloading 
latest: Pulling from library/centos
7a0437f04f83: Pull complete 
Digest: sha256:5528e8b1b1719d34604c87e11dcd1c0a20bedf46e83b5632cdeac91b8c04efc1
Status: Downloaded newer image for centos:latest
docker.io/library/centos:latest
➜  ~ docker -v                                      
Docker version 20.10.2, build 2291f61
➜  ~ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
b8dfde127a29: Pull complete 
Digest: sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/

➜  ~ docker run hello-world

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/

➜  ~ docker -a
unknown shorthand flag: 'a' in -a
See 'docker --help'.

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default
                           "/Users/jaggerguo/.docker")
  -c, --context string     Name of the context to use to connect to the
                           daemon (overrides DOCKER_HOST env var and
                           default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level
                           ("debug"|"info"|"warn"|"error"|"fatal")
                           (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default
                           "/Users/jaggerguo/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default
                           "/Users/jaggerguo/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default
                           "/Users/jaggerguo/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  app*        Docker App (Docker Inc., v0.9.1-beta3)
  builder     Manage builds
  buildx*     Build with BuildKit (Docker Inc., v0.5.1-docker)
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  scan*       Docker Scan (Docker Inc., v0.5.0)
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/

➜  ~ docker images
REPOSITORY    TAG           IMAGE ID       CREATED        SIZE
hello-world   latest        d1165f221234   5 days ago     13.3kB
<none>        <none>        0623857f8795   7 weeks ago    8.94MB
<none>        <none>        d2a52e33df37   7 weeks ago    300MB
golang        1.15-alpine   6af5835b113c   7 weeks ago    300MB
alpine        3.12          389fef711851   2 months ago   5.58MB
centos        latest        300e315adb2f   3 months ago   209MB
➜  ~ docker run -it --name mycentos0901
"docker run" requires at least 1 argument.
See 'docker run --help'.

Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]

Run a command in a new container
➜  ~ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
➜  ~ docker run -it --name mycentos0901  300e315adb2f
[root@afb857d50239 /]# docker ps
bash: docker: command not found
[root@afb857d50239 /]# ls
bin  etc   lib	  lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr
[root@afb857d50239 /]# docker ps
bash: docker: command not found
[root@afb857d50239 /]# cd ..
[root@afb857d50239 /]# quit  
bash: quit: command not found
[root@afb857d50239 /]# -h
bash: -h: command not found
[root@afb857d50239 /]# ls
bin  etc   lib	  lost+found  mnt  proc  run   srv  tmp  var
dev  home  lib64  media       opt  root  sbin  sys  usr
[root@afb857d50239 /]# docker
bash: docker: command not found
[root@afb857d50239 /]# exit
exit
➜  ~ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
➜  ~ docker ps -a
CONTAINER ID   IMAGE          COMMAND       CREATED          STATUS                            PORTS     NAMES
afb857d50239   300e315adb2f   "/bin/bash"   24 minutes ago   Exited (127) About a minute ago             mycentos0901
d2989f08ff3d   hello-world    "/hello"      15 hours ago     Exited (0) 15 hours ago                     kind_spence
c1a7c9cfa575   hello-world    "/hello"      15 hours ago     Exited (0) 15 hours ago                     youthful_wilbur
➜  ~ docker start mycentos0901
mycentos0901
➜  ~ docker ps
CONTAINER ID   IMAGE          COMMAND       CREATED          STATUS          PORTS     NAMES
afb857d50239   300e315adb2f   "/bin/bash"   30 minutes ago   Up 11 seconds             mycentos0901
➜  ~ docker search mysql
NAME                              DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql                             MySQL is a widely used, open-source relation…   10600     [OK]       
mariadb                           MariaDB Server is a high performing open sou…   3973      [OK]       
mysql/mysql-server                Optimized MySQL Server Docker images. Create…   778                  [OK]
percona                           Percona Server is a fork of the MySQL relati…   528       [OK]       
centos/mysql-57-centos7           MySQL 5.7 SQL database server                   87                   
mysql/mysql-cluster               Experimental MySQL Cluster Docker images. Cr…   79                   
centurylink/mysql                 Image containing mysql. Optimized to be link…   59                   [OK]
bitnami/mysql                     Bitnami MySQL Docker Image                      49                   [OK]
deitch/mysql-backup               REPLACED! Please use http://hub.docker.com/r…   41                   [OK]
databack/mysql-backup             Back up mysql databases to... anywhere!         40                   
prom/mysqld-exporter                                                              37                   [OK]
tutum/mysql                       Base docker image to run a MySQL database se…   35                   
schickling/mysql-backup-s3        Backup MySQL to S3 (supports periodic backup…   29                   [OK]
linuxserver/mysql                 A Mysql container, brought to you by LinuxSe…   27                   
centos/mysql-56-centos7           MySQL 5.6 SQL database server                   20                   
circleci/mysql                    MySQL is a widely used, open-source relation…   20                   
mysql/mysql-router                MySQL Router provides transparent routing be…   18                   
arey/mysql-client                 Run a MySQL client from a docker container      17                   [OK]
fradelg/mysql-cron-backup         MySQL/MariaDB database backup using cron tas…   12                   [OK]
yloeffler/mysql-backup            This image runs mysqldump to backup data usi…   7                    [OK]
openshift/mysql-55-centos7        DEPRECATED: A Centos7 based MySQL v5.5 image…   6                    
devilbox/mysql                    Retagged MySQL, MariaDB and PerconaDB offici…   3                    
ansibleplaybookbundle/mysql-apb   An APB which deploys RHSCL MySQL                2                    [OK]
jelastic/mysql                    An image of the MySQL database server mainta…   1                    
widdpim/mysql-client              Dockerized MySQL Client (5.7) including Curl…   1                    [OK]
➜  ~ docker images
REPOSITORY    TAG           IMAGE ID       CREATED        SIZE
hello-world   latest        d1165f221234   6 days ago     13.3kB
<none>        <none>        0623857f8795   7 weeks ago    8.94MB
<none>        <none>        d2a52e33df37   7 weeks ago    300MB
golang        1.15-alpine   6af5835b113c   7 weeks ago    300MB
alpine        3.12          389fef711851   2 months ago   5.58MB
centos        latest        300e315adb2f   3 months ago   209MB
➜  ~ docker pull mysql
Using default tag: latest
latest: Pulling from library/mysql
45b42c59be33: Pull complete 
b4f790bd91da: Pull complete 
325ae51788e9: Pull complete 
adcb9439d751: Pull complete 
174c7fe16c78: Pull complete 
698058ef136c: Pull complete 
4690143a669e: Pull complete 
f7599a246fd6: Pull complete 
35a55bf0c196: Pull complete 
790ac54f4c47: Pull complete 
b0ddd5d1b543: Pull complete 
1aefd67cb33d: Pull complete 
Digest: sha256:7706e4c382be813b58ef514f2bdac747cd463a6866c6c81165d42a1d0e4fe947
Status: Downloaded newer image for mysql:latest
docker.io/library/mysql:latest
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ 
➜  ~ docker info
Client:
 Context:    default
 Debug Mode: false
 Plugins:
  app: Docker App (Docker Inc., v0.9.1-beta3)
  buildx: Build with BuildKit (Docker Inc., v0.5.1-docker)
  scan: Docker Scan (Docker Inc., v0.5.0)

Server:
 Containers: 3
  Running: 1
  Paused: 0
  Stopped: 2
 Images: 9
 Server Version: 20.10.2
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: true
  Native Overlay Diff: true
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Cgroup Version: 1
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file local logentries splunk syslog
 Swarm: inactive
 Runtimes: io.containerd.runc.v2 io.containerd.runtime.v1.linux runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 269548fa27e0089a8b8278fc4fc781d7f65a939b
 runc version: ff819c7e9184c13b7c2607fe6c30ae19403a7aff
 init version: de40ad0
 Security Options:
  seccomp
   Profile: default
 Kernel Version: 4.19.121-linuxkit
 Operating System: Docker Desktop
 OSType: linux
 Architecture: x86_64
 CPUs: 6
 Total Memory: 1.943GiB
 Name: docker-desktop
 ID: TM2U:IGBX:VTK2:2EEI:SZB3:QMAA:DFEV:F5BF:UT75:IYUD:PVGQ:MU4J
 Docker Root Dir: /var/lib/docker
 Debug Mode: false
 HTTP Proxy: gateway.docker.internal:3128
 HTTPS Proxy: gateway.docker.internal:3129
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: false
 Insecure Registries:
  127.0.0.0/8
 Registry Mirrors:
  https://reg-mirror.qiniu.com/
  http://hub-mirror.c.163.com/
  https://registry.docker-cn.com/
 Live Restore Enabled: false

➜  ~ docker images
REPOSITORY    TAG           IMAGE ID       CREATED        SIZE
hello-world   latest        d1165f221234   6 days ago     13.3kB
mysql         latest        8457e9155715   13 days ago    546MB
<none>        <none>        0623857f8795   7 weeks ago    8.94MB
<none>        <none>        d2a52e33df37   7 weeks ago    300MB
golang        1.15-alpine   6af5835b113c   7 weeks ago    300MB
alpine        3.12          389fef711851   2 months ago   5.58MB
centos        latest        300e315adb2f   3 months ago   209MB
➜  ~ docker run -itd --name mysql-container -p 3307:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
cb45919dd4f93c0c15f91fafa01f7f98fb7263e5ec4dea0ab579eb8187aef8cf
➜  ~ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                               NAMES
cb45919dd4f9   mysql          "docker-entrypoint.s…"   17 seconds ago   Up 16 seconds   33060/tcp, 0.0.0.0:3307->3306/tcp   mysql-container
afb857d50239   300e315adb2f   "/bin/bash"              4 hours ago      Up 4 hours                                          mycentos0901
➜  ~ mysql.server start
Starting MySQL
 SUCCESS! 
➜  ~ 2021-03-12T06:28:59.6NZ mysqld_safe A mysqld process already exists
docker exec -it mysql-container bash
root@cb45919dd4f9:/# mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 11
Server version: 8.0.23 MySQL Community Server - GPL

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.01 sec)

mysql> qiut;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'qiut' at line 1
mysql> exit;
Bye
root@cb45919dd4f9:/# quit;
bash: quit: command not found
root@cb45919dd4f9:/# exit;
exit
➜  ~ docker-compose version 
docker-compose version 1.27.4, build 40524192
docker-py version: 4.3.1
CPython version: 3.7.7
OpenSSL version: OpenSSL 1.1.1g  21 Apr 2020
➜  ~ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                               NAMES
cb45919dd4f9   mysql          "docker-entrypoint.s…"   54 minutes ago   Up 54 minutes   33060/tcp, 0.0.0.0:3307->3306/tcp   mysql-container
afb857d50239   300e315adb2f   "/bin/bash"              5 hours ago      Up 5 hours                                          mycentos0901
➜  ~ docker exec -it mycentos0901  bash  
[root@afb857d50239 /]# sudo yum install yum-utils device-mapper-persistent-data lvm2
bash: sudo: command not found
[root@afb857d50239 /]# curl -sSL https://get.daocloud.io/docker | sh
# Executing docker install script, commit: 3d8fe77c2c46c5b7571f94b42793905e5b3e42e4
+ sh -c 'yum install -y -q yum-utils'
Failed to set locale, defaulting to C.UTF-8
warning: /var/cache/dnf/baseos-f6a80ba95cf937f2/packages/dnf-plugins-core-4.0.17-5.el8.noarch.rpm: Header V3 RSA/SHA256 Signature, key ID 8483c65d: NOKEY
Importing GPG key 0x8483C65D:
 Userid     : "CentOS (CentOS Official Signing Key) <security@centos.org>"
 Fingerprint: 99DB 70FA E1D7 CE22 7FB6 4882 05B5 55B3 8483 C65D
 From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
+ sh -c 'yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo'
Failed to set locale, defaulting to C.UTF-8
Adding repo from: https://download.docker.com/linux/centos/docker-ce.repo
+ '[' stable '!=' stable ']'
+ sh -c 'yum makecache'
Failed to set locale, defaulting to C.UTF-8
CentOS Linux 8 - AppStream                                                                                                                                                                                                    8.8 kB/s | 4.3 kB     00:00    
CentOS Linux 8 - BaseOS                                                                                                                                                                                                       8.1 kB/s | 3.9 kB     00:00    
CentOS Linux 8 - Extras                                                                                                                                                                                                       3.2 kB/s | 1.5 kB     00:00    
Docker CE Stable - x86_64                                                                                                                                                                                                      28 kB/s |  11 kB     00:00    
Metadata cache created.
+ '[' -n '' ']'
+ sh -c 'yum install -y -q docker-ce'
Failed to set locale, defaulting to C.UTF-8
warning: /var/cache/dnf/docker-ce-stable-fa9dc42ab4cec2f4/packages/containerd.io-1.4.4-3.1.el8.x86_64.rpm: Header V4 RSA/SHA512 Signature, key ID 621e9f35: NOKEY
Importing GPG key 0x621E9F35:
 Userid     : "Docker Release (CE rpm) <docker@docker.com>"
 Fingerprint: 060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35
 From       : https://download.docker.com/linux/centos/gpg
If you would like to use Docker as a non-root user, you should now consider
adding your user to the "docker" group with something like:

  sudo usermod -aG docker your-user

Remember that you will have to log out and back in for this to take effect!

WARNING: Adding a user to the "docker" group will grant the ability to run
         containers which can be used to obtain root privileges on the
         docker host.
         Refer to https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface
         for more information.
[root@afb857d50239 /]# docker -v
Docker version 20.10.5, build 55c4c88
[root@afb857d50239 /]# docker

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/root/.docker")
  -c, --context string     Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default "/root/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default "/root/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default "/root/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  app*        Docker App (Docker Inc., v0.9.1-beta3)
  builder     Manage builds
  buildx*     Build with BuildKit (Docker Inc., v0.5.1-docker)
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/
[root@afb857d50239 /]# docker ps
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
[root@afb857d50239 /]# docker images
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
[root@afb857d50239 /]# docker images;
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
[root@afb857d50239 /]# sudo systemctl start docke
bash: sudo: command not found
[root@afb857d50239 /]# start 
bash: start: command not found
[root@afb857d50239 /]# docker start
"docker start" requires at least 1 argument.
See 'docker start --help'.

Usage:  docker start [OPTIONS] CONTAINER [CONTAINER...]

Start one or more stopped containers
[root@afb857d50239 /]#  yum install yum-utils device-mapper-persistent-data lvm2
Failed to set locale, defaulting to C.UTF-8
Last metadata expiration check: 0:05:36 ago on Fri Mar 12 07:24:07 2021.
Package yum-utils-4.0.17-5.el8.noarch is already installed.
Dependencies resolved.
==============================================================================================================================================================================================================================================================
 Package                                                                     Architecture                                         Version                                                          Repository                                            Size
==============================================================================================================================================================================================================================================================
Installing:
 device-mapper-persistent-data                                               x86_64                                               0.8.5-4.el8                                                      baseos                                               468 k
 lvm2                                                                        x86_64                                               8:2.03.09-5.el8                                                  baseos                                               1.6 M
Installing dependencies:
 device-mapper-event                                                         x86_64                                               8:1.02.171-5.el8                                                 baseos                                               268 k
 device-mapper-event-libs                                                    x86_64                                               8:1.02.171-5.el8                                                 baseos                                               267 k
 libaio                                                                      x86_64                                               0.3.112-1.el8                                                    baseos                                                33 k
 lvm2-libs                                                                   x86_64                                               8:2.03.09-5.el8                                                  baseos                                               1.1 M

Transaction Summary
==============================================================================================================================================================================================================================================================
Install  6 Packages

Total download size: 3.7 M
Installed size: 7.6 M
Is this ok [y/N]: y
Downloading Packages:
(1/6): device-mapper-event-libs-1.02.171-5.el8.x86_64.rpm                                                                                                                                                                     565 kB/s | 267 kB     00:00    
(2/6): libaio-0.3.112-1.el8.x86_64.rpm                                                                                                                                                                                        325 kB/s |  33 kB     00:00    
(3/6): device-mapper-event-1.02.171-5.el8.x86_64.rpm                                                                                                                                                                          465 kB/s | 268 kB     00:00    
(4/6): device-mapper-persistent-data-0.8.5-4.el8.x86_64.rpm                                                                                                                                                                   602 kB/s | 468 kB     00:00    
(5/6): lvm2-libs-2.03.09-5.el8.x86_64.rpm                                                                                                                                                                                     1.9 MB/s | 1.1 MB     00:00    
(6/6): lvm2-2.03.09-5.el8.x86_64.rpm                                                                                                                                                                                          1.4 MB/s | 1.6 MB     00:01    
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                                                                         813 kB/s | 3.7 MB     00:04     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                                                      1/1 
  Installing       : libaio-0.3.112-1.el8.x86_64                                                                                                                                                                                                          1/6 
  Installing       : device-mapper-event-libs-8:1.02.171-5.el8.x86_64                                                                                                                                                                                     2/6 
  Installing       : device-mapper-event-8:1.02.171-5.el8.x86_64                                                                                                                                                                                          3/6 
  Running scriptlet: device-mapper-event-8:1.02.171-5.el8.x86_64                                                                                                                                                                                          3/6 
  Installing       : lvm2-libs-8:2.03.09-5.el8.x86_64                                                                                                                                                                                                     4/6 
  Installing       : device-mapper-persistent-data-0.8.5-4.el8.x86_64                                                                                                                                                                                     5/6 
  Installing       : lvm2-8:2.03.09-5.el8.x86_64                                                                                                                                                                                                          6/6 
  Running scriptlet: lvm2-8:2.03.09-5.el8.x86_64                                                                                                                                                                                                          6/6 
  Verifying        : device-mapper-event-8:1.02.171-5.el8.x86_64                                                                                                                                                                                          1/6 
  Verifying        : device-mapper-event-libs-8:1.02.171-5.el8.x86_64                                                                                                                                                                                     2/6 
  Verifying        : device-mapper-persistent-data-0.8.5-4.el8.x86_64                                                                                                                                                                                     3/6 
  Verifying        : libaio-0.3.112-1.el8.x86_64                                                                                                                                                                                                          4/6 
  Verifying        : lvm2-8:2.03.09-5.el8.x86_64                                                                                                                                                                                                          5/6 
  Verifying        : lvm2-libs-8:2.03.09-5.el8.x86_64                                                                                                                                                                                                     6/6 

Installed:
  device-mapper-event-8:1.02.171-5.el8.x86_64    device-mapper-event-libs-8:1.02.171-5.el8.x86_64    device-mapper-persistent-data-0.8.5-4.el8.x86_64    libaio-0.3.112-1.el8.x86_64    lvm2-8:2.03.09-5.el8.x86_64    lvm2-libs-8:2.03.09-5.el8.x86_64   

Complete!
[root@afb857d50239 /]# yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
Failed to set locale, defaulting to C.UTF-8
Adding repo from: https://download.docker.com/linux/centos/docker-ce.repo
[root@afb857d50239 /]# yum install docker-ce
Failed to set locale, defaulting to C.UTF-8
Docker CE Stable - x86_64                                                                                                                                                                                                      13 kB/s | 3.5 kB     00:00    
Package docker-ce-3:20.10.5-3.el8.x86_64 is already installed.
Dependencies resolved.
Nothing to do.
Complete!
[root@afb857d50239 /]# systemctl start docke
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
[root@afb857d50239 /]# sudo System has not been booted with systemd as init system (PID 1). Can't operate.
bash: syntax error near unexpected token `('
[root@afb857d50239 /]# Failed to connect to bus: Host is down
bash: Failed: command not found
[root@afb857d50239 /]# sudo systemctl start docke
bash: sudo: command not found
[root@afb857d50239 /]# sudo systemctl start docker
bash: sudo: command not found
[root@afb857d50239 /]# apt-get update
bash: apt-get: command not found
[root@afb857d50239 /]# wget http://mirrors.163.com/.help/sources.list.squeeze
bash: wget: command not found
[root@afb857d50239 /]# apt-get
bash: apt-get: command not found
[root@afb857d50239 /]# yum install sudo
Failed to set locale, defaulting to C.UTF-8
Last metadata expiration check: 0:10:48 ago on Fri Mar 12 07:30:29 2021.
Dependencies resolved.
==============================================================================================================================================================================================================================================================
 Package                                                  Architecture                                               Version                                                                 Repository                                                  Size
==============================================================================================================================================================================================================================================================
Installing:
 sudo                                                     x86_64                                                     1.8.29-6.el8_3.1                                                        baseos                                                     924 k

Transaction Summary
==============================================================================================================================================================================================================================================================
Install  1 Package

Total download size: 924 k
Installed size: 3.4 M
Is this ok [y/N]: y
Downloading Packages:
sudo-1.8.29-6.el8_3.1.x86_64.rpm                                                                                                                                                                                              1.1 MB/s | 924 kB     00:00    
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                                                                         324 kB/s | 924 kB     00:02     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                                                      1/1 
  Installing       : sudo-1.8.29-6.el8_3.1.x86_64                                                                                                                                                                                                         1/1 
  Running scriptlet: sudo-1.8.29-6.el8_3.1.x86_64                                                                                                                                                                                                         1/1 
  Verifying        : sudo-1.8.29-6.el8_3.1.x86_64                                                                                                                                                                                                         1/1 

Installed:
  sudo-1.8.29-6.el8_3.1.x86_64                                                                                                                                                                                                                                

Complete!
[root@afb857d50239 /]# sudo systemctl start docke
System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to connect to bus: Host is down
[root@afb857d50239 /]# sudo
usage: sudo -h | -K | -k | -V
usage: sudo -v [-AknS] [-g group] [-h host] [-p prompt] [-u user]
usage: sudo -l [-AknS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]
usage: sudo [-AbEHknPS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] [VAR=value] [-i|-s] [<command>]
usage: sudo -e [-AknS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-T timeout] [-u user] file ...
[root@afb857d50239 /]# exit
exit
➜  ~ docker ps                                                   
CONTAINER ID   IMAGE          COMMAND                  CREATED             STATUS             PORTS                               NAMES
cb45919dd4f9   mysql          "docker-entrypoint.s…"   About an hour ago   Up About an hour   33060/tcp, 0.0.0.0:3307->3306/tcp   mysql-container
afb857d50239   300e315adb2f   "/bin/bash"              6 hours ago         Up 5 hours                                             mycentos0901
➜  ~ docker run mycentos0901
Unable to find image 'mycentos0901:latest' locally
docker: Error response from daemon: pull access denied for mycentos0901, repository does not exist or may require 'docker login': denied: requested access to the resource is denied.
See 'docker run --help'.
➜  ~ docker exec -it mycentos0901
"docker exec" requires at least 2 arguments.
See 'docker exec --help'.

Usage:  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]

Run a command in a running container
➜  ~ docker exec -it mycentos0901;
"docker exec" requires at least 2 arguments.
See 'docker exec --help'.

Usage:  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]

Run a command in a running container
➜  ~ docker exec -it mycentos0901  bash
[root@afb857d50239 /]# ls
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@afb857d50239 /]# exit;
exit
➜  ~ ls                          
Applications Desktop      Documents    Downloads    Library      Movies       Music        Pictures     Public       WeDrive      code         conf.ini     github_boke  logs         nohup.out    rdhelper     soft         work
➜  ~ docker ps;
CONTAINER ID   IMAGE          COMMAND                  CREATED       STATUS       PORTS                               NAMES
cb45919dd4f9   mysql          "docker-entrypoint.s…"   2 hours ago   Up 2 hours   33060/tcp, 0.0.0.0:3307->3306/tcp   mysql-container
afb857d50239   300e315adb2f   "/bin/bash"              6 hours ago   Up 5 hours                                       mycentos0901
➜  ~ docker run -itd --name mycentos0901 --privileged=true mycentos0901 /sbin/init
Unable to find image 'mycentos0901:latest' locally
docker: Error response from daemon: pull access denied for mycentos0901, repository does not exist or may require 'docker login': denied: requested access to the resource is denied.
See 'docker run --help'.
➜  ~ 
➜  ~ docker run -itd --name mycentos0901 --privileged=true  /sbin/init 
docker: invalid reference format.
See 'docker run --help'.
➜  ~ docker run -itd mycentos0901 --privileged=true /sbin/init
Unable to find image 'mycentos0901:latest' locally
^[[A^[[A

^C%                                                                                                                                                                                                                                                           ➜  ~ docker images;                                           
REPOSITORY    TAG           IMAGE ID       CREATED        SIZE
hello-world   latest        d1165f221234   6 days ago     13.3kB
mysql         latest        8457e9155715   13 days ago    546MB
<none>        <none>        0623857f8795   7 weeks ago    8.94MB
<none>        <none>        d2a52e33df37   7 weeks ago    300MB
golang        1.15-alpine   6af5835b113c   7 weeks ago    300MB
alpine        3.12          389fef711851   2 months ago   5.58MB
centos        latest        300e315adb2f   3 months ago   209MB
➜  ~ docker stop mycentos0901;
mycentos0901
➜  ~ vim /var/lib/docker/containers/afb857d50239/hostconfig.json
➜  ~  docker rm  afb857d50239      
afb857d50239
➜  ~ docker run -itd --name mycentos --privileged=true 300e315adb2f /sbin/init

85427a5b71a65e17332b06d78d285baa12ab5e64201601a857d9c51baeb48b41
➜  ~ docker exec -it mycentos /bin/bash
[root@85427a5b71a6 /]# sudo
bash: sudo: command not found
[root@85427a5b71a6 /]# yum install sudo
Failed to set locale, defaulting to C.UTF-8
Last metadata expiration check: 0:00:22 ago on Fri Mar 12 08:33:20 2021.
Dependencies resolved.
==============================================================================================================================================================================================================================================================
 Package                                                  Architecture                                               Version                                                                 Repository                                                  Size
==============================================================================================================================================================================================================================================================
Installing:
 sudo                                                     x86_64                                                     1.8.29-6.el8_3.1                                                        baseos                                                     924 k

Transaction Summary
==============================================================================================================================================================================================================================================================
Install  1 Package

Total download size: 924 k
Installed size: 3.4 M
Is this ok [y/N]: y
Downloading Packages:
sudo-1.8.29-6.el8_3.1.x86_64.rpm                                                                                                                                                                                              2.0 MB/s | 924 kB     00:00    
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                                                                         1.0 MB/s | 924 kB     00:00     
warning: /var/cache/dnf/baseos-f6a80ba95cf937f2/packages/sudo-1.8.29-6.el8_3.1.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID 8483c65d: NOKEY
CentOS Linux 8 - BaseOS                                                                                                                                                                                                       1.6 MB/s | 1.6 kB     00:00    
Importing GPG key 0x8483C65D:
 Userid     : "CentOS (CentOS Official Signing Key) <security@centos.org>"
 Fingerprint: 99DB 70FA E1D7 CE22 7FB6 4882 05B5 55B3 8483 C65D
 From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
Is this ok [y/N]: y
Key imported successfully
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                                                      1/1 
  Installing       : sudo-1.8.29-6.el8_3.1.x86_64                                                                                                                                                                                                         1/1 
  Running scriptlet: sudo-1.8.29-6.el8_3.1.x86_64                                                                                                                                                                                                         1/1 
  Verifying        : sudo-1.8.29-6.el8_3.1.x86_64                                                                                                                                                                                                         1/1 

Installed:
  sudo-1.8.29-6.el8_3.1.x86_64                                                                                                                                                                                                                                

Complete!
[root@85427a5b71a6 /]# sudo yum install yum-utils device-mapper-persistent-data lvm2
Failed to set locale, defaulting to C.UTF-8
Last metadata expiration check: 0:03:04 ago on Fri Mar 12 08:33:20 2021.
Dependencies resolved.
==============================================================================================================================================================================================================================================================
 Package                                                                     Architecture                                         Version                                                          Repository                                            Size
==============================================================================================================================================================================================================================================================
Installing:
 device-mapper-persistent-data                                               x86_64                                               0.8.5-4.el8                                                      baseos                                               468 k
 lvm2                                                                        x86_64                                               8:2.03.09-5.el8                                                  baseos                                               1.6 M
 yum-utils                                                                   noarch                                               4.0.17-5.el8                                                     baseos                                                68 k
Installing dependencies:
 device-mapper-event                                                         x86_64                                               8:1.02.171-5.el8                                                 baseos                                               268 k
 device-mapper-event-libs                                                    x86_64                                               8:1.02.171-5.el8                                                 baseos                                               267 k
 dnf-plugins-core                                                            noarch                                               4.0.17-5.el8                                                     baseos                                                66 k
 libaio                                                                      x86_64                                               0.3.112-1.el8                                                    baseos                                                33 k
 lvm2-libs                                                                   x86_64                                               8:2.03.09-5.el8                                                  baseos                                               1.1 M
 python3-dateutil                                                            noarch                                               1:2.6.1-6.el8                                                    baseos                                               251 k
 python3-dnf-plugins-core                                                    noarch                                               4.0.17-5.el8                                                     baseos                                               221 k
 python3-six                                                                 noarch                                               1.11.0-8.el8                                                     baseos                                                38 k

Transaction Summary
==============================================================================================================================================================================================================================================================
Install  11 Packages

Total download size: 4.3 M
Installed size: 9.0 M
Is this ok [y/N]: y
Downloading Packages:
(1/11): device-mapper-event-libs-1.02.171-5.el8.x86_64.rpm                                                                                                                                                                    501 kB/s | 267 kB     00:00    
(2/11): device-mapper-event-1.02.171-5.el8.x86_64.rpm                                                                                                                                                                         442 kB/s | 268 kB     00:00    
(3/11): dnf-plugins-core-4.0.17-5.el8.noarch.rpm                                                                                                                                                                              641 kB/s |  66 kB     00:00    
(4/11): libaio-0.3.112-1.el8.x86_64.rpm                                                                                                                                                                                       395 kB/s |  33 kB     00:00    
(5/11): device-mapper-persistent-data-0.8.5-4.el8.x86_64.rpm                                                                                                                                                                  643 kB/s | 468 kB     00:00    
(6/11): python3-dateutil-2.6.1-6.el8.noarch.rpm                                                                                                                                                                               446 kB/s | 251 kB     00:00    
(7/11): python3-dnf-plugins-core-4.0.17-5.el8.noarch.rpm                                                                                                                                                                      578 kB/s | 221 kB     00:00    
(8/11): python3-six-1.11.0-8.el8.noarch.rpm                                                                                                                                                                                   382 kB/s |  38 kB     00:00    
(9/11): yum-utils-4.0.17-5.el8.noarch.rpm                                                                                                                                                                                     123 kB/s |  68 kB     00:00    
(10/11): lvm2-2.03.09-5.el8.x86_64.rpm                                                                                                                                                                                        807 kB/s | 1.6 MB     00:01    
(11/11): lvm2-libs-2.03.09-5.el8.x86_64.rpm                                                                                                                                                                                   559 kB/s | 1.1 MB     00:02    
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                                                                         1.2 MB/s | 4.3 MB     00:03     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                                                      1/1 
  Installing       : libaio-0.3.112-1.el8.x86_64                                                                                                                                                                                                         1/11 
  Installing       : device-mapper-event-libs-8:1.02.171-5.el8.x86_64                                                                                                                                                                                    2/11 
  Installing       : device-mapper-event-8:1.02.171-5.el8.x86_64                                                                                                                                                                                         3/11 
  Running scriptlet: device-mapper-event-8:1.02.171-5.el8.x86_64                                                                                                                                                                                         3/11 
  Installing       : lvm2-libs-8:2.03.09-5.el8.x86_64                                                                                                                                                                                                    4/11 
  Installing       : device-mapper-persistent-data-0.8.5-4.el8.x86_64                                                                                                                                                                                    5/11 
  Installing       : python3-six-1.11.0-8.el8.noarch                                                                                                                                                                                                     6/11 
  Installing       : python3-dateutil-1:2.6.1-6.el8.noarch                                                                                                                                                                                               7/11 
  Installing       : python3-dnf-plugins-core-4.0.17-5.el8.noarch                                                                                                                                                                                        8/11 
  Installing       : dnf-plugins-core-4.0.17-5.el8.noarch                                                                                                                                                                                                9/11 
  Installing       : yum-utils-4.0.17-5.el8.noarch                                                                                                                                                                                                      10/11 
  Installing       : lvm2-8:2.03.09-5.el8.x86_64                                                                                                                                                                                                        11/11 
  Running scriptlet: lvm2-8:2.03.09-5.el8.x86_64                                                                                                                                                                                                        11/11 
  Verifying        : device-mapper-event-8:1.02.171-5.el8.x86_64                                                                                                                                                                                         1/11 
  Verifying        : device-mapper-event-libs-8:1.02.171-5.el8.x86_64                                                                                                                                                                                    2/11 
  Verifying        : device-mapper-persistent-data-0.8.5-4.el8.x86_64                                                                                                                                                                                    3/11 
  Verifying        : dnf-plugins-core-4.0.17-5.el8.noarch                                                                                                                                                                                                4/11 
  Verifying        : libaio-0.3.112-1.el8.x86_64                                                                                                                                                                                                         5/11 
  Verifying        : lvm2-8:2.03.09-5.el8.x86_64                                                                                                                                                                                                         6/11 
  Verifying        : lvm2-libs-8:2.03.09-5.el8.x86_64                                                                                                                                                                                                    7/11 
  Verifying        : python3-dateutil-1:2.6.1-6.el8.noarch                                                                                                                                                                                               8/11 
  Verifying        : python3-dnf-plugins-core-4.0.17-5.el8.noarch                                                                                                                                                                                        9/11 
  Verifying        : python3-six-1.11.0-8.el8.noarch                                                                                                                                                                                                    10/11 
  Verifying        : yum-utils-4.0.17-5.el8.noarch                                                                                                                                                                                                      11/11 

Installed:
  device-mapper-event-8:1.02.171-5.el8.x86_64   device-mapper-event-libs-8:1.02.171-5.el8.x86_64   device-mapper-persistent-data-0.8.5-4.el8.x86_64   dnf-plugins-core-4.0.17-5.el8.noarch   libaio-0.3.112-1.el8.x86_64     lvm2-8:2.03.09-5.el8.x86_64  
  lvm2-libs-8:2.03.09-5.el8.x86_64              python3-dateutil-1:2.6.1-6.el8.noarch              python3-dnf-plugins-core-4.0.17-5.el8.noarch       python3-six-1.11.0-8.el8.noarch        yum-utils-4.0.17-5.el8.noarch  

Complete!
[root@85427a5b71a6 /]# $ sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
bash: $: command not found
[root@85427a5b71a6 /]# sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
Failed to set locale, defaulting to C.UTF-8
Adding repo from: https://download.docker.com/linux/centos/docker-ce.repo
[root@85427a5b71a6 /]# sudo yum install docker-ce
Failed to set locale, defaulting to C.UTF-8
Docker CE Stable - x86_64                                                                                                                                                                                                      11 kB/s |  11 kB     00:01    
Dependencies resolved.
==============================================================================================================================================================================================================================================================
 Package                                                            Architecture                                 Version                                                                         Repository                                              Size
==============================================================================================================================================================================================================================================================
Installing:
 docker-ce                                                          x86_64                                       3:20.10.5-3.el8                                                                 docker-ce-stable                                        27 M
Installing dependencies:
 checkpolicy                                                        x86_64                                       2.9-1.el8                                                                       baseos                                                 348 k
 container-selinux                                                  noarch                                       2:2.155.0-1.module_el8.3.0+699+d61d9c41                                         appstream                                               51 k
 containerd.io                                                      x86_64                                       1.4.4-3.1.el8                                                                   docker-ce-stable                                        33 M
 diffutils                                                          x86_64                                       3.6-6.el8                                                                       baseos                                                 358 k
 docker-ce-cli                                                      x86_64                                       1:20.10.5-3.el8                                                                 docker-ce-stable                                        33 M
 docker-ce-rootless-extras                                          x86_64                                       20.10.5-3.el8                                                                   docker-ce-stable                                       9.1 M
 fuse-common                                                        x86_64                                       3.2.1-12.el8                                                                    baseos                                                  21 k
 fuse-overlayfs                                                     x86_64                                       1.3.0-2.module_el8.3.0+699+d61d9c41                                             appstream                                               72 k
 fuse3                                                              x86_64                                       3.2.1-12.el8                                                                    baseos                                                  50 k
 fuse3-libs                                                         x86_64                                       3.2.1-12.el8                                                                    baseos                                                  94 k
 jansson                                                            x86_64                                       2.11-3.el8                                                                      baseos                                                  46 k
 libcgroup                                                          x86_64                                       0.41-19.el8                                                                     baseos                                                  70 k
 libnftnl                                                           x86_64                                       1.1.5-4.el8                                                                     baseos                                                  83 k
 libselinux-utils                                                   x86_64                                       2.9-4.el8_3                                                                     baseos                                                 242 k
 libslirp                                                           x86_64                                       4.3.1-1.module_el8.3.0+475+c50ce30b                                             appstream                                               69 k
 nftables                                                           x86_64                                       1:0.9.3-16.el8                                                                  baseos                                                 312 k
 policycoreutils                                                    x86_64                                       2.9-9.el8                                                                       baseos                                                 377 k
 policycoreutils-python-utils                                       noarch                                       2.9-9.el8                                                                       baseos                                                 251 k
 python3-audit                                                      x86_64                                       3.0-0.17.20191104git1c2f876.el8                                                 baseos                                                  86 k
 python3-libselinux                                                 x86_64                                       2.9-4.el8_3                                                                     baseos                                                 283 k
 python3-libsemanage                                                x86_64                                       2.9-3.el8                                                                       baseos                                                 127 k
 python3-policycoreutils                                            noarch                                       2.9-9.el8                                                                       baseos                                                 2.2 M
 python3-setools                                                    x86_64                                       4.3.0-2.el8                                                                     baseos                                                 626 k
 rpm-plugin-selinux                                                 x86_64                                       4.14.3-4.el8                                                                    baseos                                                  75 k
 selinux-policy                                                     noarch                                       3.14.3-54.el8_3.2                                                               baseos                                                 622 k
 selinux-policy-targeted                                            noarch                                       3.14.3-54.el8_3.2                                                               baseos                                                  15 M
 slirp4netns                                                        x86_64                                       1.1.8-1.module_el8.3.0+699+d61d9c41                                             appstream                                               51 k
Enabling module streams:
 container-tools                                                                                                 rhel8                                                                                                                                       

Transaction Summary
==============================================================================================================================================================================================================================================================
Install  28 Packages

Total download size: 124 M
Installed size: 489 M
Is this ok [y/N]: y
Downloading Packages:
(1/28): libslirp-4.3.1-1.module_el8.3.0+475+c50ce30b.x86_64.rpm                                                                                                                                                               303 kB/s |  69 kB     00:00    
(2/28): container-selinux-2.155.0-1.module_el8.3.0+699+d61d9c41.noarch.rpm                                                                                                                                                    199 kB/s |  51 kB     00:00    
(3/28): fuse-overlayfs-1.3.0-2.module_el8.3.0+699+d61d9c41.x86_64.rpm                                                                                                                                                         185 kB/s |  72 kB     00:00    
(4/28): slirp4netns-1.1.8-1.module_el8.3.0+699+d61d9c41.x86_64.rpm                                                                                                                                                            232 kB/s |  51 kB     00:00    
(5/28): checkpolicy-2.9-1.el8.x86_64.rpm                                                                                                                                                                                      824 kB/s | 348 kB     00:00    
(6/28): fuse-common-3.2.1-12.el8.x86_64.rpm                                                                                                                                                                                    74 kB/s |  21 kB     00:00    
(7/28): fuse3-3.2.1-12.el8.x86_64.rpm                                                                                                                                                                                         140 kB/s |  50 kB     00:00    
(8/28): fuse3-libs-3.2.1-12.el8.x86_64.rpm                                                                                                                                                                                    228 kB/s |  94 kB     00:00    
(9/28): diffutils-3.6-6.el8.x86_64.rpm                                                                                                                                                                                        443 kB/s | 358 kB     00:00    
(10/28): jansson-2.11-3.el8.x86_64.rpm                                                                                                                                                                                        244 kB/s |  46 kB     00:00    
(11/28): libcgroup-0.41-19.el8.x86_64.rpm                                                                                                                                                                                     387 kB/s |  70 kB     00:00    
(12/28): libnftnl-1.1.5-4.el8.x86_64.rpm                                                                                                                                                                                      285 kB/s |  83 kB     00:00    
(13/28): libselinux-utils-2.9-4.el8_3.x86_64.rpm                                                                                                                                                                              509 kB/s | 242 kB     00:00    
(14/28): nftables-0.9.3-16.el8.x86_64.rpm                                                                                                                                                                                     410 kB/s | 312 kB     00:00    
(15/28): policycoreutils-2.9-9.el8.x86_64.rpm                                                                                                                                                                                 495 kB/s | 377 kB     00:00    
(16/28): python3-audit-3.0-0.17.20191104git1c2f876.el8.x86_64.rpm                                                                                                                                                             459 kB/s |  86 kB     00:00    
(17/28): policycoreutils-python-utils-2.9-9.el8.noarch.rpm                                                                                                                                                                    436 kB/s | 251 kB     00:00    
(18/28): python3-libsemanage-2.9-3.el8.x86_64.rpm                                                                                                                                                                             626 kB/s | 127 kB     00:00    
(19/28): python3-libselinux-2.9-4.el8_3.x86_64.rpm                                                                                                                                                                            650 kB/s | 283 kB     00:00    
(20/28): rpm-plugin-selinux-4.14.3-4.el8.x86_64.rpm                                                                                                                                                                           594 kB/s |  75 kB     00:00    
(21/28): python3-setools-4.3.0-2.el8.x86_64.rpm                                                                                                                                                                               721 kB/s | 626 kB     00:00    
(22/28): selinux-policy-3.14.3-54.el8_3.2.noarch.rpm                                                                                                                                                                          640 kB/s | 622 kB     00:00    
(23/28): python3-policycoreutils-2.9-9.el8.noarch.rpm                                                                                                                                                                         710 kB/s | 2.2 MB     00:03    
(24/28): selinux-policy-targeted-3.14.3-54.el8_3.2.noarch.rpm                                                                                                                                                                 1.5 MB/s |  15 MB     00:09    
(25/28): docker-ce-20.10.5-3.el8.x86_64.rpm                                                                                                                                                                                   872 kB/s |  27 MB     00:31    
(26/28): containerd.io-1.4.4-3.1.el8.x86_64.rpm                                                                                                                                                                               920 kB/s |  33 MB     00:37    
(27/28): docker-ce-rootless-extras-20.10.5-3.el8.x86_64.rpm                                                                                                                                                                   1.0 MB/s | 9.1 MB     00:08    
(28/28): docker-ce-cli-20.10.5-3.el8.x86_64.rpm                                                                                                                                                                               1.0 MB/s |  33 MB     00:33    
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                                                                         2.6 MB/s | 124 MB     00:48     
warning: /var/cache/dnf/docker-ce-stable-fa9dc42ab4cec2f4/packages/containerd.io-1.4.4-3.1.el8.x86_64.rpm: Header V4 RSA/SHA512 Signature, key ID 621e9f35: NOKEY
Docker CE Stable - x86_64                                                                                                                                                                                                     2.3 kB/s | 1.6 kB     00:00    
Importing GPG key 0x621E9F35:
 Userid     : "Docker Release (CE rpm) <docker@docker.com>"
 Fingerprint: 060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35
 From       : https://download.docker.com/linux/centos/gpg
Is this ok [y/N]: y
Key imported successfully
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                                                      1/1 
  Installing       : python3-libselinux-2.9-4.el8_3.x86_64                                                                                                                                                                                               1/28 
  Installing       : libselinux-utils-2.9-4.el8_3.x86_64                                                                                                                                                                                                 2/28 
  Installing       : python3-libsemanage-2.9-3.el8.x86_64                                                                                                                                                                                                3/28 
  Installing       : python3-setools-4.3.0-2.el8.x86_64                                                                                                                                                                                                  4/28 
  Installing       : docker-ce-cli-1:20.10.5-3.el8.x86_64                                                                                                                                                                                                5/28 
  Running scriptlet: docker-ce-cli-1:20.10.5-3.el8.x86_64                                                                                                                                                                                                5/28 
  Installing       : python3-audit-3.0-0.17.20191104git1c2f876.el8.x86_64                                                                                                                                                                                6/28 
  Installing       : libnftnl-1.1.5-4.el8.x86_64                                                                                                                                                                                                         7/28 
  Running scriptlet: libnftnl-1.1.5-4.el8.x86_64                                                                                                                                                                                                         7/28 
  Running scriptlet: libcgroup-0.41-19.el8.x86_64                                                                                                                                                                                                        8/28 
  Installing       : libcgroup-0.41-19.el8.x86_64                                                                                                                                                                                                        8/28 
  Running scriptlet: libcgroup-0.41-19.el8.x86_64                                                                                                                                                                                                        8/28 
  Installing       : jansson-2.11-3.el8.x86_64                                                                                                                                                                                                           9/28 
  Installing       : nftables-1:0.9.3-16.el8.x86_64                                                                                                                                                                                                     10/28 
  Running scriptlet: nftables-1:0.9.3-16.el8.x86_64                                                                                                                                                                                                     10/28 
  Installing       : fuse3-libs-3.2.1-12.el8.x86_64                                                                                                                                                                                                     11/28 
  Running scriptlet: fuse3-libs-3.2.1-12.el8.x86_64                                                                                                                                                                                                     11/28 
  Installing       : fuse-common-3.2.1-12.el8.x86_64                                                                                                                                                                                                    12/28 
  Installing       : fuse3-3.2.1-12.el8.x86_64                                                                                                                                                                                                          13/28 
  Installing       : fuse-overlayfs-1.3.0-2.module_el8.3.0+699+d61d9c41.x86_64                                                                                                                                                                          14/28 
  Running scriptlet: fuse-overlayfs-1.3.0-2.module_el8.3.0+699+d61d9c41.x86_64                                                                                                                                                                          14/28 
  Installing       : diffutils-3.6-6.el8.x86_64                                                                                                                                                                                                         15/28 
  Running scriptlet: diffutils-3.6-6.el8.x86_64                                                                                                                                                                                                         15/28 
  Installing       : policycoreutils-2.9-9.el8.x86_64                                                                                                                                                                                                   16/28 
  Running scriptlet: policycoreutils-2.9-9.el8.x86_64                                                                                                                                                                                                   16/28 
  Installing       : rpm-plugin-selinux-4.14.3-4.el8.x86_64                                                                                                                                                                                             17/28 
  Installing       : selinux-policy-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                            18/28 
  Running scriptlet: selinux-policy-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                            18/28 
  Running scriptlet: selinux-policy-targeted-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                   19/28 
  Installing       : selinux-policy-targeted-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                   19/28 
  Running scriptlet: selinux-policy-targeted-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                   19/28 
  Installing       : checkpolicy-2.9-1.el8.x86_64                                                                                                                                                                                                       20/28 
  Installing       : python3-policycoreutils-2.9-9.el8.noarch                                                                                                                                                                                           21/28 
  Installing       : policycoreutils-python-utils-2.9-9.el8.noarch                                                                                                                                                                                      22/28 
  Running scriptlet: container-selinux-2:2.155.0-1.module_el8.3.0+699+d61d9c41.noarch                                                                                                                                                                   23/28 
  Installing       : container-selinux-2:2.155.0-1.module_el8.3.0+699+d61d9c41.noarch                                                                                                                                                                   23/28 
  Running scriptlet: container-selinux-2:2.155.0-1.module_el8.3.0+699+d61d9c41.noarch                                                                                                                                                                   23/28 
  Installing       : containerd.io-1.4.4-3.1.el8.x86_64                                                                                                                                                                                                 24/28 
  Running scriptlet: containerd.io-1.4.4-3.1.el8.x86_64                                                                                                                                                                                                 24/28 
  Installing       : libslirp-4.3.1-1.module_el8.3.0+475+c50ce30b.x86_64                                                                                                                                                                                25/28 
  Installing       : slirp4netns-1.1.8-1.module_el8.3.0+699+d61d9c41.x86_64                                                                                                                                                                             26/28 
  Installing       : docker-ce-rootless-extras-20.10.5-3.el8.x86_64                                                                                                                                                                                     27/28 
  Running scriptlet: docker-ce-rootless-extras-20.10.5-3.el8.x86_64                                                                                                                                                                                     27/28 
  Installing       : docker-ce-3:20.10.5-3.el8.x86_64                                                                                                                                                                                                   28/28 
  Running scriptlet: docker-ce-3:20.10.5-3.el8.x86_64                                                                                                                                                                                                   28/28 
  Running scriptlet: container-selinux-2:2.155.0-1.module_el8.3.0+699+d61d9c41.noarch                                                                                                                                                                   28/28 
  Running scriptlet: docker-ce-3:20.10.5-3.el8.x86_64                                                                                                                                                                                                   28/28 
  Verifying        : container-selinux-2:2.155.0-1.module_el8.3.0+699+d61d9c41.noarch                                                                                                                                                                    1/28 
  Verifying        : fuse-overlayfs-1.3.0-2.module_el8.3.0+699+d61d9c41.x86_64                                                                                                                                                                           2/28 
  Verifying        : libslirp-4.3.1-1.module_el8.3.0+475+c50ce30b.x86_64                                                                                                                                                                                 3/28 
  Verifying        : slirp4netns-1.1.8-1.module_el8.3.0+699+d61d9c41.x86_64                                                                                                                                                                              4/28 
  Verifying        : checkpolicy-2.9-1.el8.x86_64                                                                                                                                                                                                        5/28 
  Verifying        : diffutils-3.6-6.el8.x86_64                                                                                                                                                                                                          6/28 
  Verifying        : fuse-common-3.2.1-12.el8.x86_64                                                                                                                                                                                                     7/28 
  Verifying        : fuse3-3.2.1-12.el8.x86_64                                                                                                                                                                                                           8/28 
  Verifying        : fuse3-libs-3.2.1-12.el8.x86_64                                                                                                                                                                                                      9/28 
  Verifying        : jansson-2.11-3.el8.x86_64                                                                                                                                                                                                          10/28 
  Verifying        : libcgroup-0.41-19.el8.x86_64                                                                                                                                                                                                       11/28 
  Verifying        : libnftnl-1.1.5-4.el8.x86_64                                                                                                                                                                                                        12/28 
  Verifying        : libselinux-utils-2.9-4.el8_3.x86_64                                                                                                                                                                                                13/28 
  Verifying        : nftables-1:0.9.3-16.el8.x86_64                                                                                                                                                                                                     14/28 
  Verifying        : policycoreutils-2.9-9.el8.x86_64                                                                                                                                                                                                   15/28 
  Verifying        : policycoreutils-python-utils-2.9-9.el8.noarch                                                                                                                                                                                      16/28 
  Verifying        : python3-audit-3.0-0.17.20191104git1c2f876.el8.x86_64                                                                                                                                                                               17/28 
  Verifying        : python3-libselinux-2.9-4.el8_3.x86_64                                                                                                                                                                                              18/28 
  Verifying        : python3-libsemanage-2.9-3.el8.x86_64                                                                                                                                                                                               19/28 
  Verifying        : python3-policycoreutils-2.9-9.el8.noarch                                                                                                                                                                                           20/28 
  Verifying        : python3-setools-4.3.0-2.el8.x86_64                                                                                                                                                                                                 21/28 
  Verifying        : rpm-plugin-selinux-4.14.3-4.el8.x86_64                                                                                                                                                                                             22/28 
  Verifying        : selinux-policy-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                            23/28 
  Verifying        : selinux-policy-targeted-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                   24/28 
  Verifying        : containerd.io-1.4.4-3.1.el8.x86_64                                                                                                                                                                                                 25/28 
  Verifying        : docker-ce-3:20.10.5-3.el8.x86_64                                                                                                                                                                                                   26/28 
  Verifying        : docker-ce-cli-1:20.10.5-3.el8.x86_64                                                                                                                                                                                               27/28 
  Verifying        : docker-ce-rootless-extras-20.10.5-3.el8.x86_64                                                                                                                                                                                     28/28 

Installed:
  checkpolicy-2.9-1.el8.x86_64                                    container-selinux-2:2.155.0-1.module_el8.3.0+699+d61d9c41.noarch       containerd.io-1.4.4-3.1.el8.x86_64                     diffutils-3.6-6.el8.x86_64                                  
  docker-ce-3:20.10.5-3.el8.x86_64                                docker-ce-cli-1:20.10.5-3.el8.x86_64                                   docker-ce-rootless-extras-20.10.5-3.el8.x86_64         fuse-common-3.2.1-12.el8.x86_64                             
  fuse-overlayfs-1.3.0-2.module_el8.3.0+699+d61d9c41.x86_64       fuse3-3.2.1-12.el8.x86_64                                              fuse3-libs-3.2.1-12.el8.x86_64                         jansson-2.11-3.el8.x86_64                                   
  libcgroup-0.41-19.el8.x86_64                                    libnftnl-1.1.5-4.el8.x86_64                                            libselinux-utils-2.9-4.el8_3.x86_64                    libslirp-4.3.1-1.module_el8.3.0+475+c50ce30b.x86_64         
  nftables-1:0.9.3-16.el8.x86_64                                  policycoreutils-2.9-9.el8.x86_64                                       policycoreutils-python-utils-2.9-9.el8.noarch          python3-audit-3.0-0.17.20191104git1c2f876.el8.x86_64        
  python3-libselinux-2.9-4.el8_3.x86_64                           python3-libsemanage-2.9-3.el8.x86_64                                   python3-policycoreutils-2.9-9.el8.noarch               python3-setools-4.3.0-2.el8.x86_64                          
  rpm-plugin-selinux-4.14.3-4.el8.x86_64                          selinux-policy-3.14.3-54.el8_3.2.noarch                                selinux-policy-targeted-3.14.3-54.el8_3.2.noarch       slirp4netns-1.1.8-1.module_el8.3.0+699+d61d9c41.x86_64      

Complete!
[root@85427a5b71a6 /]# sudo systemctl start docke
Failed to start docke.service: Unit docke.service not found.
[root@85427a5b71a6 /]# docker

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/root/.docker")
  -c, --context string     Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default "/root/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default "/root/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default "/root/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  app*        Docker App (Docker Inc., v0.9.1-beta3)
  builder     Manage builds
  buildx*     Build with BuildKit (Docker Inc., v0.5.1-docker)
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/
[root@85427a5b71a6 /]# docker start
"docker start" requires at least 1 argument.
See 'docker start --help'.

Usage:  docker start [OPTIONS] CONTAINER [CONTAINER...]

Start one or more stopped containers
[root@85427a5b71a6 /]# docker images;
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
[root@85427a5b71a6 /]# sudo systemctl start docker
Job for docker.service failed because the control process exited with error code.
See "systemctl status docker.service" and "journalctl -xe" for details.
[root@85427a5b71a6 /]# yum list installed | grep docker
Failed to set locale, defaulting to C.UTF-8
containerd.io.x86_64                 1.4.4-3.1.el8                           @docker-ce-stable
docker-ce.x86_64                     3:20.10.5-3.el8                         @docker-ce-stable
docker-ce-cli.x86_64                 1:20.10.5-3.el8                         @docker-ce-stable
docker-ce-rootless-extras.x86_64     20.10.5-3.el8                           @docker-ce-stable
[root@85427a5b71a6 /]# yum -y remove docker.x86_64
Failed to set locale, defaulting to C.UTF-8
No match for argument: docker.x86_64
No packages marked for removal.
Dependencies resolved.
Nothing to do.
Complete!
[root@85427a5b71a6 /]# 
[root@85427a5b71a6 /]# yum list installed | grep docker
Failed to set locale, defaulting to C.UTF-8
containerd.io.x86_64                 1.4.4-3.1.el8                           @docker-ce-stable
docker-ce.x86_64                     3:20.10.5-3.el8                         @docker-ce-stable
docker-ce-cli.x86_64                 1:20.10.5-3.el8                         @docker-ce-stable
docker-ce-rootless-extras.x86_64     20.10.5-3.el8                           @docker-ce-stable
[root@85427a5b71a6 /]# yum -y remove docker-ce.x86_64  
Failed to set locale, defaulting to C.UTF-8
Dependencies resolved.
==============================================================================================================================================================================================================================================================
 Package                                                            Architecture                                 Version                                                                        Repository                                               Size
==============================================================================================================================================================================================================================================================
Removing:
 docker-ce                                                          x86_64                                       3:20.10.5-3.el8                                                                @docker-ce-stable                                       115 M
Removing unused dependencies:
 checkpolicy                                                        x86_64                                       2.9-1.el8                                                                      @baseos                                                 1.7 M
 container-selinux                                                  noarch                                       2:2.155.0-1.module_el8.3.0+699+d61d9c41                                        @appstream                                               46 k
 containerd.io                                                      x86_64                                       1.4.4-3.1.el8                                                                  @docker-ce-stable                                       128 M
 docker-ce-cli                                                      x86_64                                       1:20.10.5-3.el8                                                                @docker-ce-stable                                       156 M
 docker-ce-rootless-extras                                          x86_64                                       20.10.5-3.el8                                                                  @docker-ce-stable                                        24 M
 fuse-common                                                        x86_64                                       3.2.1-12.el8                                                                   @baseos                                                 4.7 k
 fuse-overlayfs                                                     x86_64                                       1.3.0-2.module_el8.3.0+699+d61d9c41                                            @appstream                                              145 k
 fuse3                                                              x86_64                                       3.2.1-12.el8                                                                   @baseos                                                  90 k
 fuse3-libs                                                         x86_64                                       3.2.1-12.el8                                                                   @baseos                                                 279 k
 jansson                                                            x86_64                                       2.11-3.el8                                                                     @baseos                                                  87 k
 libcgroup                                                          x86_64                                       0.41-19.el8                                                                    @baseos                                                 136 k
 libnftnl                                                           x86_64                                       1.1.5-4.el8                                                                    @baseos                                                 217 k
 libselinux-utils                                                   x86_64                                       2.9-4.el8_3                                                                    @baseos                                                 302 k
 libslirp                                                           x86_64                                       4.3.1-1.module_el8.3.0+475+c50ce30b                                            @appstream                                              129 k
 nftables                                                           x86_64                                       1:0.9.3-16.el8                                                                 @baseos                                                 792 k
 policycoreutils                                                    x86_64                                       2.9-9.el8                                                                      @baseos                                                 657 k
 policycoreutils-python-utils                                       noarch                                       2.9-9.el8                                                                      @baseos                                                 137 k
 python3-audit                                                      x86_64                                       3.0-0.17.20191104git1c2f876.el8                                                @baseos                                                 325 k
 python3-libselinux                                                 x86_64                                       2.9-4.el8_3                                                                    @baseos                                                 771 k
 python3-libsemanage                                                x86_64                                       2.9-3.el8                                                                      @baseos                                                 438 k
 python3-policycoreutils                                            noarch                                       2.9-9.el8                                                                      @baseos                                                 5.4 M
 python3-setools                                                    x86_64                                       4.3.0-2.el8                                                                    @baseos                                                 2.6 M
 rpm-plugin-selinux                                                 x86_64                                       4.14.3-4.el8                                                                   @baseos                                                  12 k
 selinux-policy                                                     noarch                                       3.14.3-54.el8_3.2                                                              @baseos                                                  24 k
 selinux-policy-targeted                                            noarch                                       3.14.3-54.el8_3.2                                                              @baseos                                                  50 M
 slirp4netns                                                        x86_64                                       1.1.8-1.module_el8.3.0+699+d61d9c41                                            @appstream                                               98 k

Transaction Summary
==============================================================================================================================================================================================================================================================
Remove  27 Packages

Freed space: 488 M
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                                                      1/1 
  Running scriptlet: docker-ce-3:20.10.5-3.el8.x86_64                                                                                                                                                                                                     1/1 
  Running scriptlet: docker-ce-3:20.10.5-3.el8.x86_64                                                                                                                                                                                                    1/27 
  Erasing          : docker-ce-3:20.10.5-3.el8.x86_64                                                                                                                                                                                                    1/27 
  Running scriptlet: docker-ce-3:20.10.5-3.el8.x86_64                                                                                                                                                                                                    1/27 
  Running scriptlet: nftables-1:0.9.3-16.el8.x86_64                                                                                                                                                                                                      2/27 
  Erasing          : nftables-1:0.9.3-16.el8.x86_64                                                                                                                                                                                                      2/27 
  Running scriptlet: nftables-1:0.9.3-16.el8.x86_64                                                                                                                                                                                                      2/27 
  Running scriptlet: docker-ce-rootless-extras-20.10.5-3.el8.x86_64                                                                                                                                                                                      3/27 
  Erasing          : docker-ce-rootless-extras-20.10.5-3.el8.x86_64                                                                                                                                                                                      3/27 
  Running scriptlet: docker-ce-rootless-extras-20.10.5-3.el8.x86_64                                                                                                                                                                                      3/27 
  Running scriptlet: containerd.io-1.4.4-3.1.el8.x86_64                                                                                                                                                                                                  4/27 
  Erasing          : containerd.io-1.4.4-3.1.el8.x86_64                                                                                                                                                                                                  4/27 
  Running scriptlet: containerd.io-1.4.4-3.1.el8.x86_64                                                                                                                                                                                                  4/27 
  Erasing          : container-selinux-2:2.155.0-1.module_el8.3.0+699+d61d9c41.noarch                                                                                                                                                                    5/27 
  Running scriptlet: container-selinux-2:2.155.0-1.module_el8.3.0+699+d61d9c41.noarch                                                                                                                                                                    5/27 
  Erasing          : fuse-overlayfs-1.3.0-2.module_el8.3.0+699+d61d9c41.x86_64                                                                                                                                                                           6/27 
  Erasing          : slirp4netns-1.1.8-1.module_el8.3.0+699+d61d9c41.x86_64                                                                                                                                                                              7/27 
  Erasing          : rpm-plugin-selinux-4.14.3-4.el8.x86_64                                                                                                                                                                                              8/27 
  Erasing          : selinux-policy-targeted-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                    9/27 
  Running scriptlet: selinux-policy-targeted-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                    9/27 
  Erasing          : selinux-policy-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                            10/27 
  Running scriptlet: selinux-policy-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                            10/27 
  Erasing          : policycoreutils-python-utils-2.9-9.el8.noarch                                                                                                                                                                                      11/27 
  Erasing          : python3-policycoreutils-2.9-9.el8.noarch                                                                                                                                                                                           12/27 
  Running scriptlet: policycoreutils-2.9-9.el8.x86_64                                                                                                                                                                                                   13/27 
  Erasing          : policycoreutils-2.9-9.el8.x86_64                                                                                                                                                                                                   13/27 
  Running scriptlet: policycoreutils-2.9-9.el8.x86_64                                                                                                                                                                                                   13/27 
  Erasing          : python3-libsemanage-2.9-3.el8.x86_64                                                                                                                                                                                               14/27 
  Erasing          : python3-setools-4.3.0-2.el8.x86_64                                                                                                                                                                                                 15/27 
  Erasing          : fuse3-3.2.1-12.el8.x86_64                                                                                                                                                                                                          16/27 
  Erasing          : fuse-common-3.2.1-12.el8.x86_64                                                                                                                                                                                                    17/27 
  Erasing          : python3-libselinux-2.9-4.el8_3.x86_64                                                                                                                                                                                              18/27 
  Erasing          : libselinux-utils-2.9-4.el8_3.x86_64                                                                                                                                                                                                19/27 
  Erasing          : python3-audit-3.0-0.17.20191104git1c2f876.el8.x86_64                                                                                                                                                                               20/27 
  Erasing          : checkpolicy-2.9-1.el8.x86_64                                                                                                                                                                                                       21/27 
  Erasing          : libslirp-4.3.1-1.module_el8.3.0+475+c50ce30b.x86_64                                                                                                                                                                                22/27 
  Erasing          : fuse3-libs-3.2.1-12.el8.x86_64                                                                                                                                                                                                     23/27 
  Running scriptlet: fuse3-libs-3.2.1-12.el8.x86_64                                                                                                                                                                                                     23/27 
  Erasing          : jansson-2.11-3.el8.x86_64                                                                                                                                                                                                          24/27 
  Erasing          : libnftnl-1.1.5-4.el8.x86_64                                                                                                                                                                                                        25/27 
  Running scriptlet: libnftnl-1.1.5-4.el8.x86_64                                                                                                                                                                                                        25/27 
  Erasing          : docker-ce-cli-1:20.10.5-3.el8.x86_64                                                                                                                                                                                               26/27 
  Erasing          : libcgroup-0.41-19.el8.x86_64                                                                                                                                                                                                       27/27 
  Running scriptlet: libcgroup-0.41-19.el8.x86_64                                                                                                                                                                                                       27/27 
  Verifying        : checkpolicy-2.9-1.el8.x86_64                                                                                                                                                                                                        1/27 
  Verifying        : container-selinux-2:2.155.0-1.module_el8.3.0+699+d61d9c41.noarch                                                                                                                                                                    2/27 
  Verifying        : containerd.io-1.4.4-3.1.el8.x86_64                                                                                                                                                                                                  3/27 
  Verifying        : docker-ce-3:20.10.5-3.el8.x86_64                                                                                                                                                                                                    4/27 
  Verifying        : docker-ce-cli-1:20.10.5-3.el8.x86_64                                                                                                                                                                                                5/27 
  Verifying        : docker-ce-rootless-extras-20.10.5-3.el8.x86_64                                                                                                                                                                                      6/27 
  Verifying        : fuse-common-3.2.1-12.el8.x86_64                                                                                                                                                                                                     7/27 
  Verifying        : fuse-overlayfs-1.3.0-2.module_el8.3.0+699+d61d9c41.x86_64                                                                                                                                                                           8/27 
  Verifying        : fuse3-3.2.1-12.el8.x86_64                                                                                                                                                                                                           9/27 
  Verifying        : fuse3-libs-3.2.1-12.el8.x86_64                                                                                                                                                                                                     10/27 
  Verifying        : jansson-2.11-3.el8.x86_64                                                                                                                                                                                                          11/27 
  Verifying        : libcgroup-0.41-19.el8.x86_64                                                                                                                                                                                                       12/27 
  Verifying        : libnftnl-1.1.5-4.el8.x86_64                                                                                                                                                                                                        13/27 
  Verifying        : libselinux-utils-2.9-4.el8_3.x86_64                                                                                                                                                                                                14/27 
  Verifying        : libslirp-4.3.1-1.module_el8.3.0+475+c50ce30b.x86_64                                                                                                                                                                                15/27 
  Verifying        : nftables-1:0.9.3-16.el8.x86_64                                                                                                                                                                                                     16/27 
  Verifying        : policycoreutils-2.9-9.el8.x86_64                                                                                                                                                                                                   17/27 
  Verifying        : policycoreutils-python-utils-2.9-9.el8.noarch                                                                                                                                                                                      18/27 
  Verifying        : python3-audit-3.0-0.17.20191104git1c2f876.el8.x86_64                                                                                                                                                                               19/27 
  Verifying        : python3-libselinux-2.9-4.el8_3.x86_64                                                                                                                                                                                              20/27 
  Verifying        : python3-libsemanage-2.9-3.el8.x86_64                                                                                                                                                                                               21/27 
  Verifying        : python3-policycoreutils-2.9-9.el8.noarch                                                                                                                                                                                           22/27 
  Verifying        : python3-setools-4.3.0-2.el8.x86_64                                                                                                                                                                                                 23/27 
  Verifying        : rpm-plugin-selinux-4.14.3-4.el8.x86_64                                                                                                                                                                                             24/27 
  Verifying        : selinux-policy-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                            25/27 
  Verifying        : selinux-policy-targeted-3.14.3-54.el8_3.2.noarch                                                                                                                                                                                   26/27 
  Verifying        : slirp4netns-1.1.8-1.module_el8.3.0+699+d61d9c41.x86_64                                                                                                                                                                             27/27 

Removed:
  checkpolicy-2.9-1.el8.x86_64                    container-selinux-2:2.155.0-1.module_el8.3.0+699+d61d9c41.noarch         containerd.io-1.4.4-3.1.el8.x86_64                             docker-ce-3:20.10.5-3.el8.x86_64                                 
  docker-ce-cli-1:20.10.5-3.el8.x86_64            docker-ce-rootless-extras-20.10.5-3.el8.x86_64                           fuse-common-3.2.1-12.el8.x86_64                                fuse-overlayfs-1.3.0-2.module_el8.3.0+699+d61d9c41.x86_64        
  fuse3-3.2.1-12.el8.x86_64                       fuse3-libs-3.2.1-12.el8.x86_64                                           jansson-2.11-3.el8.x86_64                                      libcgroup-0.41-19.el8.x86_64                                     
  libnftnl-1.1.5-4.el8.x86_64                     libselinux-utils-2.9-4.el8_3.x86_64                                      libslirp-4.3.1-1.module_el8.3.0+475+c50ce30b.x86_64            nftables-1:0.9.3-16.el8.x86_64                                   
  policycoreutils-2.9-9.el8.x86_64                policycoreutils-python-utils-2.9-9.el8.noarch                            python3-audit-3.0-0.17.20191104git1c2f876.el8.x86_64           python3-libselinux-2.9-4.el8_3.x86_64                            
  python3-libsemanage-2.9-3.el8.x86_64            python3-policycoreutils-2.9-9.el8.noarch                                 python3-setools-4.3.0-2.el8.x86_64                             rpm-plugin-selinux-4.14.3-4.el8.x86_64                           
  selinux-policy-3.14.3-54.el8_3.2.noarch         selinux-policy-targeted-3.14.3-54.el8_3.2.noarch                         slirp4netns-1.1.8-1.module_el8.3.0+699+d61d9c41.x86_64        

Complete!
[root@85427a5b71a6 /]# yum list installed | grep docker
Failed to set locale, defaulting to C.UTF-8
[root@85427a5b71a6 /]# locale
locale: Cannot set LC_CTYPE to default locale: No such file or directory
locale: Cannot set LC_MESSAGES to default locale: No such file or directory
locale: Cannot set LC_ALL to default locale: No such file or directory
LANG=en_US.UTF-8
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=
[root@85427a5b71a6 /]# locale -a
locale: Cannot set LC_CTYPE to default locale: No such file or directory
locale: Cannot set LC_MESSAGES to default locale: No such file or directory
locale: Cannot set LC_COLLATE to default locale: No such file or directory
C
C.utf8
POSIX
[root@85427a5b71a6 /]# dnf install langpacks-en glibc-all-langpacks -y
Failed to set locale, defaulting to C.UTF-8
Last metadata expiration check: 0:12:17 ago on Fri Mar 12 08:37:55 2021.
Package langpacks-en-1.0-12.el8.noarch is already installed.
Dependencies resolved.
==============================================================================================================================================================================================================================================================
 Package                                                               Architecture                                             Version                                                        Repository                                                Size
==============================================================================================================================================================================================================================================================
Installing:
 glibc-all-langpacks                                                   x86_64                                                   2.28-127.el8                                                   baseos                                                    25 M

Transaction Summary
==============================================================================================================================================================================================================================================================
Install  1 Package

Total download size: 25 M
Installed size: 415 M
Downloading Packages:
glibc-all-langpacks-2.28-127.el8.x86_64.rpm                                                                                                                                                                                   2.6 MB/s |  25 MB     00:09    
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                                                                         2.2 MB/s |  25 MB     00:11     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                                                      1/1 
  Installing       : glibc-all-langpacks-2.28-127.el8.x86_64                                                                                                                                                                                              1/1 
  Running scriptlet: glibc-all-langpacks-2.28-127.el8.x86_64                                                                                                                                                                                              1/1 
  Verifying        : glibc-all-langpacks-2.28-127.el8.x86_64                                                                                                                                                                                              1/1 

Installed:
  glibc-all-langpacks-2.28-127.el8.x86_64                                                                                                                                                                                                                     

Complete!
[root@85427a5b71a6 /]# locale -a
C
C.utf8
en_US
en_US.iso88591
en_US.iso885915
en_US.utf8
POSIX
[root@85427a5b71a6 /]# yum list installed | grep docker
[root@85427a5b71a6 /]# uname -r  
4.19.121-linuxkit
[root@85427a5b71a6 /]# yum update
Last metadata expiration check: 0:14:41 ago on Fri 12 Mar 2021 08:37:55 AM UTC.
Dependencies resolved.
==============================================================================================================================================================================================================================================================
 Package                                                        Architecture                                         Version                                                                    Repository                                               Size
==============================================================================================================================================================================================================================================================
Upgrading:
 bind-export-libs                                               x86_64                                               32:9.11.20-5.el8_3.1                                                       baseos                                                  1.1 M
 curl                                                           x86_64                                               7.61.1-14.el8_3.1                                                          baseos                                                  353 k
 dracut                                                         x86_64                                               049-95.git20200804.el8_3.4                                                 baseos                                                  368 k
 dracut-network                                                 x86_64                                               049-95.git20200804.el8_3.4                                                 baseos                                                  103 k
 dracut-squash                                                  x86_64                                               049-95.git20200804.el8_3.4                                                 baseos                                                   57 k
 gnutls                                                         x86_64                                               3.6.14-7.el8_3                                                             baseos                                                  1.0 M
 iptables-libs                                                  x86_64                                               1.8.4-15.el8_3.3                                                           baseos                                                  106 k
 kexec-tools                                                    x86_64                                               2.0.20-34.el8_3.1                                                          baseos                                                  496 k
 libcurl-minimal                                                x86_64                                               7.61.1-14.el8_3.1                                                          baseos                                                  285 k
 openssl-libs                                                   x86_64                                               1:1.1.1g-12.el8_3                                                          baseos                                                  1.5 M
 systemd                                                        x86_64                                               239-41.el8_3.1                                                             baseos                                                  3.5 M
 systemd-libs                                                   x86_64                                               239-41.el8_3.1                                                             baseos                                                  1.1 M
 systemd-pam                                                    x86_64                                               239-41.el8_3.1                                                             baseos                                                  456 k
 systemd-udev                                                   x86_64                                               239-41.el8_3.1                                                             baseos                                                  1.3 M
 tzdata                                                         noarch                                               2021a-1.el8                                                                baseos                                                  473 k
Installing dependencies:
 kbd-legacy                                                     noarch                                               2.0.4-10.el8                                                               baseos                                                  481 k
 kbd-misc                                                       noarch                                               2.0.4-10.el8                                                               baseos                                                  1.5 M
 openssl                                                        x86_64                                               1:1.1.1g-12.el8_3                                                          baseos                                                  707 k
 trousers-lib                                                   x86_64                                               0.3.14-4.el8                                                               baseos                                                  169 k
 xkeyboard-config                                               noarch                                               2.28-1.el8                                                                 appstream                                               782 k
Installing weak dependencies:
 hardlink                                                       x86_64                                               1:1.3-6.el8                                                                baseos                                                   29 k
 kbd                                                            x86_64                                               2.0.4-10.el8                                                               baseos                                                  390 k
 kpartx                                                         x86_64                                               0.8.4-5.el8                                                                baseos                                                  108 k
 libxkbcommon                                                   x86_64                                               0.9.1-1.el8                                                                appstream                                               116 k
 memstrack                                                      x86_64                                               0.1.11-1.el8                                                               baseos                                                   48 k
 openssl-pkcs11                                                 x86_64                                               0.4.10-2.el8                                                               baseos                                                   66 k
 pigz                                                           x86_64                                               2.4-4.el8                                                                  baseos                                                   79 k
 trousers                                                       x86_64                                               0.3.14-4.el8                                                               baseos                                                  153 k

Transaction Summary
==============================================================================================================================================================================================================================================================
Install  13 Packages
Upgrade  15 Packages

Total download size: 17 M
Is this ok [y/N]: y
Downloading Packages:
(1/28): hardlink-1.3-6.el8.x86_64.rpm                                                                                                                                                                                         116 kB/s |  29 kB     00:00    
(2/28): libxkbcommon-0.9.1-1.el8.x86_64.rpm                                                                                                                                                                                   232 kB/s | 116 kB     00:00    
(3/28): kbd-2.0.4-10.el8.x86_64.rpm                                                                                                                                                                                           976 kB/s | 390 kB     00:00    
(4/28): xkeyboard-config-2.28-1.el8.noarch.rpm                                                                                                                                                                                822 kB/s | 782 kB     00:00    
(5/28): kbd-legacy-2.0.4-10.el8.noarch.rpm                                                                                                                                                                                    1.0 MB/s | 481 kB     00:00    
(6/28): memstrack-0.1.11-1.el8.x86_64.rpm                                                                                                                                                                                     329 kB/s |  48 kB     00:00    
(7/28): kpartx-0.8.4-5.el8.x86_64.rpm                                                                                                                                                                                         341 kB/s | 108 kB     00:00    
(8/28): openssl-pkcs11-0.4.10-2.el8.x86_64.rpm                                                                                                                                                                                505 kB/s |  66 kB     00:00    
(9/28): pigz-2.4-4.el8.x86_64.rpm                                                                                                                                                                                             531 kB/s |  79 kB     00:00    
(10/28): openssl-1.1.1g-12.el8_3.x86_64.rpm                                                                                                                                                                                   1.2 MB/s | 707 kB     00:00    
(11/28): trousers-0.3.14-4.el8.x86_64.rpm                                                                                                                                                                                     767 kB/s | 153 kB     00:00    
(12/28): trousers-lib-0.3.14-4.el8.x86_64.rpm                                                                                                                                                                                 831 kB/s | 169 kB     00:00    
(13/28): kbd-misc-2.0.4-10.el8.noarch.rpm                                                                                                                                                                                     1.2 MB/s | 1.5 MB     00:01    
(14/28): curl-7.61.1-14.el8_3.1.x86_64.rpm                                                                                                                                                                                    795 kB/s | 353 kB     00:00    
(15/28): dracut-049-95.git20200804.el8_3.4.x86_64.rpm                                                                                                                                                                         921 kB/s | 368 kB     00:00    
(16/28): dracut-network-049-95.git20200804.el8_3.4.x86_64.rpm                                                                                                                                                                 790 kB/s | 103 kB     00:00    
(17/28): dracut-squash-049-95.git20200804.el8_3.4.x86_64.rpm                                                                                                                                                                  429 kB/s |  57 kB     00:00    
(18/28): bind-export-libs-9.11.20-5.el8_3.1.x86_64.rpm                                                                                                                                                                        1.5 MB/s | 1.1 MB     00:00    
(19/28): iptables-libs-1.8.4-15.el8_3.3.x86_64.rpm                                                                                                                                                                            826 kB/s | 106 kB     00:00    
(20/28): kexec-tools-2.0.20-34.el8_3.1.x86_64.rpm                                                                                                                                                                             1.5 MB/s | 496 kB     00:00    
(21/28): libcurl-minimal-7.61.1-14.el8_3.1.x86_64.rpm                                                                                                                                                                         1.0 MB/s | 285 kB     00:00    
(22/28): gnutls-3.6.14-7.el8_3.x86_64.rpm                                                                                                                                                                                     651 kB/s | 1.0 MB     00:01    
(23/28): openssl-libs-1.1.1g-12.el8_3.x86_64.rpm                                                                                                                                                                              793 kB/s | 1.5 MB     00:01    
(24/28): systemd-libs-239-41.el8_3.1.x86_64.rpm                                                                                                                                                                               1.0 MB/s | 1.1 MB     00:01    
(25/28): systemd-pam-239-41.el8_3.1.x86_64.rpm                                                                                                                                                                                1.0 MB/s | 456 kB     00:00    
(26/28): tzdata-2021a-1.el8.noarch.rpm                                                                                                                                                                                        1.0 MB/s | 473 kB     00:00    
(27/28): systemd-udev-239-41.el8_3.1.x86_64.rpm                                                                                                                                                                               1.3 MB/s | 1.3 MB     00:01    
(28/28): systemd-239-41.el8_3.1.x86_64.rpm                                                                                                                                                                                    1.1 MB/s | 3.5 MB     00:03    
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                                                                         1.9 MB/s |  17 MB     00:08     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                                                      1/1 
  Running scriptlet: openssl-libs-1:1.1.1g-12.el8_3.x86_64                                                                                                                                                                                                1/1 
  Upgrading        : openssl-libs-1:1.1.1g-12.el8_3.x86_64                                                                                                                                                                                               1/43 
  Running scriptlet: openssl-libs-1:1.1.1g-12.el8_3.x86_64                                                                                                                                                                                               1/43 
  Installing       : openssl-1:1.1.1g-12.el8_3.x86_64                                                                                                                                                                                                    2/43 
  Installing       : openssl-pkcs11-0.4.10-2.el8.x86_64                                                                                                                                                                                                  3/43 
  Installing       : trousers-lib-0.3.14-4.el8.x86_64                                                                                                                                                                                                    4/43 
  Running scriptlet: trousers-lib-0.3.14-4.el8.x86_64                                                                                                                                                                                                    4/43 
  Upgrading        : libcurl-minimal-7.61.1-14.el8_3.1.x86_64                                                                                                                                                                                            5/43 
  Upgrading        : systemd-libs-239-41.el8_3.1.x86_64                                                                                                                                                                                                  6/43 
  Running scriptlet: systemd-libs-239-41.el8_3.1.x86_64                                                                                                                                                                                                  6/43 
  Upgrading        : iptables-libs-1.8.4-15.el8_3.3.x86_64                                                                                                                                                                                               7/43 
  Installing       : pigz-2.4-4.el8.x86_64                                                                                                                                                                                                               8/43 
  Installing       : memstrack-0.1.11-1.el8.x86_64                                                                                                                                                                                                       9/43 
  Installing       : kpartx-0.8.4-5.el8.x86_64                                                                                                                                                                                                          10/43 
  Installing       : kbd-misc-2.0.4-10.el8.noarch                                                                                                                                                                                                       11/43 
  Installing       : kbd-legacy-2.0.4-10.el8.noarch                                                                                                                                                                                                     12/43 
  Installing       : kbd-2.0.4-10.el8.x86_64                                                                                                                                                                                                            13/43 
  Installing       : hardlink-1:1.3-6.el8.x86_64                                                                                                                                                                                                        14/43 
  Installing       : xkeyboard-config-2.28-1.el8.noarch                                                                                                                                                                                                 15/43 
  Installing       : libxkbcommon-0.9.1-1.el8.x86_64                                                                                                                                                                                                    16/43 
  Upgrading        : gnutls-3.6.14-7.el8_3.x86_64                                                                                                                                                                                                       17/43 
  Upgrading        : systemd-pam-239-41.el8_3.1.x86_64                                                                                                                                                                                                  18/43 
  Running scriptlet: systemd-239-41.el8_3.1.x86_64                                                                                                                                                                                                      19/43 
  Upgrading        : systemd-239-41.el8_3.1.x86_64                                                                                                                                                                                                      19/43 
  Running scriptlet: systemd-239-41.el8_3.1.x86_64                                                                                                                                                                                                      19/43 
  Running scriptlet: trousers-0.3.14-4.el8.x86_64                                                                                                                                                                                                       20/43 
  Installing       : trousers-0.3.14-4.el8.x86_64                                                                                                                                                                                                       20/43 
  Running scriptlet: trousers-0.3.14-4.el8.x86_64                                                                                                                                                                                                       20/43 
  Upgrading        : systemd-udev-239-41.el8_3.1.x86_64                                                                                                                                                                                                 21/43 
  Running scriptlet: systemd-udev-239-41.el8_3.1.x86_64                                                                                                                                                                                                 21/43 
  Upgrading        : dracut-049-95.git20200804.el8_3.4.x86_64                                                                                                                                                                                           22/43 
  Upgrading        : dracut-network-049-95.git20200804.el8_3.4.x86_64                                                                                                                                                                                   23/43 
  Upgrading        : dracut-squash-049-95.git20200804.el8_3.4.x86_64                                                                                                                                                                                    24/43 
  Upgrading        : kexec-tools-2.0.20-34.el8_3.1.x86_64                                                                                                                                                                                               25/43 
  Running scriptlet: kexec-tools-2.0.20-34.el8_3.1.x86_64                                                                                                                                                                                               25/43 
  Upgrading        : curl-7.61.1-14.el8_3.1.x86_64                                                                                                                                                                                                      26/43 
  Upgrading        : bind-export-libs-32:9.11.20-5.el8_3.1.x86_64                                                                                                                                                                                       27/43 
  Running scriptlet: bind-export-libs-32:9.11.20-5.el8_3.1.x86_64                                                                                                                                                                                       27/43 
  Upgrading        : tzdata-2021a-1.el8.noarch                                                                                                                                                                                                          28/43 
  Running scriptlet: kexec-tools-2.0.20-34.el8.x86_64                                                                                                                                                                                                   29/43 
  Cleanup          : kexec-tools-2.0.20-34.el8.x86_64                                                                                                                                                                                                   29/43 
  Running scriptlet: kexec-tools-2.0.20-34.el8.x86_64                                                                                                                                                                                                   29/43 
  Cleanup          : curl-7.61.1-14.el8.x86_64                                                                                                                                                                                                          30/43 
  Cleanup          : libcurl-minimal-7.61.1-14.el8.x86_64                                                                                                                                                                                               31/43 
  Cleanup          : bind-export-libs-32:9.11.20-5.el8.x86_64                                                                                                                                                                                           32/43 
  Running scriptlet: bind-export-libs-32:9.11.20-5.el8.x86_64                                                                                                                                                                                           32/43 
  Cleanup          : dracut-network-049-95.git20200804.el8.x86_64                                                                                                                                                                                       33/43 
  Cleanup          : dracut-squash-049-95.git20200804.el8.x86_64                                                                                                                                                                                        34/43 
  Cleanup          : tzdata-2020d-1.el8.noarch                                                                                                                                                                                                          35/43 
  Cleanup          : dracut-049-95.git20200804.el8.x86_64                                                                                                                                                                                               36/43 
  Cleanup          : systemd-udev-239-41.el8_3.x86_64                                                                                                                                                                                                   37/43 
  Running scriptlet: systemd-udev-239-41.el8_3.x86_64                                                                                                                                                                                                   37/43 
  Running scriptlet: systemd-239-41.el8_3.x86_64                                                                                                                                                                                                        38/43 
  Cleanup          : systemd-239-41.el8_3.x86_64                                                                                                                                                                                                        38/43 
  Cleanup          : gnutls-3.6.14-6.el8.x86_64                                                                                                                                                                                                         39/43 
  Cleanup          : iptables-libs-1.8.4-15.el8.x86_64                                                                                                                                                                                                  40/43 
  Cleanup          : systemd-libs-239-41.el8_3.x86_64                                                                                                                                                                                                   41/43 
  Cleanup          : systemd-pam-239-41.el8_3.x86_64                                                                                                                                                                                                    42/43 
  Cleanup          : openssl-libs-1:1.1.1g-11.el8.x86_64                                                                                                                                                                                                43/43 
  Running scriptlet: openssl-libs-1:1.1.1g-11.el8.x86_64                                                                                                                                                                                                43/43 
  Running scriptlet: systemd-239-41.el8_3.1.x86_64                                                                                                                                                                                                      43/43 
  Running scriptlet: systemd-udev-239-41.el8_3.1.x86_64                                                                                                                                                                                                 43/43 
  Verifying        : libxkbcommon-0.9.1-1.el8.x86_64                                                                                                                                                                                                     1/43 
  Verifying        : xkeyboard-config-2.28-1.el8.noarch                                                                                                                                                                                                  2/43 
  Verifying        : hardlink-1:1.3-6.el8.x86_64                                                                                                                                                                                                         3/43 
  Verifying        : kbd-2.0.4-10.el8.x86_64                                                                                                                                                                                                             4/43 
  Verifying        : kbd-legacy-2.0.4-10.el8.noarch                                                                                                                                                                                                      5/43 
  Verifying        : kbd-misc-2.0.4-10.el8.noarch                                                                                                                                                                                                        6/43 
  Verifying        : kpartx-0.8.4-5.el8.x86_64                                                                                                                                                                                                           7/43 
  Verifying        : memstrack-0.1.11-1.el8.x86_64                                                                                                                                                                                                       8/43 
  Verifying        : openssl-1:1.1.1g-12.el8_3.x86_64                                                                                                                                                                                                    9/43 
  Verifying        : openssl-pkcs11-0.4.10-2.el8.x86_64                                                                                                                                                                                                 10/43 
  Verifying        : pigz-2.4-4.el8.x86_64                                                                                                                                                                                                              11/43 
  Verifying        : trousers-0.3.14-4.el8.x86_64                                                                                                                                                                                                       12/43 
  Verifying        : trousers-lib-0.3.14-4.el8.x86_64                                                                                                                                                                                                   13/43 
  Verifying        : bind-export-libs-32:9.11.20-5.el8_3.1.x86_64                                                                                                                                                                                       14/43 
  Verifying        : bind-export-libs-32:9.11.20-5.el8.x86_64                                                                                                                                                                                           15/43 
  Verifying        : curl-7.61.1-14.el8_3.1.x86_64                                                                                                                                                                                                      16/43 
  Verifying        : curl-7.61.1-14.el8.x86_64                                                                                                                                                                                                          17/43 
  Verifying        : dracut-049-95.git20200804.el8_3.4.x86_64                                                                                                                                                                                           18/43 
  Verifying        : dracut-049-95.git20200804.el8.x86_64                                                                                                                                                                                               19/43 
  Verifying        : dracut-network-049-95.git20200804.el8_3.4.x86_64                                                                                                                                                                                   20/43 
  Verifying        : dracut-network-049-95.git20200804.el8.x86_64                                                                                                                                                                                       21/43 
  Verifying        : dracut-squash-049-95.git20200804.el8_3.4.x86_64                                                                                                                                                                                    22/43 
  Verifying        : dracut-squash-049-95.git20200804.el8.x86_64                                                                                                                                                                                        23/43 
  Verifying        : gnutls-3.6.14-7.el8_3.x86_64                                                                                                                                                                                                       24/43 
  Verifying        : gnutls-3.6.14-6.el8.x86_64                                                                                                                                                                                                         25/43 
  Verifying        : iptables-libs-1.8.4-15.el8_3.3.x86_64                                                                                                                                                                                              26/43 
  Verifying        : iptables-libs-1.8.4-15.el8.x86_64                                                                                                                                                                                                  27/43 
  Verifying        : kexec-tools-2.0.20-34.el8_3.1.x86_64                                                                                                                                                                                               28/43 
  Verifying        : kexec-tools-2.0.20-34.el8.x86_64                                                                                                                                                                                                   29/43 
  Verifying        : libcurl-minimal-7.61.1-14.el8_3.1.x86_64                                                                                                                                                                                           30/43 
  Verifying        : libcurl-minimal-7.61.1-14.el8.x86_64                                                                                                                                                                                               31/43 
  Verifying        : openssl-libs-1:1.1.1g-12.el8_3.x86_64                                                                                                                                                                                              32/43 
  Verifying        : openssl-libs-1:1.1.1g-11.el8.x86_64                                                                                                                                                                                                33/43 
  Verifying        : systemd-239-41.el8_3.1.x86_64                                                                                                                                                                                                      34/43 
  Verifying        : systemd-239-41.el8_3.x86_64                                                                                                                                                                                                        35/43 
  Verifying        : systemd-libs-239-41.el8_3.1.x86_64                                                                                                                                                                                                 36/43 
  Verifying        : systemd-libs-239-41.el8_3.x86_64                                                                                                                                                                                                   37/43 
  Verifying        : systemd-pam-239-41.el8_3.1.x86_64                                                                                                                                                                                                  38/43 
  Verifying        : systemd-pam-239-41.el8_3.x86_64                                                                                                                                                                                                    39/43 
  Verifying        : systemd-udev-239-41.el8_3.1.x86_64                                                                                                                                                                                                 40/43 
  Verifying        : systemd-udev-239-41.el8_3.x86_64                                                                                                                                                                                                   41/43 
  Verifying        : tzdata-2021a-1.el8.noarch                                                                                                                                                                                                          42/43 
  Verifying        : tzdata-2020d-1.el8.noarch                                                                                                                                                                                                          43/43 

Upgraded:
  bind-export-libs-32:9.11.20-5.el8_3.1.x86_64       curl-7.61.1-14.el8_3.1.x86_64               dracut-049-95.git20200804.el8_3.4.x86_64       dracut-network-049-95.git20200804.el8_3.4.x86_64       dracut-squash-049-95.git20200804.el8_3.4.x86_64      
  gnutls-3.6.14-7.el8_3.x86_64                       iptables-libs-1.8.4-15.el8_3.3.x86_64       kexec-tools-2.0.20-34.el8_3.1.x86_64           libcurl-minimal-7.61.1-14.el8_3.1.x86_64               openssl-libs-1:1.1.1g-12.el8_3.x86_64                
  systemd-239-41.el8_3.1.x86_64                      systemd-libs-239-41.el8_3.1.x86_64          systemd-pam-239-41.el8_3.1.x86_64              systemd-udev-239-41.el8_3.1.x86_64                     tzdata-2021a-1.el8.noarch                            

Installed:
  hardlink-1:1.3-6.el8.x86_64         kbd-2.0.4-10.el8.x86_64               kbd-legacy-2.0.4-10.el8.noarch    kbd-misc-2.0.4-10.el8.noarch    kpartx-0.8.4-5.el8.x86_64           libxkbcommon-0.9.1-1.el8.x86_64       memstrack-0.1.11-1.el8.x86_64   
  openssl-1:1.1.1g-12.el8_3.x86_64    openssl-pkcs11-0.4.10-2.el8.x86_64    pigz-2.4-4.el8.x86_64             trousers-0.3.14-4.el8.x86_64    trousers-lib-0.3.14-4.el8.x86_64    xkeyboard-config-2.28-1.el8.noarch   

Complete!
[root@85427a5b71a6 /]#  yum install -y yum -utils device-mapper-persistent-data lvm2
usage: yum install [-c [config file]] [-q] [-v] [--version]
                   [--installroot [path]] [--nodocs] [--noplugins]
                   [--enableplugin [plugin]] [--disableplugin [plugin]]
                   [--releasever RELEASEVER] [--setopt SETOPTS]
                   [--skip-broken] [-h] [--allowerasing] [-b | --nobest] [-C]
                   [-R [minutes]] [-d [debug level]] [--debugsolver]
                   [--showduplicates] [-e ERRORLEVEL] [--obsoletes]
                   [--rpmverbosity [debug level name]] [-y] [--assumeno]
                   [--enablerepo [repo]] [--disablerepo [repo] | --repo
                   [repo]] [--enable | --disable] [-x [package]]
                   [--disableexcludes [repo]] [--repofrompath [repo,path]]
                   [--noautoremove] [--nogpgcheck] [--color COLOR] [--refresh]
                   [-4] [-6] [--destdir DESTDIR] [--downloadonly]
                   [--comment COMMENT] [--bugfix] [--enhancement]
                   [--newpackage] [--security] [--advisory ADVISORY]
                   [--bz BUGZILLA] [--cve CVES]
                   [--sec-severity {Critical,Important,Moderate,Low}]
                   [--forcearch ARCH]
                   PACKAGE [PACKAGE ...]
yum install: error: unrecognized arguments: -utils device-mapper-persistent-data lvm2
[root@85427a5b71a6 /]# yum install -y yum -utils device-mapper-persistent-data lvm2
usage: yum install [-c [config file]] [-q] [-v] [--version]
                   [--installroot [path]] [--nodocs] [--noplugins]
                   [--enableplugin [plugin]] [--disableplugin [plugin]]
                   [--releasever RELEASEVER] [--setopt SETOPTS]
                   [--skip-broken] [-h] [--allowerasing] [-b | --nobest] [-C]
                   [-R [minutes]] [-d [debug level]] [--debugsolver]
                   [--showduplicates] [-e ERRORLEVEL] [--obsoletes]
                   [--rpmverbosity [debug level name]] [-y] [--assumeno]
                   [--enablerepo [repo]] [--disablerepo [repo] | --repo
                   [repo]] [--enable | --disable] [-x [package]]
                   [--disableexcludes [repo]] [--repofrompath [repo,path]]
                   [--noautoremove] [--nogpgcheck] [--color COLOR] [--refresh]
                   [-4] [-6] [--destdir DESTDIR] [--downloadonly]
                   [--comment COMMENT] [--bugfix] [--enhancement]
                   [--newpackage] [--security] [--advisory ADVISORY]
                   [--bz BUGZILLA] [--cve CVES]
                   [--sec-severity {Critical,Important,Moderate,Low}]
                   [--forcearch ARCH]
                   PACKAGE [PACKAGE ...]
yum install: error: unrecognized arguments: -utils device-mapper-persistent-data lvm2
[root@85427a5b71a6 /]# curl -sSL https://get.daocloud.io/docker | sh
# Executing docker install script, commit: 3d8fe77c2c46c5b7571f94b42793905e5b3e42e4
+ sh -c 'yum install -y -q yum-utils'
+ sh -c 'yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo'
Adding repo from: https://download.docker.com/linux/centos/docker-ce.repo
+ '[' stable '!=' stable ']'
+ sh -c 'yum makecache'
CentOS Linux 8 - AppStream                                                                                                                                                                                                    3.5 kB/s | 4.3 kB     00:01    
CentOS Linux 8 - BaseOS                                                                                                                                                                                                       6.7 kB/s | 3.9 kB     00:00    
CentOS Linux 8 - Extras                                                                                                                                                                                                       3.6 kB/s | 1.5 kB     00:00    
Docker CE Stable - x86_64                                                                                                                                                                                                     9.9 kB/s | 3.5 kB     00:00    
Metadata cache created.
+ '[' -n '' ']'
+ sh -c 'yum install -y -q docker-ce'






+ sh -c 'docker version'
Client: Docker Engine - Community
 Version:           20.10.5
 API version:       1.41
 Go version:        go1.13.15
 Git commit:        55c4c88
 Built:             Tue Mar  2 20:17:04 2021
 OS/Arch:           linux/amd64
 Context:           default
 Experimental:      true
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
If you would like to use Docker as a non-root user, you should now consider
adding your user to the "docker" group with something like:

  sudo usermod -aG docker your-user

Remember that you will have to log out and back in for this to take effect!

WARNING: Adding a user to the "docker" group will grant the ability to run
         containers which can be used to obtain root privileges on the
         docker host.
         Refer to https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface
         for more information.
[root@85427a5b71a6 /]# 
[root@85427a5b71a6 /]# 
[root@85427a5b71a6 /]# 
[root@85427a5b71a6 /]# 
[root@85427a5b71a6 /]# 
[root@85427a5b71a6 /]# 
[root@85427a5b71a6 /]# sudo systemctl start docker
[root@85427a5b71a6 /]# docker ps;
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@85427a5b71a6 /]# docker images;
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
[root@85427a5b71a6 /]# sudo docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
b8dfde127a29: Pull complete 
Digest: sha256:308866a43596e83578c7dfa15e27a73011bdd402185a84c5cd7f32a88b501a24
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/

[root@85427a5b71a6 /]# docker images;
REPOSITORY    TAG       IMAGE ID       CREATED      SIZE
hello-world   latest    d1165f221234   6 days ago   13.3kB
[root@85427a5b71a6 /]# docker ps;
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@85427a5b71a6 /]# docker ps -a 
CONTAINER ID   IMAGE         COMMAND    CREATED              STATUS                          PORTS     NAMES
8c1670c4ce4d   hello-world   "/hello"   About a minute ago   Exited (0) About a minute ago             serene_leavitt
[root@85427a5b71a6 /]# docker start serene_leavitt
serene_leavitt
[root@85427a5b71a6 /]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@85427a5b71a6 /]# docker ps -a
CONTAINER ID   IMAGE         COMMAND    CREATED         STATUS                      PORTS     NAMES
8c1670c4ce4d   hello-world   "/hello"   2 minutes ago   Exited (0) 21 seconds ago             serene_leavitt
[root@85427a5b71a6 /]# docker start 8c1670c4ce4d
8c1670c4ce4d
[root@85427a5b71a6 /]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@85427a5b71a6 /]# docker ps -a
CONTAINER ID   IMAGE         COMMAND    CREATED         STATUS                      PORTS     NAMES
8c1670c4ce4d   hello-world   "/hello"   2 minutes ago   Exited (0) 16 seconds ago             serene_leavitt
[root@85427a5b71a6 /]# quit;          
bash: quit: command not found
[root@85427a5b71a6 /]# exit
exit
➜  ~ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                               NAMES
85427a5b71a6   300e315adb2f   "/sbin/init"             39 minutes ago   Up 39 minutes                                       mycentos
cb45919dd4f9   mysql          "docker-entrypoint.s…"   3 hours ago      Up 3 hours      33060/tcp, 0.0.0.0:3307->3306/tcp   mysql-container
➜  ~  systemctl restart  docker
zsh: command not found: systemctl
➜  ~ killall Docker
➜  ~ docker

Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Options:
      --config string      Location of client config files (default "/Users/jaggerguo/.docker")
  -c, --context string     Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and default context set with "docker context use")
  -D, --debug              Enable debug mode
  -H, --host list          Daemon socket(s) to connect to
  -l, --log-level string   Set the logging level ("debug"|"info"|"warn"|"error"|"fatal") (default "info")
      --tls                Use TLS; implied by --tlsverify
      --tlscacert string   Trust certs signed only by this CA (default "/Users/jaggerguo/.docker/ca.pem")
      --tlscert string     Path to TLS certificate file (default "/Users/jaggerguo/.docker/cert.pem")
      --tlskey string      Path to TLS key file (default "/Users/jaggerguo/.docker/key.pem")
      --tlsverify          Use TLS and verify the remote
  -v, --version            Print version information and quit

Management Commands:
  app*        Docker App (Docker Inc., v0.9.1-beta3)
  builder     Manage builds
  buildx*     Build with BuildKit (Docker Inc., v0.5.1-docker)
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  scan*       Docker Scan (Docker Inc., v0.5.0)
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes

Run 'docker COMMAND --help' for more information on a command.

To get more help with docker, check out our guides at https://docs.docker.com/go/guides/
➜  ~ docker ps
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
➜  ~ docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
➜  ~ docker images;
REPOSITORY    TAG           IMAGE ID       CREATED        SIZE
hello-world   latest        d1165f221234   6 days ago     13.3kB
mysql         latest        8457e9155715   13 days ago    546MB
<none>        <none>        0623857f8795   7 weeks ago    8.94MB
<none>        <none>        d2a52e33df37   7 weeks ago    300MB
golang        1.15-alpine   6af5835b113c   7 weeks ago    300MB
alpine        3.12          389fef711851   2 months ago   5.58MB
centos        latest        300e315adb2f   3 months ago   209MB
➜  ~ docker ps -a  
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS                       PORTS                               NAMES
85427a5b71a6   300e315adb2f   "/sbin/init"             49 minutes ago   Exited (255) 5 minutes ago                                       mycentos
cb45919dd4f9   mysql          "docker-entrypoint.s…"   3 hours ago      Exited (255) 5 minutes ago   33060/tcp, 0.0.0.0:3307->3306/tcp   mysql-container
d2989f08ff3d   hello-world    "/hello"                 21 hours ago     Exited (0) 21 hours ago                                          kind_spence
c1a7c9cfa575   hello-world    "/hello"                 21 hours ago     Exited (0) 21 hours ago                                          youthful_wilbur
➜  ~ docker start mycentos;
mycentos
➜  ~ docker ps             
CONTAINER ID   IMAGE          COMMAND        CREATED          STATUS         PORTS     NAMES
85427a5b71a6   300e315adb2f   "/sbin/init"   50 minutes ago   Up 7 seconds             mycentos
➜  ~ docker exec -it mycentos bash 
[root@85427a5b71a6 /]# docker images;
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
[root@85427a5b71a6 /]# docker images
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
[root@85427a5b71a6 /]# sudo systemctl start docker
[root@85427a5b71a6 /]# docker images;
REPOSITORY    TAG       IMAGE ID       CREATED      SIZE
hello-world   latest    d1165f221234   6 days ago   13.3kB
[root@85427a5b71a6 /]# docker ps;
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@85427a5b71a6 /]# docker ps -a
CONTAINER ID   IMAGE         COMMAND    CREATED          STATUS                      PORTS     NAMES
8c1670c4ce4d   hello-world   "/hello"   31 minutes ago   Exited (0) 28 minutes ago             serene_leavitt
[root@85427a5b71a6 /]# docker start 8c1670c4ce4d
8c1670c4ce4d
[root@85427a5b71a6 /]# docker ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
[root@85427a5b71a6 /]# docker ps -a
CONTAINER ID   IMAGE         COMMAND    CREATED          STATUS                      PORTS     NAMES
8c1670c4ce4d   hello-world   "/hello"   31 minutes ago   Exited (0) 14 seconds ago             serene_leavitt
[root@85427a5b71a6 /]# docker top 8c1670c4ce4d
Error response from daemon: Container 8c1670c4ce4dd8da63b3927e08f52a9b29aaa6c4e403a0817e0d8d3da78eadc9 is not running
[root@85427a5b71a6 /]# sudo vim  /etc/docker/daemon.json
sudo: vim: command not found
[root@85427a5b71a6 /]# { 
> “registry-mirrors”: [“https://registry.docker-cn.com“] 
> }
bash: “registry-mirrors”:: command not found
[root@85427a5b71a6 /]# vim  /etc/docker/daemon.json
bash: vim: command not found
[root@85427a5b71a6 /]# yum install vim
Last metadata expiration check: 0:48:26 ago on Fri 12 Mar 2021 08:58:01 AM UTC.
Dependencies resolved.
==============================================================================================================================================================================================================================================================
 Package                                                         Architecture                                            Version                                                             Repository                                                  Size
==============================================================================================================================================================================================================================================================
Installing:
 vim-enhanced                                                    x86_64                                                  2:8.0.1763-15.el8                                                   appstream                                                  1.4 M
Installing dependencies:
 gpm-libs                                                        x86_64                                                  1.20.7-15.el8                                                       appstream                                                   39 k
 vim-common                                                      x86_64                                                  2:8.0.1763-15.el8                                                   appstream                                                  6.3 M
 vim-filesystem                                                  noarch                                                  2:8.0.1763-15.el8                                                   appstream                                                   48 k
 which                                                           x86_64                                                  2.21-12.el8                                                         baseos                                                      49 k

Transaction Summary
==============================================================================================================================================================================================================================================================
Install  5 Packages

Total download size: 7.8 M
Installed size: 30 M
Is this ok [y/N]: y
Downloading Packages:
(1/5): gpm-libs-1.20.7-15.el8.x86_64.rpm                                                                                                                                                                                      108 kB/s |  39 kB     00:00    
(2/5): vim-filesystem-8.0.1763-15.el8.noarch.rpm                                                                                                                                                                              289 kB/s |  48 kB     00:00    
(3/5): which-2.21-12.el8.x86_64.rpm                                                                                                                                                                                           206 kB/s |  49 kB     00:00    
(4/5): vim-enhanced-8.0.1763-15.el8.x86_64.rpm                                                                                                                                                                                836 kB/s | 1.4 MB     00:01    
(5/5): vim-common-8.0.1763-15.el8.x86_64.rpm                                                                                                                                                                                  1.2 MB/s | 6.3 MB     00:05    
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                                                                                                                                         1.2 MB/s | 7.8 MB     00:06     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                                                                                                                                      1/1 
  Installing       : which-2.21-12.el8.x86_64                                                                                                                                                                                                             1/5 
  Installing       : vim-filesystem-2:8.0.1763-15.el8.noarch                                                                                                                                                                                              2/5 
  Installing       : vim-common-2:8.0.1763-15.el8.x86_64                                                                                                                                                                                                  3/5 
  Installing       : gpm-libs-1.20.7-15.el8.x86_64                                                                                                                                                                                                        4/5 
  Running scriptlet: gpm-libs-1.20.7-15.el8.x86_64                                                                                                                                                                                                        4/5 
  Installing       : vim-enhanced-2:8.0.1763-15.el8.x86_64                                                                                                                                                                                                5/5 
  Running scriptlet: vim-enhanced-2:8.0.1763-15.el8.x86_64                                                                                                                                                                                                5/5 
  Running scriptlet: vim-common-2:8.0.1763-15.el8.x86_64                                                                                                                                                                                                  5/5 
  Verifying        : gpm-libs-1.20.7-15.el8.x86_64                                                                                                                                                                                                        1/5 
  Verifying        : vim-common-2:8.0.1763-15.el8.x86_64                                                                                                                                                                                                  2/5 
  Verifying        : vim-enhanced-2:8.0.1763-15.el8.x86_64                                                                                                                                                                                                3/5 
  Verifying        : vim-filesystem-2:8.0.1763-15.el8.noarch                                                                                                                                                                                              4/5 
  Verifying        : which-2.21-12.el8.x86_64                                                                                                                                                                                                             5/5 

Installed:
  gpm-libs-1.20.7-15.el8.x86_64                 vim-common-2:8.0.1763-15.el8.x86_64                 vim-enhanced-2:8.0.1763-15.el8.x86_64                 vim-filesystem-2:8.0.1763-15.el8.noarch                 which-2.21-12.el8.x86_64                

Complete!
[root@85427a5b71a6 /]# sudo vim  /etc/docker/daemon.json
[root@85427a5b71a6 /]# systemctl daemon-reload 
[root@85427a5b71a6 /]# systemctl restart docker
Job for docker.service failed because the control process exited with error code.
See "systemctl status docker.service" and "journalctl -xe" for details.
[root@85427a5b71a6 /]# sudo systemctl restart docker
Job for docker.service failed because the control process exited with error code.
See "systemctl status docker.service" and "journalctl -xe" for details.
[root@85427a5b71a6 /]# sudo systemctl restart docker
Job for docker.service failed because the control process exited with error code.
See "systemctl status docker.service" and "journalctl -xe" for details.
[root@85427a5b71a6 /]# docker images;
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
[root@85427a5b71a6 /]# sudo systemctl start docker
Job for docker.service failed because the control process exited with error code.
See "systemctl status docker.service" and "journalctl -xe" for details.
[root@85427a5b71a6 /]# sudo systemctl start docker
Job for docker.service failed because the control process exited with error code.
See "systemctl status docker.service" and "journalctl -xe" for details.
[root@85427a5b71a6 /]# sudo systemctl start docker;
Job for docker.service failed because the control process exited with error code.
See "systemctl status docker.service" and "journalctl -xe" for details.
[root@85427a5b71a6 /]# exit
exit
➜  ~ docker images
REPOSITORY    TAG           IMAGE ID       CREATED        SIZE
hello-world   latest        d1165f221234   6 days ago     13.3kB
mysql         latest        8457e9155715   13 days ago    546MB
<none>        <none>        0623857f8795   7 weeks ago    8.94MB
<none>        <none>        d2a52e33df37   7 weeks ago    300MB
golang        1.15-alpine   6af5835b113c   7 weeks ago    300MB
alpine        3.12          389fef711851   2 months ago   5.58MB
centos        latest        300e315adb2f   3 months ago   209MB
➜  ~ docker ps
CONTAINER ID   IMAGE          COMMAND        CREATED             STATUS          PORTS     NAMES
85427a5b71a6   300e315adb2f   "/sbin/init"   About an hour ago   Up 29 minutes             mycentos
➜  ~ docker exec -it mycentos /bin/bash
[root@85427a5b71a6 /]# docker ps
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
[root@85427a5b71a6 /]# docker ps -a
Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
[root@85427a5b71a6 /]#  sudo systemctl start docker
Job for docker.service failed because the control process exited with error code.
See "systemctl status docker.service" and "journalctl -xe" for details.
[root@85427a5b71a6 /]# 

```
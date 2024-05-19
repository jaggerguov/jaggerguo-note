## 定义：

1. 数据的结构： 指的是数据的存储结构；
2. 算法： 操作数据的方法；

## 算法效率衡量：
### 复杂度（渐进复杂度）
1. 时间复杂度： 算法执行的时间与数据规模之间的增长关系；
2. 空间复杂度： 算法存储空间与数据规模之间的增长关系；
3. 常用的复杂度的关系： n^2 > nlogn > n > logn > 1;
4. 最好、最坏、平均、均摊

```js
function find(arr, x){
    let pos = -1;
    let len = arr.length;
    for(let i = 0; i<len; i++){
        console.log('i',i);
        if(arr[i]=== x){
            pos = i;
            break;
        }
    }
    return pos;
}

最好：O(1);最差：O(n); 平均：O(n)
```

## 数组

### 定义： 一种线性表数据结构，用一组连续的内存空间来存放一组相同类型的数据；
### 特点： 随机访问快 ；删除、插入效率低；


## 链表：（206，141，21，19，876）

### 定义：一种线性表数据结构，将一组零散内存块串联起来使用；
### 单链、双向链表、循环链表

### code

```js

// 反转链表

// 方法一： 迭代 O(n)  [a,b,c]=>[b,c,a]=>[c,b,a]
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
};

// 方法二： 递归 O(n) 
var reverseList = function(head) {
    if (head == null || head.next == null) {
        return head;
    }
    const newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
};

```
## 栈：
- 定义： 一种操作受限的线性表数据结构；
- 特征： 后进先出；
- 实现： 数组->顺序栈   链表->链式栈
## 队列：
- 定义： 一种操作受限的线性表数据结构；
- 特征： 先进先出；
- 实现： 数组->顺序队列  链表->链式队列：入队(tail->next=new_node, tail=tail->next;) 出队(head=head->next;);
- 种类： 循环、阻塞（场景：生产者 - 消费者模型）、并发队列（多线程安全，入队、出队加锁，同一时刻仅允许一种操作）


## 递归：
1. 可分解；
2. 除数据规模外，相同处理；
3. 有限；
- 特点： 简洁高效、堆栈溢出、重复计算、函数调用耗时多、空间复杂度高等
- 使用正确姿势： 1. 写出递归公式  2. 找出终止条件 3. 翻译成代码
- 场景：
- n 个台阶，每次只能1步或者2步，问有多少种方法：
f(n) = f(n-1) + f(n-2);
```js

// 递归
getWays(n){
    if(n===1) return 1;
    if(n===2) return 2;
    return getWays(n-1)+getWays(n-2);
}

// 迭代循环
getWays(n){
    if(n===1) return 1;
    if(n===2) return 2;
    res = 0;
    pre = 2;
    prepre = 1;
    for(let i = 3; i < n; i++){
        res = pre + prepre;
        prepre = pre;
        pre = res;
    };
    return res;
}
```

## 排序：
- 冒泡:基于比较,比较=》交换 原地排序、稳定排序
```js
// (每次将最大的放到最后面) 最好O(T) = O(n) 最差O(T) = O(n^2);
popSort(arr){
    const len = arr.length;
    for(let i = 0; i< len-1; i++){
        let flag = false;
        for(let j = 0; j< len-1-i; j++){
            if(arr[j]>arr[j+1]){
                arr[j]^=arr[j+1];
                arr[j+1]^ = arr[j];
                arr[j]^= arr[j+1];
                flag = true;
            }
        }
        if(!flag){
            break;
        }   
    }
}
```
- 插入排序:基于比较,比较=》交换 原地排序、稳定排序
```js
// 最好O(T) = O(n) 最差O(T) = O(n^2)
insertSort(arr){
    let len = arr.length;
    if(len<=1){
        return;
    }
    for(let i=1;i<len;i++){
        let curr = arr[i];
        let j=i-1;
        while(j>=0 && curr < arr[j]){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = curr;
    }
    return arr;
}

insertSort(arr){
    const len = arr.length;
    if(len === 1) return arr;
    for(let i=1; i< len; i++){
        let curr = arr[i];
        let j = i-1;
        while(j>=0 && curr < arr[j]){
            arr[j+1]=arr[j];
            j--;
        }
        arr[j+1] = curr;
    }

}
```
- 选择：基于比较,比较=》交换 原地排序、不稳定排序
```js
// 
```
- 归并：分治思想 稳定  非原地排序
```js
// 最好、最坏、平均 O(T) = O(nlong(n))   O(K) = O(n)
```
- 快排：分治思想 left middle right 原地 不稳定
```js
// 平均O(T) = O(nlong(n))  最坏：O(T)=O(n^2)
```

线性排序：O(n)
- 桶排： 适合用在外部排序中，内存有限，外部磁盘

- 计数排序：计数排序只能用在数据范围不大的场景中、计数排序只能给非负整数排序

- 基数排序： 

## 查找
- 二分查找：
1. 二分查找依赖的是顺序表结构；
2. 二分查找针对的是有序数据；
3. 数据量太小不适合二分查找；
4. 数据太大也不适合；


中间数：let arr = [0,1,2,3,4,5,6,7];   mid = n>>1 = 3    n>>1=4   1+(7-1)>>1=3

## 跳表
- redis使用跳表来实现有序集合；

## 散列表：
- word拼写检查；
- LRU最近最少使用:LRU 缓存淘汰算法

## hash算法
- 单向；
- 变化敏感；
- 快；
- 冲突概率小；

- 应用场景：分别是安全加密、唯一标识、数据校验、散列函数、负载均衡、数据分片、分布式存储
1. 安全加密：
- MD5 消息摘要算法 128位2进制 最多能表示2^128
- SHA 安全散列算法
2. 唯一标识：
- 海量图片唯一标识；
3. 数据校验：
- 校验下载的文件是否完整、是否有篡改；
4. 散列函数：
- 冲突率和性能；
5. 负载均衡；
- 同一个ip路由到同一台服务器上；
6. 数据分片：
- 图片分片存储；
7. 分布式存储；
- 缓存，一致性hash

## 二叉树：
 - 根节点、叶子节点
 - 深度、高度、层
 - 节点高度： 节点到叶子节点最长的路径（边数）；
 - 节点深度： 根到这个节点所经历边的个数；
 - 节点层数： 深度 + 1；
 - 树高： 根节点高度；
 - 二叉： 左子树、右子树
 - 满二叉树：叶子节点都在最下层、每一个非叶子节点都有左右子节点；
 - 完全二叉树： 靠左；
 - 存储二叉树： 数组顺序存储、链式存储
 - 前序遍历（根、递归左、递归左右）、中序遍历（递归左、根、递归右）、后续遍历（递归左、递归右、根）（中左右，左中右、左右中）
### 二叉查找树
- 支持： 快速查找、插入、删除
- 特点：任意一个节点，左子树值<节点值<右子树
- 前序遍历、中序遍历（输出有序的数据序列）、后续遍历
- 查找：目标值与根节点值比较，大于根节点值时在右子树递归查找，小于根节点的值时在左子树递归查找；
- 插入：同查找，新插入的一般在空的叶子节点上；先与根节点值比较如果大于根节点值则在右子树进行遍历查找空位插入，否则在左子树遍历查找空位插入；
- 删除：查找，如果是叶子节点直接删除，如果单有左子节点，则左子节点顶上，单有右子节点右子节点顶上，否则的话在右子树中找到最小的值顶上；
- 重复数据二叉树查找树：当大于该重复数据处理；查找时会不停的查找直到叶子节点；
### 平衡二叉树
- 包含完全二叉树和满二叉树；
- 平衡二叉查找树（红黑树： 不严格的平衡二叉树查找树）；
- 红黑树：







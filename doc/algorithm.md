# 算法与数据结构

### 1. 常见的数据结构


1. 二叉树遍历

- 前序：
- 中序：
- 后序：
- 层次：

2. 链表： 单向链表（后继）  双向链表（前驱 & 后继）

### 2. 算法：

1. 排序：
- 冒泡(每一次都将最大的放到后面)

```js
function popSort(arr){
  let len = arr.length;
  for(let i=0;i<len-1){
    for(let j=0;j<len-1-i){
      if(arr[j]>arr[j+1]){
        arr[j]^=arr[j+1];
        arr[j+1]^=arr[j];
        arr[j]^=arr[j+1];
      }
    }
    return arr;
  }
}
```

- 快排

```js
function quickSort(arr){
  let len = arr.length;
  if(len<2){
     return arr;
  }
  let middle = arr.splice(Math.floor(len/2),1)[0];
  let right=[],left=[];
  for(let i=0;i<len-1;i++){
    if(arr[i]>middle){
      right.push(arr[i]);
    }else{
      left.push(arr[i]);
    }
  }
  return quickSort(left).concat(middle,quickSort(right));
}
```

- 归并排序


|  算法    | 时间复杂度（平均）  | 时间复杂度（最坏） | 时间复杂度（最好） | 空间复杂度 | 稳定性
| :----   | ----:            | :----:           |  :----:         | :----:   |:----: |
| 冒泡排序  | O(n^2)           | O(n^2)          |O(n)              | O(1)     | 稳定  |
| 快排      | O(nlog(2)n)      | O(nlog(2)n)    |  O(nlog(2)n)     | O(1)    |  不稳定 |


# 在 Chrome 70 以前，sort 的算法比较特殊：

当元素个数小于 10 个的时候，使用插入排序；
当元素个数大于 10 个的时候，使用快速排序。
众所周知：插入排序是稳定的，快速排序是并不稳定的。

从 Chrome 70 开始，V8 团队更新了排序算法，使用了 Timsort 算法。Timsort 排序算法是稳定的。

## 衡量算法的优劣：
1. 时间复杂度； T(n)=O(fn(n))    平均、均摊、最好、最坏
- 常数阶O(1)
- 对数阶O(logN)
- 线性阶O(n)
- 线性对数阶O(nlogN)
- 平方阶O(n²)
- 立方阶O(n³)
- K次方阶O(n^k)
- 指数阶(2^n)
2. 空间复杂度；
- 常数阶O(1)
- 先性阶O(n)
- 平方阶O(n2)

# 题：
1. 两数和：
```js 暴力破解 时间： O(n^2)  空间：O(1)

var twoSum = function (nums, target) {
  var len = nums.length;
  if (len < 2) {
    return;
  }
  for (var i = 0;i < len - 1;i++) {
    for (var j = i + 1;j < len;j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

// Accepted
54/54 cases passed (140 ms)
Your runtime beats 5.48 % of javascript submissions
Your memory usage beats 17.4 % of javascript submissions (38.5 MB)

<!-- hash表 -->  时间： O(n)  空间：O(n)
var twoSum = function (nums, target) {
  var len = nums.length;
  if (len < 2) {
    return;
  }
  var hashMap = [];
  for (var i = 0;i < len;i++) {
    if (hashMap[target - nums[i]] !== undefined) {
      return [hashMap[target - nums[i]], i]
    }
    hashMap[nums[i]] = i;
  }
};
// Accepted
54/54 cases passed (96 ms)
Your runtime beats 26.32 % of javascript submissions
Your memory usage beats 12.62 % of javascript submissions (39.3 MB)

<!-- 字典表 --> 时间： O(n)  空间：O(n)
var twoSum = function (nums, target) {
  var len = nums.length;
  if (len < 2) {
    return;
  }
  var dic = {};
  for (var i = 0;i < len;i++) {
    if (dic[target - nums[i]] !== undefined) {
      return [dic[target - nums[i]], i]
    }
    dic[nums[i]] = i;
  }
};
// Accepted
54/54 cases passed (88 ms)
Your runtime beats 50.88 % of javascript submissions
Your memory usage beats 13.31 % of javascript submissions (39.2 MB)
```

## [2] 两数相加

- 备用知识：
线性的顺序存储数据，而是在每一个节点里存到下一个节点的指针(Pointer)。由于不必须按顺序存储，链表的插入和删除操作可以达到O(1)的复杂度。本文将讲解单向链表和双向链表，其中双向链表会给出部分关键代码实现。

```js
var addTwoNumbers = function (l1, l2) {
  var c1 = l1,
    c2 = l2,
    l3, c3,
    carry = 0;
  while (c1 || c2 || carry) {
    var v1 = 0,
      v2 = 0;
    if (c1) {
      v1 = c1.val;
      c1 = c1.next;
    }
    if (c2) {
      v2 = c2.val;
      c2 = c2.next;
    }
    var sum = v1 + v2 + carry;
    carry = Math.floor(sum / 10);
    if (!c3) {
      l3 = new ListNode(sum % 10);
      c3 = l3;
    } else {
      c3.next = new ListNode(sum % 10);
      c3 = c3.next;
    }
  }
  return l3;
};

Accepted
1568/1568 cases passed (136 ms)
Your runtime beats 82.35 % of javascript submissions
Your memory usage beats 79.72 % of javascript submissions (42.8 MB)

var addTwoNumbers = function (l1, l2) {
  var c1 = l1,
    c2 = l2,
    l3, c3,
    carry = 0;
  while (c1 || c2 || carry) {
    var v1 = 0,
      v2 = 0;
    if (c1) {
      v1 = c1.val;
      c1 = c1.next;
    }
    if (c2) {
      v2 = c2.val;
      c2 = c2.next;
    }
    var sum = v1 + v2 + carry;
    carry = sum > 9 ? 1 : 0;
    if (!c3) {
      l3 = new ListNode(sum % 10);
      c3 = l3;
    } else {
      c3.next = new ListNode(sum % 10);
      c3 = c3.next;
    }
  }
  return l3;
};

Accepted
1568/1568 cases passed (140 ms)
Your runtime beats 72.33 % of javascript submissions
Your memory usage beats 47.21 % of javascript submissions (43.1 MB)
```


## [4] 寻找两个正序数组的中位数
 - 方案1： 暴力破解  T:O(m+n) 合并、排序、找中位数
```js 
var findMedianSortedArrays = function (nums1, nums2) {
  let arr = nums1.concat(nums2);
  let len = arr.length;
  let middleNum = 0;
  if (len === 1) {
    return arr[0];
  }
  for (let i = 0;i < len - 1;i++) {
    for (let j = 0;j < len - 1 - i;j++) {
      if (arr[j] > arr[j + 1]) {
        arr[j] ^= arr[j + 1];
        arr[j + 1] ^= arr[j];
        arr[j] ^= arr[j + 1];
      }
    }
  }
  if (len % 2) {
    middleNum = arr[Math.floor(len / 2)];
  } else {
    middleNum = (arr[Math.floor(len / 2) - 1] + arr[Math.floor(len / 2)]) / 2;
  }
  return middleNum;
};

Accepted
2094/2094 cases passed (192 ms)
Your runtime beats 15.48 % of javascript submissions
Your memory usage beats 97.73 % of javascript submissions (41.7 MB)
```
 - 方案2：二分查找、分治算法

 ## [88] 合并两个有序数组
 - 方案1： 直接合并排序  T：O((m+n)log(m+n))， S: O(log(m+n))
 - 方案2： 双指针
 ```js
 var merge = function(num1,m,num2,n){
   let p1=0,
   p2=0,
   sotred = [],
   cur;
   while(p1<m||p2<n){
     if(p1===m){
       cur = num2[p2++];
     }else if(p2===n){
       cur= num1[p1++];
     }else if(num1[p1]<num2[p2]){
       cur=num1[p1++];
     }else{
       cur=num2[p2++];
     }
     stored[p1+p2-1]=cur;
   }
   for(let i=0;i<m+n;i++){
     num1[i]=stored[i];
   }
 }

 ```
 - 方案3： 逆向双指针，归并排序 T:O(m+n)； S:O(1);
```js 归并
var merge = function(nums1, m, nums2, n) {
  let p1 = m - 1, p2 = n - 1;
  let tail = m + n - 1;
  while (p1 >= 0 || p2 >= 0) {
      if (p1 < 0) {
        nums1[tail--] = nums2[p2--];
      } else if (p2 <0) {
        nums1[tail--] = nums1[p1--];
      } else if (nums1[p1] > nums2[p2]) {
        nums1[tail--] = nums1[p1--];
      } else {
        nums1[tail--] = nums2[p2--];
      }
  }
};

Accepted
59/59 cases passed (80 ms)
Your runtime beats 85.01 % of javascript submissions
Your memory usage beats 77.48 % of javascript submissions (37.8 MB)


```

## [162]: 查找峰值

- 方案1：直接遍历数组找出一个元素符合    nums[res-1]<=nums[res]<=nums[res+1]
- 方案2：二分法：找出符合条件的中间数
```js
function findPeek(nums){
  if(nums.length = 1){
    return 0
  }
  let left=0,right=nums.length-1;
  while(left<=right){
    let middle = left+Math.floor((right-left)/2);
    if(nums[middle]<nums[middle+1]){
      left=middle+1;
    }else if(nums[middle]<nums[middle-1]){
      right=middle-1;
    }else{
      return middle;
    }
  }
}
```
## [287]：寻找重复数
- 方案1： 暴力解法 双循环
```js
var findDuplicate = function(nums) {
  for (let i = 0,len=nums.length; i <len ; i++) {
    for(let j = i+1 ,len=nums.length; j <len ; j++){
      if(nums[i]===nums[j]){
        return nums[i];
      }
      console.log('i',i);
    }
  }  
  return -1;
};

O(n^2) O(1)
```
- 方案2： 简单法 hash表
```js
var findDuplicate = function(nums) {
    var hashMap={};
  for (let index = 0,len=nums.length; index <len ; index++) {
    if(nums[index] in hashMap){
      return nums[index];
    }else{
       hashMap[nums[index]]=1;
    }
  }  
};

O(n)  O(n)
```
- 方案3：二分法 // [0,1,2,3]   (1+3)>>1 = 2
```js
var findDuplicate = function(nums) { 
    const n = nums.length;
    let l = 1, r = n - 1, ans = -1;
    while (l <= r) {
        let mid = (l + r) >> 1;
        let cnt = 0;
        for (let i = 0; i < n; ++i) {
            cnt += nums[i] <= mid;
        }
        if (cnt <= mid) {
            l = mid + 1;
        } else {
            r = mid - 1;
            ans = mid;
        }
    }
    return ans;
};
```

## [704]：有序数组查找元素
- 方案1：简单法
- 方案2：二分法
```js
var search = function(nums, target) {
  let len = nums.length;
  let low = 0,high=len-1;
  while(low<=high){
    let middle = (low+high)>>1;
    if(target<nums[middle]){
      high=middle-1;
    }else if（target > nums[middle]){
      low=middle+1;
    }else{
      return middle;
    }
  }
  return -1;
};
```

## [744]: 寻找目标最大的最小字母

- 方案1： 迭代比较
```js
function findNearMax(letters,target) {
    for (let index = 0,len=letters.length; index < len; index++) {
      if(target<letters[index]){
        return letters[index];
      }
    }
    return letters[0];
}
```
- 二分法： 
```js
function findNearMax(letters,target){
  let left=0,right=letters.length-1;
  let len = letters.length;
  while(left<=right){
    let middle = (left+right)>>1;
    if(letters[middle].charCodeAt(0)<=target.charCodeAt(0)){
      left = middle+1;
    }else{
      right = middle-1;
    }
  }
  return left>=len?letters[0]:letters[left];
}
```




<!-- https://www.cs.usfca.edu/~galles/visualization/Algorithms.html -->



# Byte

### 3. 无重复字符的最长子串

```js  
// 1. 暴力破解
// 思路: 遍历所有的子串=》 判断子串是否包含重复元素=》 不包含的话获取长度与最大长度比较：
T: O(n^3) K:O(n)
function uniqueStr(str){
  let subStr = '';
  for(let i = 0, len = str.length; i < len; i++ ){
    if(subStr.indexOf(str[i])!==-1){
      return false;
    }else{
      subStr = subStr+str[i];
    }
  }
  return true;
}

function maxSubStr(s){
  let maxLen = 0;
  let len = s.length;
  if(!len){
    return maxLen;
  }
  for(let i = 0; i < len; i++){
    for(let j = i+1; j <= len; j++){
        let subStr = s.substring(i, j);
        if(uniqueStr(subStr)){
          maxLen=Math.max(maxLen, subStr.length)
        }
    }
  }
  return maxLen;
}

// 2. 滑动窗口： 
// 思路：滑动窗口不断向前，当前元素不在set中 就加入set 然后更新最大长度，i++继续下一轮循环，set中有重复元素不断让j++ 并删除窗口之外的元素 直到滑动窗口内没有重复的元素
// 复杂度：时间复杂度O(n)，n是字符串的长度。空间复杂度是O(n)，即set的空间，最差的情况是O(n)
function maxSubStr(s){
  let l = 0,
  r = 0,
  maxLen = 0;
  let len = s.length;
  let set = new Set();
  if(len===0){
    return maxLength;
  }
  for(r; r< len; r ++){
    if(!set.has(s[r])){
      set.add(s[r]);
      maxLen = Math.max(maxLen, set.size)
    }else{
      while(set.has(s[r])){
        set.delete(s[l]);
        l++;
      };
      set.add(s[r]);
    }
  }
  return maxLen;
}

// 优化
function maxSubStr(s){
  let r = 0, len = s.length, maxLen = 0;
  let newStr = '';
  for(r; r < len; r++){
    if(newStr.indexOf(s[r])===-1){
        newStr=newStr+s[r];
        maxLen = Math.max(maxLen, newStr.length);
    }else{
        let index = newStr.indexOf(s[r]);
        newStr = newStr.substring(index+1, r);
        newStr = newStr+s[r];
    }
  }
  return maxLen;
}
```
### 217. 存在重复元素 I （easy）
>>给定一个整数数组，判断是否存在重复元素。

如果存在一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。
```js
function existRepeat(nums){
  let len = nums.length;
  let set = new Set();
  for(let i =0; i < len; i++){
    if(set.has(nums[i])){
      return true;
    }else{
      set.add(nums[i]);
    }
  }
  return false;
}

```
### 219. 存在重复元素 II （easy）
>>给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的 绝对值 至多为 k。
```js
function existRepeat(nums, k){
  let len = nums.length;
  let set = new Set();
  for(let i=0; i<len; i++){
    if(set.has(nums[i])){
      return true;
    };
    set.add(nums[i]);
    if(set.size>k){
      set.delete(nums[i-k])
    }
  }
  return false;
}
```

### 76. 最小覆盖子串 （hard）
>>> 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""
```js 
// 暴力破解
// 思路: 1. 获取s所有的长度大于t的子串； 2. 将所有的子串按照长度排序 3. 获取t的元素频次 4. 遍历子串{
// 1. 统计对应子串元素频次； 2. 当子串的频次大于等于t串对应元素的频次时有效元素个数++； 3. 当子串有效元素个数等于t串的长度时，终止遍历返回该串； 4. 否则继续遍历下一个子串}
function minStr(s, t){
  let sLen = s.length;
  let tLen = t.length;
  if(sLen < tLen){
    return '';
  }
  // 获取所有s的长度大于 tlen的子串
  let subStrList = [];
  for(let i = 0; i< sLen; i++){
    for(let j= i+1; j<= sLen; j++){
      let subStr = s.slice(i, j);
      if(j-i >= tLen){
        subStrList.push(subStr)
      }
    }
  }

  // 排序，根据字符串的长度
  subStrList.sort((a,b)=> a.length - b.length);
  // 统计t串字符出现是频次 
  let tP={};
  for(let key of t){
    tP[key] = (tP[key]||0)+1;
  }
  // 遍历
  for(let i = 0; i< subStrList.length; i++){
    // 获取当前串字母出现的频次
    let strP={};
    for(let key of subStrList[i]){
      strP[key] = (strP[key]||0)+1;
    }
    let count = 0;
    for(let key of t){
      if(strP[key]){
        if(strP[key]>=tP[key]){
          count++;
        }
      }
      if(count===tLen){
         return subStrList[i];
      }
    }
  }
  return '';
}

function minWindow(s, t){
  let need = {};  // 需要覆盖字符串的频次
  let wind = {}; // 滑动窗口字符串的频次
  // t的频次
  for(let key of t){
    need[key] = (need[key]||0)+1;
  }

  let left = 0, right = 0;
  let len = s.length;
  let val = 0; // 有效字符个数
  let start = 0; // 起始位置
  let minLen = Number.MAX_VALUE;//最小覆盖子串长度

  while(right<len){
    let c = s[right];
    right++;
    if(need[c]){
      wind[c] = (wind[c] || 0) + 1;
       if(wind[c]===need[c]){
          val++;
       }
    }
   
    while(val===Object.keys(need).length){ // 满足了
      if(right - left < minLen){
        start = left;
        minLen = right - left;
      }
      let d = s[left];
      left++;
      if(need[d]){
        if(wind[d]===need[d]){
          val--;
        }
        wind[d]--;
      }
    }
  }
  return minLen == Number.MAX_VALUE ?"":s.substr(start, minLen);
}
```

### 438 找到字符串中所有字母异位词:
给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。

1. 子串元素个数相同、单个元素的频次相同
```js

function asyLocation(s,p){
  let left = 0, right = 0;
  let need = {}; // p中元素的频次
  let wind = {}; // 子串中元素的频次
  let valid = 0;
  let res = [];

  for(let val of p){
    need[val]=(need[val] || 0) +1;
  }

  while(right < s.length){
    let b = s[right];
    right++;
    if(need[b]){
      wind[b]=(wind[b] || 0) +1;
      if(need[b]=== wind[b]){
         valid++;
      }
    }

    while(right-left>=p.length){
      if(valid===Object.keys(need).length){
        res.push(left);
      }
      let c = s[left];
      left++;
      if(need[c]){
        if(wind[c]===need[c]){
          valid--;
        }
        wind[c]--;
      }
    } 
  }
  return res;
}




var findAnagrams = function (s, p) {
    let need = {};//需要的字符
    let win = {};//窗口中的字符
    for (let a of p) {//统计异位词的数量
        need[a] = (need[a] || 0) + 1;
    }
    //左右指针
    let left = 0,
        right = 0;
    let val = 0;//窗口中和need中字符数量一致的字符种类
    let res = [];
    while (right < s.length) {
        let c = s[right];
        right++;//右边的字符进入窗口
        if (need[c]) {
            win[c] = (win[c] || 0) + 1;//当前字符在need中，更新窗口中的字符数量
            if (win[c] == need[c]) {
                val++;//该字符在窗口中和need中的字符匹配时，字符种类+1
            }
        }
        while (right - left >= p.length) {//不断出窗口
            if (val == Object.keys(need).length) {//如果此时窗口中的子串和p是异位词则将左边界加入res中
                res.push(left);
            }
            let d = s[left];
            left++;//出窗口
            if (need[d]) {//如果该字符在need中 更新窗口中的字符数量 和字符种类
                if (win[d] == need[d]) {
                    val--;
                }
                win[d]--;
            }
        }
    }
    return res;
};



var findAnagrams = function (s, p) {
    let need = {};//需要的字符
    let win = {};//窗口中的字符
    for (let a of p) {//统计异位词的数量
        need[a] = (need[a] || 0) + 1;
    }
    //左右指针
    let left = 0,
        right = 0;
    let val = 0;//窗口中和need中字符数量一致的字符种类
    let res = [];
    while (right < s.length) {
        let c = s[right];
        right++;//右边的字符进入窗口
        if (need[c]) {
            win[c] = (win[c] || 0) + 1;//当前字符在need中，更新窗口中的字符数量
            if (win[c] == need[c]) {
                val++;//该字符在窗口中和need中的字符匹配时，字符种类+1
            }
        }
        while (right - left >= p.length) {//不断出窗口
            if (val == Object.keys(need).length) {//如果此时窗口中的子串和p是异位词则将左边界加入res中
                res.push(left);
            }
            let d = s[left];
            left++;//出窗口
            if (need[d]) {//如果该字符在need中 更新窗口中的字符数量 和字符种类
                if (win[d] == need[d]) {
                    val--;
                }
                win[d]--;
            }
        }
    }
    return res;
};
```

### 1456. 定长子串中元音的最大数目 (medium)
```js
// a e i o u
// 思路： 滑动窗口 left  => right;  先 right++; 当 right-left===k 时，统计当前结果取最大的，然后固定窗口右移一位，继续统计；
function maxCount(s, k){
  let sLen = s.length;
  let tar = ['a','e','i','o','u'];
  if(sLen<k){
    return 0;
  }
  let max = 0;
  let left = 0; right=0;

  let valid = 0;
  while(right<s.length){
    let b = s[right];
    right++;
    if(tar.indexOf(b)!==-1){
      valid++;
    }
    if(right-left===k){
        max=Math.max(max,valid);
        let c = s[left];
        if(tar.indexOf(c)!==-1){
          valid--;
        }
        left++;
    }
  }
  return max;
}
```
### 904. 水果成篮 (medium)

```js
// 思路： 连续子串只有两种类型的最大子串长度

function max(fruits){
  let len = fruits.length;
  let l=0,n=0;
  let maxSub=0;
  if(!len){
    return 0;
  }
  let typeArr = [fruits[0]];

  for(let r=0; r<len; r++){
    if(!typeArr.includes(fruits[r])){
      if(typeArr.length===1){
        typeArr[1]= fruits[r];
      }else{
        // 前一个类型的结束位置
        l=n; 
        typeArr[0]=fruits[r-1];
        typeArr[1]=fruits[r];
      }
    }

    if(fruits[r]!==fruits[n]){
      n = r;
    }
    maxSub = Math.max(maxSub,r-l+1);
  }
  return maxSub;
}
```

# 动态规划
```js
  // 递归 f(0)=0; f(1)=1;
  function dg(n){
    if(n===0) return 0;
    if(n===1) return 1;
    return dg(n-1)+dg(n-2);
  }

// 递归+记忆
  function dg(n){
    let memo={};
    function helper(x){
      if(memo[x]) return memo[x];
      if(x===0) return 0;
      if(x===1) return 1;
      return helper(x-1)+helper(x-2);
    }
    return helper(n);
  }
  

```
### 62. 不同路径
```js
// 思路： 动态规划： 1. 确定状态 2. 动态规划方程； 3. 初始化状态 4. 返回结果；

// 问题分析： f(i,j)=f(i-1,j)+f(i,j-1);

// 结果： f(m,n)=f(m-1,n)+f(m,n-1);

function count(m,n){
  let arr = new Array(m).fill(o).map(item=>new Array(n).fill(o));

  for(let i=0; i<m; i++){
    arr[i][0]=1;
  }

  for(let j=0; j<n; j++){
    arr[0][j]=1;
  }

  for(let i=1; i<m, i++){
    for(let j=1;j<n; j++){
      arr[i,j]=arr[i][j-1]+arr[i-1][j];
    }
  }
  return arr[i-1,j-1];
}

```

### 63. 不同路径
```js
function (obstacleGrid){
  let m = obstacleGrid.length;
  let n = obstacleGrid[0].length;
  let arr = Array(m).fill(0).map(item=> Array(n).fill(0));

  for(let i=0; i<m && obstacleGrid[i][0] === 0; i++){
    arr[i][0]=1;
  }

  for(let j=0;j<n && obstacleGrid[0][j]===0;j++ ){
    arr[0][j]=1;
  }

  for(let i=1; i<m; i++){
    for(let j=1; j<n; j++){
      arr[i][j]=obstacleGrid[i][j]?0:arr[i][j-1]+arr[i-1][j]
    }
  }
  return arr[m-1][n-1];
}
```

### 70 爬楼梯：
```js
// 思路： 动态规划 动态方程 f(n)=f(n-1)+f(n-2)
// f(1)+f(2) = f(3)
// n>=1
// f(1)=1;
// f(2)=2;
// O(T) = O(n); 空间复杂度 O(1)；

  function ways(n){
    let wayArr = [];
    wayArr[1]=1;
    wayArr[2]=2;
    for(let i=3; i<=n; i++){
      wayArr[i]=wayArr[i-1]+wayArr[i-2];
    }
    return wayArr[n];
  }
// 递归 T:O(2^n)  高度为n二叉树有2^n - -1;
function ways(n){
  if(n<=2) return n;
  return ways(n-1)+ways(n-2);
}
// 记忆+递归
function ways(n){
  let memo = {};
  function way(x){
    if(memo[x]) return memo[x];
    if(x<=2) return x;
    return way(x-1)+way(x-2);
  }
  return  way(n);
}
```
### 53. 最大子序和
```js
//  dp(i)=Max(dp(i-1)+arr[i],arr[i]);
function maxSum(nums){
  let dp=[];
  let len = nums.length;
  dp[0] = nums[0];
  for(let i=1; i<len; i++){
    dp[i]=Math.max(dp[i-1]+nums[i],num[i]);
  };
  let res = dp[0];
  for(let i=0; i< len; i++){
    res=Math.max(dp[i], res);
  }
  return res;
}
```


### 120. 三角形最小路径和
```js
//  动态规划：[[1],[2,3],[4,5,6]];  f(1) = arr[0][0]  f(2)=arr[1][0] 或者 arr[1][1] 
// [[-1],[2,3],[1,-1,-3]]  dp[i][j]=Math.min(dp[i+1][j],dp[i+1][j+1])+ arr[i][j];
function minPath(triangle){
  const len = triangle.length;
  let dp = new Array(len);
  for(let i=0; i<len; i++){
      dp[i]= new Array(triangle[i].length);
  }

  for(let i=len-1; i>=0; i--){
    for(let j=0; j< i+1; j++){
      if(i===len-1){
        dp[i][j] = triangle[i][j];
      }else{
        dp[i][j]=Math.min(dp[i+1][j],dp[i+1][j+1])+ triangle[i][j];
      }
    }
  }
  return dp[0][0];
}

var minimumTotal = function(triangle) {
    let n = triangle.length;
    let i = n-1;

    while(i--) {
        for (let j = 0; j < i+1; j++) {
            triangle[i][j] += Math.min(triangle[i+1][j], triangle[i+1][j+1]);
       }
    }
    return triangle[0][0];
};
```
### 121. 买卖股票
```js
// 1、 暴力 prices=[1,2,3]; i卖、j买 dp[i][j]= arr[j]-arr[i];
function max(prices){
  let dp=[];
  let len = prices.length;
  for(let i=0; i<len; i++){
    dp[i] = 0;
    for(let j=i+1; j< len; j++){
      dp[i] = Math.max(prices[j]-prices[i], dp[i]);
    }
  }
  let res = 0;
  for(let i=0; i<len; i++){
    res=Math.max(dp[i],res);
  }
  return res;
}

// 2. 低买高卖 记录历史低点买入  计算收益最大值
function max(prices){
  let minprices = prices[0];
  let maxprofit = 0;
  for(let i=0,len=prices.length; i<len; i++){
    if(prices[i]<minprices){
      minprices = prices[i];
    }else{
      maxprofit = Math.max(prices[i]-minprices, maxprofit);
    }
  }
  return maxprofit;
}
// 3. 动态规划：
// dp[i][1]= Max(dp[i-1][1],-prices[i]);
// dp[i][0]= Max(dp[i-1][0],dp[i-1][1]+prices[i]);
function max(prices){
  let len = prices.length;
  let dp = new Array(len).fill(0).map(()=>new Array(2).fill(0));
  dp[0][0] = 0;
  dp[0][1] = - prices[0];
  for(let i=1; i< len; i++){
    dp[i][1]= Math.max(dp[i-1][1],-prices[i]);
    dp[i][0]= Math.max(dp[i-1][0],dp[i-1][1]+prices[i]);
  }
  return dp[len-1][0];
}
```
### 122. 买卖股票的最佳时机 II
```js
// 思路： dp[i][0] = Max(dp[i-1][0], dp[i-1][1]+prices[i])  dp[i][1] = Max(dp[i-1][1], dp[i-1][0]-prices[i])  dp[n-1][0]

function max(prices){
  let len = prices.length;
  let dp = Array(len).fill(0).map(()=> Array(2).fill(0));
  dp[0][0] = 0; 
  dp[0][1]=-prices[0];
  for(let i=1; i<len; i++){
    dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]+prices[i]);
    dp[i][1] = Math.max(dp[i-1][1],dp[i-1][0]-prices[i]);
  }
  return dp[len-1][0];
}
// 压缩
function max(prices){
  let len = prices.length;
  let dp0 = 0, dp1 = -prices[0];
  for(let i=1; i<len; i++>){
    let newData0 = Math.max(dp0,dp1+prices[i]);
    let newData1 = Math.max(dp1,dp0-prices[i]);
    dp0 = newData0;
    dp1= newData1;
  }
  return dp0;
}

// 贪心
function max(prices){
  let len = prices.length;
  let ants = 0;
  for(let i=1;i<len;i++){
    ants+=Math.max(0,prices[i]-prices[i-1]);
  }
  return ants;
}
```
### 123. 最佳时机 III

```js
// 思路： dp[i][1] = Max(dp[i-1][1], dp[i-1][0]-prices[i]);  dp[i][0] = Max(dp[i-1][0], dp[i-1][1]+prices[i])

function max(prices){
  let n = princes.length;
  let buy1 = -prices[0], buys = -prices[0];
  let sell1 = 0, sell2=0;
  for(let i=1; i<n; i++){
    buy1= Math.max(buy1, -prices[i]);
    sell1 = Math.max(sell1, buy1+prices[i]);
    buy2 = Math.max(buy2, sell1-prices[i]);
    sell2 = Math.max(sell2, buy2+prices[i]);
  }
  return sell2;
}
```


### 152. 乘积最大子数组
```js
// 暴力解法 找到所有的子串最大的  f(i)= Max(f(i-1)*arr[i],arr[i])  以i结尾的乘积最大
function maxSub(nums){
    let dpMax=[];
    let dpMin=[];
    let len = nums.length;
    
    for(let i=0; i<len; i++){
      if(i===0){
        dpMax[i]=nums[i];
        dpMin[i]=nums[i];
      }else{
        dpMax[i] = Math.max(dpMax[i-1]*nums[i],dpMin[i-1]*nums[i], nums[i]);
        dpMin[i] = Math.min(dpMax[i-1]*nums[i],dpMin[i-1]*nums[i], nums[i]);
      }
    }
    let res = dpMax[0];
    for(let i=1; i<len; i++){
      res = Math.max(res,dpMax[i]);
    }
    return res;
}
```
### 279.完全平方数
```js
// 思路： 动态规划  遍历完全平方数：[1, Math.sqrt(n)];

function min(n){
  let f =[...Array(n).fill(0)];
  for(let i=1;i<=n; i++){
    f[i]=i;// 最差
    for(let j=1; i-j*j>=0; j++ ){
      f[i] = Math.min(f[i], f[i-j*j]+1);
    }
  }
  return f[n];
}
```

### 309.最佳买卖股票时机含冷冻期
```js
// 思路： dp[i][1]=Max(dp[i-1][1], dp[i-2][0]-prices[i]); dp[i][0]=Max(dp[i-1][0],dp[i-1][1]+prices[i]);
function max(prices){
  let n = prices.length;
  let dp = new Array(n).fill(0).map(()=> new Array(2).fill(0));
  dp[0][0]=0; dp[0][1]=-prices[0];
  for(let i=1; i<n; i++){
    if(i===1){
      dp[i][1]=Math.max(dp[i-1][1], 0);
    }else{
      dp[i][1]=Math.max(dp[i-1][1], dp[i-2][0]-prices[i]);
    }
     dp[i][0]=Math.max(dp[i-1][0], dp[i-1][1]+prices[i]);
  }
  return dp[n-1][0];


  let n = prices.length;
  let buy = -prices[0];//手中有股票
  let sell = 0;//没有股票
  let profit_freeze = 0;
  for (let i = 1; i < n; i++) {
      let temp = sell;
      sell = Math.max(sell, buy + prices[i]);
      buy = Math.max(buy, profit_freeze - prices[i]);
      profit_freeze = temp;
  }
  return sell;
}
```

### 455 分发饼干
```js
// 思路：贪心 大饼干 给 大胃口
function maxRes(g, s){
  g=g.sort((a,b)=> a-b);
  s=s.sort((a,b)=>a-b);
  let res= 0;
  let index = s.length-1;
  for(let i=g.length,i>=0;i--){
    if(index>=0; s[index]>=g[i]){
      res++;
      index--;
    }
  }
  return res;
}
```
### 435.无重叠区间
```js
// 思路： 元素按照右边界排序=》从左到右遍历，右边界结束越早，留给后面的空间越大，不重合空间越大个数越多，总长度减去最多不重复空间就是最少删除空间数； 

function min(intervals){
  let len = intervals.length;
  let ants = 1;
  // 排序
  intervals.sort((a,b)=> a[1]-b[1]);
  let right = intervals[0][1];
  for(let i=1; i<len; i++){
    if(intervals[i][0]>=right){
      ants++;
      right = intervals[i][1];
    }
  }
  return len - ants;
}

```

### 55.跳跃游戏：
```js
function isCover(nums){
  len = nums.length;
  if(len===1) return true;
  let cover = nums[0];
  for(let i=0; i<=cover; i++){
    cover = Math.max(cover, nums[i]+i);
    if(cover>=len-1){
      return true;
    }
  }
  return false;
}
```
### 452. 用最少数量的箭引爆气球
```js
function min(points){
  let len = points.length;
  points.sort((a,b)=>a[1]-b[1]);
  let right = points[0][1],ants = 1;
  for(let i=1; i<len; i++){
    if(right<points[i][0]){
      ants++;
      right=points[i][1];
    }
  }
  return ants;
}
```
### 881. 救生艇：
```js
function min(people,limit){
  len = people.length;
  if(len===1) return 1;
  people.sort((a,b)=>a-b);
  let res = 0;
  let i = 0;
  let j = len-1;
  while(i<=j){
    if(people[i]+people[j]<=limit){
      res++;
      i++;
      j--;
    }else{
      res++;
      j--;
    }
  }
  return res;
}
```
### 134. 加油站
```js

function isBoolean(gas, cost){
  let totalGas = 0,  totalCost = 0;
  let len = gas.length;
  for(let i=0;i<len;i++){
    totalGas+=gas[i];
    totalCost+=cost[i];
  }
  if(totalGas<totalCost) return -1;

  let current = 0;
  let start = 0;
  for(let i=0;i<len;i++){
    current = current-cost[i]+gas[i];
    if(current<0){
      current = 0;
      start=i+1;
    }
  }
  return start;
}
```

### 860.柠檬水
```js
// 思路： 找零从大面值的到小面值原则

function isBoolean(bills){
  let five = 0, ten=0;
  for(let item of bills){
    if(item===5){
      five++;
    }else if(item===10){
      if(!five) return false;
      ten++;
      five--;
    }else{
      if(five>0 && ten>0){
        five--;
        ten--;
      }else if(five>=3){
        five-=3;
      }else{
        return false
      }
    }
  }
  return true;
}
```

### 704. 二分查找：
```js
// 思路： 升序  [-1,0,3,5,9,12] 9
function findOne(nums, target){
  let n = nums.length; // 6
  let left = 0, right = n-1; // 0 5
  function find(){
    if(left>right){ // 0 5  3 5
      return -1;
    }
    let middleIndex = (left+right)>>1;  // 2 4
    let middle = nums[middleIndex]; // 3  9
    if(target>middle){  
      left = middleIndex+1; // 3
    }else if(target<middle){
      right = middleIndex-1;
    }else{
      return middleIndex;
    }
    return find();
  }
 return find();
}
```

### 35.搜索插入：
```js
// 思路： 非递归
findIndex(nums,target){
  let n = nums.length;
  let left = 0, right = n-1, ant = n;
  while(left<=right){
    let middle = (right+left)>>1;
    if(target<=nums[middle]){
      ant= middle;
      right = middle-1;
    }else{
      left = middle+1;
    }
  }
  return ant;
}

```

### 162. 返回峰值：
```js

function findPeek(nums){
  let left = 0,right=nums.length;
  // mid-1< mid  mid> mid+1
  while(left<right){
    let mid = (left+right)>>1;
    if(nums[mid]<nums[mid-1]){
      right = mid-1; //[l,mid]
    }else if(nums[mid]<nums[mid+1]){
      left = mid +1;//[mid+1,right]
    }else{
      return mid;
    }
  }
}
```

### 374. 猜数字大小；
```js
// 思路： 二分法 
// 1. 1-n 为 一个数组[1,n];  
// 2. 定义left,right, mid=(left+right)>>1; 
// 3. guess(nums[mid])>0?right=mid-1; <0 left=mid+1; =0; return nums[mid]

function guessNums(n){
  let left = 1, right=n;
  while(left<=right){
    console.time('开始');
    let mid = (left+right)>>1;
    console.timeEnd('开始');
    let isGuess = guess(mid);
    if(isGuess===0){
      return mid;
    }else if(isGuess<0){
      right = mid-1;
    }else{
      left= mid+1;
    }
  }
}



function pre(n){
  let left = 1,right=n;
  console.time('开始1');
  let mid = (left+right)>>1;
  console.timeEnd('开始1')
  console.log('mid',mid);
  console.time('开始2');
  let mid1 = Math.floor((left+right)/2);
  console.timeEnd('开始2')
  console.log('mid1',mid1);
}
```

### 659. 岛屿最大面积
```js
// 思路：深度优先 grid 二进制矩阵  1. 遍历找到 grid[i][j]===1的元素； 2. 将[i][j]=0 然后将元素的四周元素为1的递归扩散累计；3. 比较获取最大的面积；
function findMaxArea(grid){
  let rowLen = grid.length, colLen = grid[0].length;
  let ants = 0;
  function calcArea(i,j){
    if(i<0 || j<0 || i>=rowLen || j>=colLen || grid[i][j]==0) return 0;
    let dx = [-1,1,0,0],dy=[0,0,-1,1];
    let len = dx.length;
    grid[i][j]=0;
    let res= 1;
    for(let k=0;k<len;k++){
      res+=calcArea(i+dx[k],j+dy[k]);
    }
    return res;
  }
  
  for(let i=0;i<rowLen;i++){
    for(let j=0;j<colLen;j++){
      // 查找该元素周围元素
      ants = Math.max(calcArea(i,j),ants);
    }
  }
  return ants;
}

// 思路：广度优先 1. 遍历矩阵  2. 将[i][j]==1的加入queue; 3. 当queue为空继续下一个陆地 4. 返回最大area

function maxArea(grid){
  let rowLen = grid.length, colLen = grid[0].length;
  let dx = [-1,1,0,0], dy=[0,0,-1,1];
  let res = 0;
  for(let i=0; i< rowLen; i++){
    for(let j=0; j< colLen; j++){
      if(grid[i][j]===0) continue;
      let queue=[[i,j]], curr = 0;
      while(queue.length>0){
        const [x,y]= queue.shift();
        if(x<0 || x>=rowLen||y<0||y>=colLen ||grid[x][y]===0) continue;
        ++curr;
        grid[x][y]=0;
        for(let k=0;k<4;k++){
          queue.push([x+dx[k],y+dy[k]]);
        }
      }
      res = Math.max(res,curr);
    }
  }
  return res;
}

var maxAreaOfIsland = function(grid) {
 let ans = 0, row = grid.length, col = grid[0].length;
    let dx = [1, -1, 0, 0], dy = [0, 0, 1, -1];//方向数组
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (grid[i][j] === 0) continue;//循环网格，遇到0就跳过
            let queue = [[i, j]], curr = 0;//在队列中加入当前网格的值
            while (queue.length > 0) {
                let [x, y] = queue.shift();//不断出队
              	//越界判断
                if (x < 0 || x >= row || y < 0 || y >= col || grid[x][y] === 0) continue;
                ++curr;//更新岛屿的数量
                grid[x][y] = 0;//遍历过的网格置为0
                for (let k = 0; k < dx.length; k++) {//上下左右遍历，把下一层的节点加入队列
                    queue.push([x + dx[k], y + dy[k]]);
                }
            }
            ans = Math.max(ans, curr);//更新最大岛屿面积
        }
    }
    return ans;
};
```

### 141. 环形链表：
```js
// 思路：1. 定义map 2. 遍历链表，当map中不存在该node时，添加到map中 否则返回 false；
function isCycle(head){
  let map = new Map();
  while(head){
    if(map.has(head)) return true;
    map.set(head,true);
    head = head.next;
  }
  return false;
}

// 思路： 快慢指针， 如果有环则就会发生 Node快===Node慢
function isCycle(head){
  let fast = head;
  let slow = head;
  while(fast&&fast.next){
    slow = slow.next;
    fast = fast.next.next;
    if(slow===fast) return true;
  }
  return false;
}
```

### 142. 环形链表：
```js
// 思路：遍历链表节点 并记录 当遇到此前遍历过的节点  则判定有环  hash表方便实现
function cycleNode(head){
  let set = new Set();
  while(head){
    if(set.has(head)) return head;
    set.add(head,true);
    head=head.next;
  }
  return null;
}

// 思路： 快慢指针  环外距离 a  slow: a+b   fast: a+(b+c)n+b  => 2*slow = fast;
// 2(a+b) = a+(b+c)n+b=a+(1+n)b+nc =>  2a+2b=a+(1+n)b+nc => a=(1+n)b+nc-2b => a=(n-1)b+nc=> a=c
function cycleNode(head){
  let fast = head,slow = head;
  while(fast&&fast.next){
    fast = fast.next.next;
    slow = slow.next;
    if(fast===slow) {
      fast=head;
      while(fast!==slow){
        fast = fast.next;
        slow = slow.next;
      }
      return fast;
    }; 
  }
  return null;
}

```
### 876:链表的中间节点
```js
// 思路： 快慢 指针
function midNode(head){
  let fast=head,slow=head;
  while(fast&&fast.next){
    fast=fast.next.next;
    slow=slow.next;
  }
  return slow;
}
```

### 191. 位1的个数：
```js
function prinCount(n){
  let res = 0;
  for(let i=0;i<32;i++){
    if(n&(1<<i)){
      res++;
    }
  }
  return res;
}
```

### 231. 2的幂
```js
// 思路： 2的幂 是一个数的二进制里面只有1个1
function two(n){
  return n>0 && n&(n-1)===0;
}
```

### 50. pow
```js
function pow(x,n){
  if(x===0|| x===1) return x;
  if(n===0) return 1;
  if(n<0){
    return 1/pow(x,-n);
  }
  // 奇数
 if(n%2){
    return x*pow(x,n-1);
  }
  // 偶数
  return pow(x*x,n/2);
}
```

### 169.多数元素
```js
// 思路： 暴力解法， 统计所有元素的个数
function find(nums){
  let n = nums.length;
  let hashMap = {};
  for(let i=0;i<n;i++){
    if(hashMap[nums[i]]){
      hashMap[nums[i]]= hashMap[nums[i]]+1;
      if(hashMap[nums[i]]>n/2) return nums[i];
    }else{
      hashMap[nums[i]] = 1;
    }
  }
  return nums[0];
}
```

```js
// 思路：二分法 分治  Ot(nlogn) Ok(n)
function quickSort(nums){
  let len = nums.length;
  if(len<=1) return nums;
  let left = [], right = [],start = 0, end = len-1;
  let mid = Math.floor((start+end)/2);
  let midValue = nums.splice(mid,1)[0];
  for(let i=0;i<len-1; i++){
    if(nums[i]<midValue){
      left.push(nums[i]);
    }else{
      right.push(nums[i])
    }
  }
  return quickSort(left).concat(midValue,quickSort(right))
}
```

```js
function ways(m,n){
  let dp = new Array(n).fill(0).map(item=>new Array(n).fill(0));
  for(let i=0;i<m;i++){
    dp[i][0]=1
  }
  for(let j=0;j<n;j++){
    dp[0][j]=1;
  }
  for(let i =1;i<m;i++){
    for(let j=1;j<n;j++){
        dp[i][j]=dp[i-1][j]+dp[i][j-1];
    }
  }
  return dp[n-1][m-1];
}
```

### 64.最小路径和
```js
function min(grid){
  let row = grid.length, col = grid[0].length;
  
  for(let i=1;i<row; i++){
    grid[i][0]+=grid[i-1][0];
  }

  for(let j=1;j<col; j++){
    grid[0][j]+=grid[0][j-1];
  }

  for(let i=1;i<row;i++){
    for(let j=1;j<col;j++){
      grid[i][j]+=Math.min(grid[i-1][j],grid[i][j-1]);
    }
  }
  return grid[row-1][col-1];
}
```

### 22.括号的生成
```js
// 思路: 暴力解法
function print(n){
  let res = [];
  const generate=(str,left,right)=>{
    if(str.length===2*n){
      res.push(str);
      return;
    }
    if(left>0){
      generate(str+'(',left-1,right);
    }
    if(right>left){
      generate(str+')',left,right-1)
    }
  }
  generate('',n,n);
  return res;
}

// 思路：backtrack 回溯
```

### 36. 有效数独
```js
// 思路： hash-table 1. 定义 行、列、子数独的hash-table 2. 遍历数独，判断元素是否已经存在hash-table中，存在则返回false,否则add到hash-table中； 3. 遍历完成后 true
function isValite(board){
  let n = board.length;
  let row = {}, col={}, sub = {};
  for(let i=0;i<n; i++){
    for(let j=0;j<n; j++){
      let num = nums[i][j];
      let subIndex = parseInt((i/3))*3+parseInt(j/3);
      if(num!==='.'){
        if(row[i+'-'+num]|| col[j+'-'+num]|| sub[subIndex+'-'+num]){
          return false;
        }
        row[i+'-'+num] = true;
        col[j+'-'+num] = true;
        sub[subIndex+'-'+num] = true;
      }
    }
  }
  return true;
}



function isValite(board){

}
```

### 堆： 堆里面添加和去除



### 最长子串
```js

// 思路： 最长子串，滑动窗口： 1. left,right， set  2. 先固定left, 遍历字符串为right++,当set.has为true则重复； 固定right，开始遍历移动left++ 、set.delete ；当set.has为false的话； set.add(right,true);

function maxLength(str){
  const n = str.length;
  let left = 0, i =0, set = new Set(),maxLen=0;
  for(i;i<n;i++){
    right=i;
    if(!set.has(str[i])){
      set.add(str[i],true);
      maxLen = Math.max(maxLen, set.size)
    }else{
      while(set.has(str[i])){
        set.delete(str[left]);
        left++;
      }
      set.add(str[i]);
    }
  }
  return maxLen;
}


// 思路： left right  满足：nums[left] = nums[right] 且 right-left <= k; //固定窗口
function isExist(nums, k){ 
  let set = new Set();
  let n = nums.length;
  for(let i=0;i<n;i++){
    if(set.has(nums[i])){
      return true;
    }
    set.add(nums[i]);
    if(set.size>k){
      set.delete(nums[i-k]);
    }
  }
  return false;
}

// 定长 最多 元音
function max(s, k){
  let set = new Set(['a','e','i','o','u']);
  let count = 0, len = s.length;
  let l=0,r=0;
  // 初始化窗口
  while(r<k){
    set.has(s[r])&&count++;
    r++;
  }
  let max=count;
  while(r<s){
    set.has(s[r])&&count++;
    set.has(s[l])&&count--;
    l++;
    r++;
    max=Math.max(count,max);
  }
  return max;
}
// 思路： 相邻比较 交换位置  第一轮下来保证第最后一个是最大的  n-1轮完成；
function popSort(nums){
  let n = nums.length;
  for(let i=0;i<n;i++){
    for(let j=0;j<n-i-1;j++){
      if(nums[j]>nums[j+1]){
        nums[j]^=nums[j+1];
        nums[j+1]^=nums[j];
        nums[j]^=nums[j+1];
      }
     
    }
  }
  return nums;
}

// 思路：快排
function quickSort(arr){
  let left = [],right=[],start = 0,end=arr.length;
  let mid = Math.floor((start+end)/2);
  let midValue = arr.splice(mid,1)[0];
  for(let i=0;i<arr.length;i++){
     if(arr[i]>midValue){
      right.push(arr[i]);
     }else{
      right.push(arr[i]);
     }
  }
  return quickSort(left).concat(midValue, quickSort(right));
 
}
// 思路： 选择 1. 第一次将第一小放到第一位  2. 第二次将第二小放到第二位 需执行 n-1轮
function selSort(arr){
  let n = arr.length;
  let minIndex = 0;

  for(let i=0;i<n-1;i++){
    minIndex = i;
    for(let j=i+1;j<n;j++){
      if(arr[minIndex]>arr[j]){
        minIndex = j;
      }
    }
    arr[i]^ = arr[minIndex];
    arr[minIndex]^ = arr[i];
    arr[i]^=arr[minIndex];
  }
  return arr;
}

// 归并排序
// 思路： 分治=》分、治

// 合
function merge(left,right){
  let res = [];
  while(left.length&&right.length){
    if(left[0]<=right[0]){
      res.push(left.shift());
    }else{
      res.push(right.shift());
    }
  }
  while(left.length){
    res.push(left.shift());
  }
  while(right.length){
    res.push(right.shift());
  }
  return res;
}
// 分
function mergeSort(arr){
  let n = arr.length;
  if(n<2) return arr;
  let middle = Math.floor(n/2);
  let left = arr.slice(0,middle);
  let right = arr.slice(middle);
  return merge(mergeSort(left),mergeSort(right))
}



```


```js
// 时间复杂度 n^2 空间复杂度 1
function popSort(arr){
  let len = arr.length;
  if( len < 2 ) return arr;
  for(let i=0; i< len-1; i++){  
    for(let j=0; j<len-i-1; j++){
      if(arr[j]>arr[j+1]){
        arr[j]^=arr[j+1];
        arr[j+1]^=arr[j];
        arr[j]^=arr[j+1]
      }
    }
  }
  return arr;
}

// 快排 O(T) nlog(n)
function binarySort(arr){
  let len = arr.length;
  if(len<2) return arr;
  let middle = arr.splice(Math.floor(len/2),1)[0];
  let left = [], right = [];
  for(let i=0;i<len-1; i++){
    if(arr[i]<middle){
      left.push(arr[i]);
    }else{
      right.push(arr[i]);
    }
  }
  return binarySort(left).concat(middle, bbinarySort(right))
}
```


# 斐波那契数列[1,1,2,3,5,8,13,……] 

1. 暴力递归
```js
F(n)=F(n-1)+F(n-2) =>

function F(n){
  if(n===0) return 0;
  if(n===1) return 1;
  return F(n-1)+F(n-2);
}
```
2. 递归 + 记忆
```js
function F(n){
  let memory = {};
  function f(n){
    if(memory[n]) return memory[n];
    if(n===0){
      memory[0]=0;
      return 0;
    }
    if(n===1){
      memory[1]=1;
      return 1;
    }
    memory[n] = f(n-1) + f(n-2);
    return memory[n];
  }
  return f(n);
}
```


# 传递悄悄话（求最大时间）

```js
// 深度优先搜索
function maxTime(root){
  let paths = [];
  function dep(nodeData, path){
    if(nodeData == -1) return;
    path+=path;
    if(nodeData.left == null && ndoeData.right == null){
      paths.push(path);
    }else{
       nodeData.left !== -1 && dep(nodeData.left, path);
       nodeData.right !== -1 && dep(nodeData.right, path);
    }
  }
  dep(nodeRoot, 0);
  returm Math.max(...paths);
}
```
# 计算面积
```js
// arr = [[3, 10], [1, 0],[2,1],[3,1]]
function area(arr){
  const n = arr[0][0];
  let pointY = arr[1][1];
  let area = 0;
  for(let i=2; i<n; i++){
    pointY += arr[i+1][1];
    area +=  Math.abs((arr[i+1][0]- arr[i][0])*pointY);
  }
  return area;
}
```
# leetCode经典面试题

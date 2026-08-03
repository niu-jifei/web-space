/*
 * XHR 测试
XMLHttpRequest是浏览器提供的JavaScript API，用于在浏览器和服务器之间进行数据交互。

XHR 与 fetch 的核心区别
特性	XMLHttpRequest	fetch
API 设计​	基于事件回调（onreadystatechange）	基于 Promise
语法复杂度​	繁琐，需处理多个状态	简洁，支持链式调用
默认凭证​	同源请求自动携带 Cookie	默认不携带，需显式设置
响应类型​	自动根据 responseType解析	需手动调用 .json()、.text()等
超时控制​	内置 timeout属性	需用 AbortController
取消请求​	有 abort()方法	需用 AbortController
进度监控​	有 onprogress事件	需通过 Response.body 流式读取
同步支持​	支持同步请求（不推荐）	只支持异步
错误处理​	网络错误和 HTTP 错误统一处理	只有网络错误会 reject，HTTP 错误需手动检查
浏览器支持​	几乎全支持（包括 IE7+）	现代浏览器支持（IE 不支持）
 */

// 1. 基本用法
// 1. 创建 XHR 对象
var xhr = new XMLHttpRequest();

// 2. 配置请求
xhr.open('GET', 'https://api.example.com/data', true); // true 表示异步

// 3. 设置回调
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) { // 请求完成
    if (xhr.status === 200) { // 成功
      var data = JSON.parse(xhr.responseText);
      console.log(data);
    } else {
      console.error('请求失败: ' + xhr.status);
    }
  }
};

// 4. 设置错误处理
xhr.onerror = function() {
  console.error('网络错误');
};

// 5. 发送请求
xhr.send();


// 1. 发送GET请求并处理JSON
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      console.log(data);
    } else {
      console.error('请求失败: ' + xhr.status);
    }
  }
};
xhr.send();

// 2. 发送POST请求并处理JSON
var xhr = new XMLHttpRequest();
xhr.open('POST', 'https://api.example.com/data', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log('成功');
    } else {
      console.error('请求失败: ' + xhr.status);
    }
  }
};
xhr.send(JSON.stringify({ key: 'value' }));
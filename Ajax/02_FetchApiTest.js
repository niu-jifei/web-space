/*
核心特点：
基于 Promise​
直接返回 Promise对象，支持 async/await和链式调用（.then()、.catch()），避免了回调地狱。

默认不携带 Cookie​
与某些旧 API 不同，默认请求不发送或接收 Cookie，如需携带需设置 credentials: 'include'。

默认不遵循重定向​
默认不会自动重定向，需通过 redirect选项控制（如 follow、error、manual）。

更模块化的设计​
通过 Request、Response、Headers等接口提供细粒度控制。
*/

// 1. 最简单的 GET 请求
fetch('https://api.example.com/data')
  .then(response => response.json()) // 解析为 JSON
  .then(data => console.log(data))
  .catch(error => console.error('请求失败:', error));

// 2. 使用 async/await
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('请求失败:', error);
  }
}

// 3. 带配置的 POST 请求
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ key: 'value' }), // 发送 JSON 数据
  credentials: 'include', // 包含 Cookie
  mode: 'cors', // 跨域模式
})
  .then(response => response.json())
  .then(data => console.log(data));


// 4. 处理响应
fetch('https://api.example.com/data')
  .then(response => {
    // 检查 HTTP 状态码
    if (!response.ok) {
      throw new Error(`HTTP 错误 ${response.status}`);
    }
    
    // 根据 Content-Type 选择解析方式
    const contentType = response.headers.get('content-type');
    if (contentType.includes('application/json')) {
      return response.json();
    } else if (contentType.includes('text/html')) {
      return response.text();
    }
    return response.blob(); // 二进制数据
  })
  .then(data => console.log(data));

// 5. 处理错误
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) { // fetch 只在网络故障时 reject，HTTP 错误（如 404）需手动处理
      throw new Error(`状态码: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => {
    console.error('请求失败:', error); // 捕获网络或手动抛出的错误
  });

// 现代化的 API 调用
async function getUserData() {
  try {
    const response = await fetch('/api/user', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    
    if (!response.ok) throw new Error('请求失败');
    
    return await response.json();
  } catch (error) {
    console.error('获取用户数据失败:', error);
  }
}
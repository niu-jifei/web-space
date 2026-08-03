console.log('hello world');

// 模拟成功的异步操作
function simulateApiSuccess() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          id: 1,
          name: '测试用户',
          message: '请求成功'
        }
      });
    }, 5000); // 模拟5秒延迟
  });
}

// 模拟失败的异步操作
function simulateApiFailure() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({
        status: 500,
        message: '服务器错误'
      });
    }, 1000);
  });
}

// 测试成功案例
simulateApiSuccess()
  .then(response => {
    console.log('成功响应:', response);
  })
  .catch(error => {
    console.error('错误:', error);
  });

// 测试失败案例
simulateApiFailure()
  .then(response => {
    console.log('成功响应:', response);
  })
  .catch(error => {
    console.error('错误:', error);
  });
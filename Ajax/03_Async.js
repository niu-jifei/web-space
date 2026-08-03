/* 
回调地狱（Callback Hell）
回调地狱是指嵌套的回调函数，导致代码结构混乱、可读性差，并且容易产生错误。


回调地狱是指在ES6之前，JavaScript中处理多个异步操作时，由于依赖前一个操作的结果，不得不将回调函数层层嵌套，导致代码难以阅读和维护的现象。
*/

// 模拟读取文件：读取A -> 用A的结果读B -> 用合并结果写入C
readFile('A.txt', function(err, dataA) {
  if (err) throw err;
  
  processData(dataA, function(err, processedA) {
    if (err) throw err;
    
    readFile('B.txt', function(err, dataB) {
      if (err) throw err;
      
      writeFile('C.txt', processedA + dataB, function(err) {
        if (err) throw err;
        console.log('完成！');
      });
    });
  });
});


/* 
Promise机制
Promise是ES6引入的异步编程解决方案，用于解决回调地狱问题。

Promise是一个对象，代表一个异步操作的最终完成（或失败）及其结果值。
三种状态：
pending（进行中）
fulfilled（已成功）
rejected（已失败）
*/
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('操作成功！'); // 状态变为fulfilled
    } else {
      reject('操作失败！');  // 状态变为rejected
    }
  }, 1000);
});

// 文件读取 Promise 优化
// 用Promise重写上面的例子
readFilePromise('A.txt')
  .then(dataA => {
    return processDataPromise(dataA);
  })
  .then(processedA => {
    return readFilePromise('B.txt')
      .then(dataB => processedA + dataB);
  })
  .then(combinedData => {
    return writeFilePromise('C.txt', combinedData);
  })
  .then(() => {
    console.log('完成！');
  })
  .catch(error => {
    console.error('出错：', error);
  });

  
// async/await， ES2017引入的async/await基于Promise，让异步代码看起来像同步代码：
async function processFiles() {
  try {
    const dataA = await readFilePromise('A.txt');
    const processedA = await processDataPromise(dataA);
    const dataB = await readFilePromise('B.txt');
    await writeFilePromise('C.txt', processedA + dataB);
    console.log('完成！');
  } catch (error) {
    console.error('出错：', error);
  }
} 

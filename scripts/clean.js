// 已经没用了


const path = require('path');
const fs = require('fs')

const outputPath = '../static/mweb.css'

let cleanCache = async () => {
  const cacheFiles = [
    path.resolve(__dirname, outputPath),
    path.resolve(__dirname, outputPath + '.map')
  ];
  const taskList = cacheFiles.map(item => {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(item)) resolve(true)
      fs.unlink(item, (err) => { err ? reject(err) : resolve(true); });
    });
  });
  return Promise.all(taskList)
    .then(res => {
      if (res[0] && res[1]) { console.log('缓存记录已清除\n'); return true; }
    })
    .catch(error => { console.log(`缓存记录清除失败：${error}\n`); return false });
}

cleanCache()
const QiniuManager = require('./src/utils/QiniuManager')
const path = require('path')
//generate mac
const accessKey = 'uJdbhGnfzZeCmW15JLSnVyqbVYKqvtDk2jLs2mc0'
const secretKey = 'C8-gNPipd4nsoYwy49QgjFlwRiJDioDW0oX-o_s-'
const localFile = "/Users/f/Desktop/name1.md";
const key='test.md'
const downloadPath = path.join(__dirname, key)

const manager = new QiniuManager(accessKey, secretKey, 'markdown')
manager.uploadFile(key, downloadPath).then((data) => {
  console.log('上传成功',data)
})
//manager.deleteFile(key)
// manager.generateDownloadLink(key).then(data => {
//   console.log(data)
//   return manager.generateDownloadLink('first.md')
// }).then(data => {
//   console.log(data)
// })
//const publicBucketDomain = 'http://pv8m1mqyk.bkt.clouddn.com';

// manager.downloadFile(key, downloadPath).then(() => {
//   console.log('下载写入文件完毕')
// })
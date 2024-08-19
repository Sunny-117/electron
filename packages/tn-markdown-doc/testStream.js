
const fs = require('fs')
const zlib = require('zlib')

const src = fs.createReadStream('./test.js')
const writeDesc = fs.createWriteStream('./test.gz')
src.pipe(zlib.createGzip()).pipe(writeDesc)
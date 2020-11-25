// https://jsbin.com/lesivij/1/edit?html,js
const express = require('express')
const multer = require('multer') // 获取用户上传的文件
const cors = require('cors') // 跨域

const upload = multer({ dest: 'uploads/' }) // 上传后保存的路径
const app = express()

app.get('/', (request, response, next) => {
  response.send('hello,express!')
})

app.options('/upload', cors())
app.post('/upload', cors(), upload.single('file'), (request, response, next) => {
  // response.set('Access-Control-Allow-Origin', '*')
  response.send(request.file.filename)
})

app.get('/preview/:key', cors(), (request, response, next) => {
  response.sendFile(`uploads/${request.params.key}`, {
    root: __dirname,
    headers: {
      'Content-Type': 'image/jpeg'
    }
  },
    (error) => {
      // response.status(404).send('file not find')
      console.log(error)
    })
})

var port = process.env.PORT || 8888
app.listen(port, () => {
  console.log('now you listening the port 8888!')
})
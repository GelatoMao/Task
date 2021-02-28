var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号\n 比如node server.js 8888')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始 ************/

  console.log('路径（带查询参数）为：' + pathWithQuery)

  if (path === '/register' && method === 'POST') {
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    //读取数据库里面的数据
    const userArray = JSON.parse(fs.readFileSync('./db/users.json'))
    // 获取的数据放到数组里面 因为数据可能是分断上传的 因为不能确定数据长度是多少
    const arr = []
    request.on('data', (chunk) => {
      arr.push(chunk)
    })
    request.on('end', () => {
      // 将不同数据合成字符串
      const string = Buffer.concat(arr).toString()
      const obj = JSON.parse(string)
      // 经常忘记考虑用户不存在的情况
      const lastUser = userArray[userArray.length - 1]
      const newUser = {
        // id为最后一个用户的id加1 若数据库里数据为空 则为1
        id: lastUser ? lastUser.id + 1 : 1,
        name: obj.name,
        password: obj.password
      }
      userArray.push(newUser)
      //写入字符串
      fs.writeFileSync('./db/users.json', JSON.stringify(userArray))
    })
    response.end()
  } else if (path === '/sign' && method === 'POST') {
    //读取数据库里面的数据
    const userArray = JSON.parse(fs.readFileSync('./db/users.json'))
    // 获取的数据放到数组里面 因为数据可能是分断上传的 因为不能确定数据长度是多少
    const arr = []
    request.on('data', (chunk) => {
      arr.push(chunk)
    })
    request.on('end', () => {
      // 将不同数据合成字符串
      const string = Buffer.concat(arr).toString()
      const obj = JSON.parse(string) // name password
      // 看数据库中有没有相同的name和password
      const user = userArray.find((user) => user.name === obj.name && user.password === obj.password)
      if (user === undefined) {
        response.statusCode = 400
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.end()
      } else {
        response.statusCode = 200
        // 用户登录成功后 服务器向浏览器发送cookie
        // 使用cookie值 但是用户可以在浏览器中随意篡改
        response.setHeader('Set-Cookie', `user_id=${user.id};HttpOnly`)
        response.end()
      }
    })
  } else if (path === '/home.html') {
    //获取cookie值
    const cookie = request.headers['cookie']
    let userId
    try {
      userId = cookie.split(';').filter(s => s.indexOf('user_id=') >= 0)[0].split('=')[1]
    } catch (error) { }
    if (userId) {
      const userArray = JSON.parse(fs.readFileSync('./db/users.json'))
      const user = userArray.find(user => user.id.toString() === userId)
      //先拿到home.html中的内容
      const homeHtml = fs.readFileSync("./public/home.html").toString()
      let newString
      if (user) {
        newString = homeHtml.replace('{{loginStatus}}', '已登录').replace('{{user.name}}', user.name)
      } else {

      }
      response.write(newString)
      response.end()
    } else {
      const homeHtml = fs.readFileSync("./public/home.html").toString()
      const newString = homeHtml.replace('{{loginStatus}}', '未登录').replace('{{user.name}}', '')
      response.write(newString)
      response.end()
    }
  } else {
    response.statusCode = 200
    // 如果路径是/就变成index.html 否则还是path 默认首页
    const filePath = path === '/' ? '/index.html' : path
    // 搜索文件路径的后缀
    const index = filePath.lastIndexOf('.')
    const suffix = filePath.substring(index)
    // 运用哈希表来一一对应
    const fileTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript'
    }
    // 取不到默认值就使用html
    response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
    let content
    try {
      content = // 自动读取文件
        response.write(fs.readFileSync(`./public${filePath}`))
    } catch (error) {
      content = '文件不存在'
      response.statusCode = 404
    }
    // 添加上报错
    // response.write(content)
    response.end()
  }
  /******** 代码结束，下面不要看 ************/
  
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)
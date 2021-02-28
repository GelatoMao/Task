const fs = require('fs')
//读数据库
const usersString = fs.readFileSync('./db/users.json').toString()
//转化为数组
const usersArray = JSON.parse(usersString)
console.log(usersString);
console.log(usersArray);

//写数据库
const user3 = { id: 3, name: 'tom', password: 'yyy' }
usersArray.push(user3)
// 数据库是文件 文件只能存字符串 所以需要将数组转成字符串
const string = JSON.stringify(usersArray)
fs.writeFileSync('./db/users.json', string)
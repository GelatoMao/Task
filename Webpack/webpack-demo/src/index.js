import x from './x'
// 引入图片路径 使用file-loader生成哈希路径
import png from './assets/2.png'

const div = document.getElementById('app')
div.innerHTML = `
  <img src="${png}">
`

const button = document.createElement('button')
button.innerText = '懒加载'
button.onclick = () => {
  const promise = import('./lazy')
  promise.then((module) => { const fn = module.default; fn() }, () => { })
}
div.appendChild(button)
let n = 1


getPage.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', `/page${n + 1}`)
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      //将json字符串变成js数组
      const array = JSON.parse(request.response)
      array.forEach(item => {
        const li = document.createElement('li')
        li.textContent = item.id
        xxx.appendChild(li)
      })
      n++
    }
  }
  request.send()
}

getJSON.onclick = () => {
  const request = new XMLHttpRequest()
  request.open("get", './5.json')
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.response);
      //将符合json语法的字符串转化成json对象或者是其他东西
      const object = JSON.parse(request.response)
      console.log(object);
      myName.textContent = object.name
    }
  }
  request.send()
}
getXML.onclick = () => {
  const request = new XMLHttpRequest()
  request.open("GET", "./4.xml")
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const dom = request.responseXML
      const text = dom.getElementsByTagName('warning')[0].textContent
      console.log(text.trim());
    }
  }
  request.send()
}
getHTML.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', './3.html')
  request.onload = () => {
    const div = document.createElement('div')
    div.innerHTML = request.response
    document.body.appendChild(div)
  }
  request.onerror = () => {

  }
  request.send()
}
getJS.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/2.js')
  request.onload = () => {
    console.log(request.response);
    //创建script标签
    const script = document.createElement('script')
    //填写script内容
    script.innerHTML = request.response
    //插到body中
    document.body.appendChild(script)
  }

  request.onerror = () => {

  }

  request.send()
}

//用ajax请求css
getCSS.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/style.css') //readyState=1
  //监听成功和失败
  request.onreadystatechange = () => {
    console.log(request.readyState);
    //这边只能确定是下载完成，但是不能确定是成功的下载完成还是失败的下载完成 成功是2xx 失败是4xx或者5xx
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        //创建style标签
        const style = document.createElement('style')
        //填写style内容
        style.innerHTML = request.response
        document.head.appendChild(style)
      } else {
        alert('加载css失败')
      }
    }
  }
  request.send()//readyState=2
}

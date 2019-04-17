var log = function() {
    console.log.apply(console, arguments)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var es = function(selector) {
    return document.querySelectorAll(selector)
}

var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}
var addClass = function(element, className){
    if (!element.classList.contains(className)) {
        element.classList.add(className)
    }
}

var removeClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    }
}

var addClassAll = function (selector, className) {
  var elements = document.querySelectorAll(selector)
  for (var i = 0; i < elements.length; i++) {
      var e = elements[i]
      e.classList.add(className)
  }
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

// find 函数可以查找 element 的所有子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}

//更过js套路汇总
// data-XX=''   读取  dataset.XX
//ajax
var ajax = function(method, path, data, callback) {
  // 发送登录数据
  // 创建 AJAX 对象
  var r = new XMLHttpRequest()
  // 设置请求方法和请求地址
  r.open(method, path, true)
  // 设置发送的数据的格式
  r.setRequestHeader('Content-Type', 'application/json')
  // 注册响应函数
  r.onreadystatechange = function() {
      if (r.readyState === 4) {
          callback(r)
      }
  }
  r.send(data)
}

var rookieSync = function (hanshu) {
   setTimeout(function () {
     hanshu()
   }, 0)
}

var ckXian = function() {
  var body  = document.querySelector('body')
  var style ='<style id="xm" media="screen"> * {outline: 1px red dashed!important} </style>'
  var i = false
  body.addEventListener('keydown', function(event) {
      if (event.keyCode === 77 && event.ctrlKey) {
          if (i) {
              var styletog = document.querySelector('#xm')
              styletog.remove()
              i = false
          } else {
              body.insertAdjacentHTML('afterbegin', style)
              i = true
          }
      }
   })
} // 加载代码 使用 Ctrl + M 显示参考线

// 生成0-vlaue的随机数
const randomBetween = (max) => {
  return Math.floor(Math.random() * max)
}

// 循环数，
// 包括min， 不包括max
const roopBetween = (currentValue, min, max, op = '+', step = 1) => {
  if (op === '-') {
    const a = currentValue - step
    if (a < min) {
      return max + a - min + 1
    }
    return a
  } else if (op === '+') {
    const a = currentValue + step
    if (a > max) {
      return a % max + min - 1
    }
    return a
  }
}

var ensure = function(condition, message) {
  // 在条件不成立的时候, 输出 message
  if(!condition) {
      log('*** 测试失败:', message)
  }
}

const testroop = () => {
  ensure(roopBetween(4, 4, 10, '-') === 10, 'test1')
  ensure(roopBetween(9, 4, 10, '-', 2) === 7, 'test2')
  ensure(roopBetween(4, 4, 10, '-', 5) === 6, 'test3')
  ensure(roopBetween(10, 4, 10, '+') === 4, 'test4')
  ensure(roopBetween(4, 4, 10, '+', 2) === 6, 'test5')
}

// 把秒转成 00：00
function secondToDate(result) {
  // var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
  var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
  var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
  return result = m + ":" + s;
}

const debounce = (func, wait = 50) => {
  // 缓存一个定时器id
  var timer = 0
  // 这里返回的函数是每次用户实际调用的防抖函数
  // 如果已经设定过定时器了就清空上一次的定时器
  // 开始一个新的定时器，延迟执行用户传入的方法
  return function(...args) {
    // console.log('debug clear', timer);
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}

        //根据视图X坐标获取slider内的相对X坐标
var locXInSlider = function(x) {
    let aa = e('.main-range')
    let bb = e('.view')
    //cc 表示range到窗口最左距离
    let cc = aa.offsetLeft + bb.offsetLeft + 9
    var locAlt = x - cc
    return locAlt
}

const audiotime = function (x) {
  let duration = audio.duration
  let a = x / 263
  let b = Math.floor(duration * a)
  audio.currentTime = b
}

// 100/duration  100/

// var bindSlider = function() {
//     $('.main-range').on('click', function () {
//       //  let width = e('#bofang-inner').style.width
//       //  let bb = width.slice(0, width.length - 2)
//       //  let time = audiotime(parseInt(bb))
//       //  audio.currentTime = time
//       log('点击关栋天')
//     })
// }

//给滑块绑定拖动事件
var bindDot = function() {
    $('.dot').on('mousedown', function(){
        $('body').on('mousemove', function(event){
            var clientX = event.clientX
            // log(clientX)
            var locX = locXInSlider(clientX)
            if (locX <= 263 && locX >= 0) {
                audiotime(locX)
                $('.mark').css('width', locX)
                let a = locX - 9
                $('.dot').css('left', a)
            }

            bindUp()
        })
    })
}
//绑定松开鼠标取消拖动事件
var bindUp = function() {
    $('body').on('mouseup', function(event){
        $('body').off('mousemove')
        // let left = e('.dot').style.left
        // log(left)
    })
}
//主函数

bindDot()
// bindSlider()

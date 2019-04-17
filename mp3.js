
//阻止页面滑动
// document.ontouchmove = function(event){
//     if (!event.elementIsEnabled) {
//        event.preventDefault()
//     }
// }

// 268px; 滑块dot 最大left是 268px  mark也是width 268
// forever start test.js
// forever stop test.js
// forever restart test.js
const bindevent = function () {
   var play = e('#console-play')
  //  log('text', play)  绑定播放/暂停功能
   play.onclick=function(event) {
      tplayer.sorp()
   }
   //
   // 绑定下一首功能
   var next = e('#console-next')
   next.onclick=function(event) {
      tplayer.next()
      // log('xxxx')
   }
   //绑定上一首
   var last = e('#console-last')
   last.onclick=function(event) {
      tplayer.last()
   }
   //绑定爱心
   var aixin = e('#id-function-aixin')
   aixin.onclick=function(event) {
      tplayer.aixin()
   }
   // 绑定播放模式
   var model = e('#id-function-model')
   model.onclick=function(event) {
      tplayer.moshi()
      // log('点到模式')
   }
   //绑定音乐播放完后出发事件
   audio.addEventListener('ended', function(){
       tplayer.next()
   })
   //修改span事件
   audio.addEventListener('canplay', function(){
      // audio 载入音乐需要时间, 载入完成后会触发 'canplay' 事件
      // 所以我们在 canplay 里面设置时间
      var durationSpan = e('.audio-durationtime')
      var totalTime = Math.floor(audio.duration)
      var time =  tplayer.spantime(totalTime)
      durationSpan.innerHTML = time
      //初始化进度条
      // log('切割',tplayer.alreadysong)
      // if (tplayer.alreadysong.length == 1) {
      //    log('xxxx')
      //    audio.currentTime = tplayer.initcurrentTime
      // }
  })
  // audio 在播放音乐的时候会触发 'timeupdate' 事件
  // 也用 setInterval 来定时刷新当前时间
  audio.addEventListener('timeupdate', function(){
      // 所以我们在 canplay 里面设置时间
      var timeSpan = e('.audio-currenttime')
      var totalTime = Math.floor(audio.currentTime)
      tplayer.rangechange(totalTime)
      var time =  tplayer.spantime(totalTime)
      timeSpan.innerHTML = time
  })
  //显示列表
  var list = e('#id-function-mulu')
  list.onclick=function(event) {
     tplayer.showlist()
    // var top = e('.mp3-list').offsetTop
    //  log('点到课表')
    // 歌曲载入列表
    tplayer.loadsong()
  }
  //隐藏列表
  var hidelist = e('.list-footer')
  hidelist.onclick=function(event) {
     tplayer.hidelist()
    // var top = e('.mp3-list').offsetTop
    //  log('点到课表')
  }
  //点击列表歌曲播放
  var listname = e('.list-main')
  listname.onclick=function(event) {
    //  log('点到songs', event.target)
     let target = event.target
     if (target.classList.contains('list-name')) {
        // log('点到课表')
        let index = target.dataset.index
        let song = tplayer.song[index]
        tplayer.modify(song)
     }
    //  log(target)
  }
  //关闭页面保存数据

}



var tplayer = new HPF()

const __main = function () {
  //  log('xxxx', tplayer.songtotal)
  window.audio = document.querySelector('#id-audio-player')
  tplayer.init()
  bindevent()
  audio.volume = 0.3
  bindcloseweb()
  // bindDot()
}

__main()

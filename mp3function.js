

var HPF = function () {
   this.song = [
      {
        name : 'Rolling In The Deep',
        author : 'Adele',
        path : 'music/Rolling In The Deep - Adele.mp3',
      },{
        name : 'Someone Like You',
        author : 'Adele',
        path : 'music/Someone Like You - Adele.mp3',
      },{
        name : '因为爱情',
        author : '陈奕迅',
        path : 'music/因为爱情 - 陈奕迅.mp3',
      },{
        name : '丑八怪',
        author : '薛之谦',
        path : 'music/丑八怪 - 薛之谦.mp3',
      },{
        name : '你的背包',
        author : '陈奕迅',
        path : 'music/你的背包 - 陈奕迅.mp3',
      },{
        name : '作曲家',
        author : '李荣浩',
        path : 'music/作曲家 - 李荣浩.mp3',
      },
   ]
   this.songtotal = this.song.length
  //  this.autio = document.querySelector('#id-audio-player')
  // 这种方式好像可以  我audio写错成autio..
   this.model = '列表'
   this.nowplay = 0
   this.alreadysong = []
   this.hongxin = []
   this.initcurrentTime = 0


   HPF.prototype.getrandomval = function() {
       // 获得一个随机数
       let len = this.songtotal
       let a = Math.floor(Math.random()*len)
       return a
   }
   HPF.prototype.init = function() {
       //初始化数据
       if (localStorage.haha == undefined) {
         song = this.song[this.nowplay]
        //  修改播放歌曲背景图片 修改歌名 修改歌手 修改时间
         this.modify(song)
         this.alreadysong.push(this.nowplay)
       } else {
         let data = JSON.parse(localStorage.rookie)
         this.nowplay = data.nowplay
         this.model = data.model
         this.hongxin = data.xin
         this.initcurrentTime = data.currentTime
         song = this.song[this.nowplay]
        //  修改播放歌曲背景图片 修改歌名 修改歌手 修改时间
         this.modify(song)
         this.alreadysong.push(this.nowplay)
       }
   }
   HPF.prototype.sorp = function() {
       //点击功能件播放或暂停
       var play = e('#console-play')
       if (play.alt == '播放') {
          audio.play()
          play.alt = '暂停'
          play.src = 'image/暂停.png'
       } else if (play.alt == '暂停') {
          audio.pause()
          play.alt = '播放'
          play.src = 'image/播放.png'
       }
   }
   HPF.prototype.next = function() {
       //做一个给我在那个song【】
       let index = this.nextSindex()
       this.alreadysong.push(index)
       let song = this.song[index]
      //  修改歌曲背景图片 修改歌名 修改歌手 修改时间
       this.modify(song)
   }
   HPF.prototype.last = function() {
       //做一个给我在那个song【】
       if (this.alreadysong.length <= 1) {
          return
       }
       let index = this.alreadysong.pop()
       let index2 = this.alreadysong.pop()
       this.alreadysong.push(index2)
       this.nowplay = index2
       let song = this.song[index2]
      //  修改歌曲背景图片 修改歌名 修改歌手 修改时间
       this.modify(song)
   }
   HPF.prototype.nextSindex = function() {
       var model = this.model
       if (model == '列表') {
          this.nowplay += 1
          var aa = (this.nowplay) % this.songtotal
          return aa
       } else if (model == '随机') {
          //获得一个随机数
          var randomval = this.getrandomval()
          this.nowplay = randomval
          return randomval
       } else if (model == '单曲') {
        //  this.nowplay += 1
        //  var aa = (this.nowplay) % this.songtotal
         return this.nowplay
       }
   }
   HPF.prototype.modify = function(song) {
      //  修改歌曲背景图片 修改歌名 修改歌手 修改时间
       audio.src = song.path
       audio.canplay = audio.play()
       var play = e('#console-play')
       play.alt = '暂停'
       play.src = 'image/暂停.png'
       //  修改歌手
       let gequ = e('#header span')
       let geshou = e('.header-autor')
       geshou.innerHTML = song.author
       gequ.innerHTML = song.name
       // 判断是不是要加红心
       var aixin = e('#id-function-aixin')
       if (this.hongxin.includes(this.nowplay)) {
          aixin.src='image/红心.png'
          aixin.alt = '红心'
       } else {
         aixin.src='image/爱心.png'
         aixin.alt = '爱心'
       }
       //修改模式
       var model = e('#id-function-model')
       if (this.model != model.alt) {
          model.src=`image/${this.model}.png`
          model.alt = `${this.model}`
       }
       //修改span

   }
   HPF.prototype.aixin = function() {
       //加爱心
       var aixin = e('#id-function-aixin')
       let a = aixin.alt
       if (a == '爱心') {
          aixin.src='image/红心.png'
          aixin.alt = '红心'
          this.hongxin.push(this.nowplay)
          // log('xxxx', this.hongxin)
       } else if (a == '红心') {
          aixin.src='image/爱心.png'
          aixin.alt = '爱心'
          this.removevalue(this.hongxin, this.nowplay)
          // log('xxxx', this.hongxin)
       }
   }
   HPF.prototype.quchong = function(arr, value) {
       //添加value到arr arr不重复
      var length = arr.length
      var a = 0
      for (var i = 0; i < length; i++) {
        if (arr[i] != value) {
          a += 1
          if (a == length) {
            arr.push(value)
            return arr
          } else {
            continue
          }
        } else {
          return arr
        }
      }
   }
   HPF.prototype.removevalue = function(arr, value) {
      //  删除数组某value
      for(var i = 0; i < arr.length; i++) {
        if(arr[i] == value) {
         arr.splice(i, 1);
         break;
       }
     }
   }
   HPF.prototype.moshi = function() {
    //  log('text')
     let a = ['列表', '随机', '单曲']
     for (var i = 0; i < a.length; i++) {
       if (a[i] == this.model) {
         let index = (i + 1) % 3
         this.model = a[index]
         //修改图片
         var model = e('#id-function-model')
         model.src = `image/${this.model}.png`
         model.alt = this.model
        //  log('text moshi', this.model)
         break
      }
     }
   }
   HPF.prototype.spantime = function(time) {
    //  修改时间的格式
      var fen = this.zfill(Math.floor(time / 60), 2)
      var miao = this.zfill(time % 60, 2)
      var t = ` ${fen}:${miao} `
      // log(t)
      return t
   }
   HPF.prototype.zfill = function(n, width) {
    //  给时间加上2位
      var a = String(n)
      var jxgo = ""
      if (a.length >= width) {
        return a
      }else {
        for (var i = 0; i < width - a.length; i++) {
          jxgo += '0'
        }
        return jxgo + a
      }
   }
   HPF.prototype.rangechange = function(time) {
       //修改dot位置
       let duration = audio.duration
       let a = time / duration
       let b = Math.floor(263 * a)
       $('.mark').css('width', b)
       let aa = b - 9
       $('.dot').css('left', aa)
   }
   HPF.prototype.showlist = function() {
       //显示列表
        var top = e('.mp3-list').offsetTop
        var dh = 20
        goDownInterval = setInterval(function(){
            if(top > 203) {
                top = top - dh
                e('.mp3-list').style.top = top + 'px'
            } else {
                e('.mp3-list').style.top = 223 + 'px'
                clearInterval(goDownInterval)
            }
        },10)
   }
   HPF.prototype.hidelist = function() {
       //隐藏列表
       var top = e('.mp3-list').offsetTop
       var dh = 20
       goDownInterval = setInterval(function(){
           if(top < 637) {
               top = top + dh
               e('.mp3-list').style.top = top + 'px'
           } else {
               e('.mp3-list').style.top = 637 + 'px'
               clearInterval(goDownInterval)
           }
       },10)
   }
   HPF.prototype.loadsong = function() {
       //歌曲载入列表
      let mian = e('.list-main')
      mian.innerHTML = ''
      let length = this.songtotal
      for (var i = 0; i < length; i++) {
        var t = this.getHtml(i)
        appendHtml(mian, t)
        // log('text', t)
      }
   }
   HPF.prototype.getHtml = function(index) {
       //歌曲载入列表
       let name = this.song[index].name
       let author = this.song[index].author
       let xin = ''
       if (this.hongxin.includes(index)) {
          xin = '红心'
       } else {
         xin = '灰心'
       }
       var t = `
         <div class="list-gequ">
            <div class="">
               <span class='list-name' data-index='${index}'>${name}</span>
               <div class="list-aut">
                   <span>${author}</span>
               </div>
            </div>
            <div class="list-aixin">
                <img src="image/${xin}.png" alt="心">
                <img src="image/X.png" alt="X">
            </div>
         </div>
       `
       return t
   }
   //Mowei
}

const bindsongList = () => {
  const mulu = document.querySelector('#id-function-mulu')
  const clistClose = document.querySelector('.list-footer')
  const musicList = document.querySelector('#music-list')
  const hideClassName = 'hidelist'
  mulu.addEventListener('click', () => {
    musicList.classList.remove(hideClassName)
  })

  clistClose.addEventListener('click', () => {
    musicList.classList.add(hideClassName)
  })

  // 点歌曲播放
  const songsEl = document.querySelector('.list-songs')
  songsEl.addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('list-name')) {
      const id = Number(target.dataset.id)
      window.player.switchSong(id)
    }
  })
}

const bindFooter = () => {
  // 绑定播放/暂停
  const playBtn = e('#id-function-play')
  bindEvent(playBtn, 'click', () => {
    if (playBtn.alt == '播放') {
      playBtn.alt = '暂停'
      playBtn.src = 'image/暂停.png'
      window.player.play()
    } else if (playBtn.alt == '暂停') {
      playBtn.alt = '播放'
      playBtn.src = 'image/播放.png'
      window.player.pause()
    }
  })
  // 绑定下一首/上一首
  var next = e('#id-function-next')
  next.onclick=function() {
    window.player.next()
  }

  var last = e('#id-function-last')
  last.onclick=function() {
    window.player.last()
  }
  
  // 绑定爱心
  const aixin = e('#id-function-aixin')
  aixin.onclick=function() {
    const isLike = window.player.triggerLike()
    var aixin = e('#id-function-aixin')
    if (isLike) {
      aixin.src='image/红心.png'
      aixin.alt = '红心'
    } else {
      aixin.src='image/爱心.png'
      aixin.alt = '爱心'
    }
  }

  // 点击模式
  const model = e('#id-function-model')
  model.onclick=function() {
    window.player.changeModal()
  }
}

const renderMusicList = (songs) => {
  // 初始化歌单
  const songListEl = e('.list-songs')
  songListEl.innerHTML = ''
  const length = songs.length
  for (var i = 0; i < length; i++) {
    const songObj = songs[i];
    const isList = songObj.isLike ? '红心' : '爱心'
    const t = `
      <div class="list-gequ">
        <div class="">
            <span class='list-name' data-id='${songObj.id}'>${songObj.name}</span>
            <div class="list-aut">
                <span>${songObj.author}</span>
            </div>
        </div>
        <div class="list-aixin">
            <img src="image/${isList}.png" alt="心">
            <img src="image/X.png" alt="X">
        </div>
      </div>
    `
    appendHtml(songListEl, t)
  }
}

const addBgimg = (el) => {
  el.style['background-size'] = 'cover'
  el.style['background-position'] = 'center'
  el.style['background-repeat'] = 'no-repeat'
}

const bindRange = () => {
  const moveCallback = (event) => {
    const clientX = event.changedTouches[0].clientX
    const trackWidth = document.querySelector('.track').offsetWidth;
    // console.log('test', trackWidth);
    // 得到用户拉动了多少px 
    const trackLeft = Number(document.querySelector('.main-range-track').offsetLeft)
    const dotWidth = 9
    const step = clientX - trackLeft - dotWidth
    if (step <= trackWidth && step >= 0) {
      document.querySelector('.mark').style.width = `${step}px`
      document.querySelector('.dot').style.left = `${step - dotWidth}px`
      // 修改时间
      const duration = window.player.getCurrentSong().duration
      const currenttime = Math.floor(duration * (step / trackWidth))
      const ctEl = document.querySelector('.audio-currenttime')
      ctEl.innerHTML = secondToDate(currenttime)
      // 修改当前播放时间
      // 延迟 1s 设置时间
      // 这里出现bug， 无法清楚debounce里的回调
      // debounce(() => {
      //   window.player.setCurrentTime(currenttime)
      // }, 1000)()
      
      // 暂时使用
      window.player.setCurrentTime(currenttime)
    }
  }

  const dotEl = document.querySelector('.dot')

  dotEl.addEventListener('touchstart', () => {
    //绑定mouve事件
    window.addEventListener('touchmove', moveCallback)
  })

  window.addEventListener('touchend', () => {
    // 接触moving绑定
    window.removeEventListener('touchmove', moveCallback)
  })

  // 监听歌曲进度更新进度条和时间
  setInterval(() => {
    const duration = window.player.getCurrentSong().duration
    const currenttime = window.player.getCurrentTime()
    const ctEl = document.querySelector('.audio-currenttime')
    ctEl.innerHTML = secondToDate(currenttime)
    // 修改进度和dot
    const dotWidth = 9
    const trackWidth = document.querySelector('.track').offsetWidth;
    const w = Math.floor(trackWidth * (currenttime / duration))
    document.querySelector('.mark').style.width = `${w}px`
      document.querySelector('.dot').style.left = `${w - dotWidth}px`
  }, 100);
}

const __main = function () {
  const audio = document.querySelector('#id-audio-player')
  // 初始化palyer
  window.player = new RookiePlayer(audio, {
    onInit: renderMusicList,
    onClickLike: renderMusicList,
    onPause: () => {
      // 切换图表
      const playBtn = e('#id-function-play')
      playBtn.alt = '播放'
      playBtn.src = 'image/播放.png'
    },
    onPlay: () => {
      // 切换图表
      const playBtn = e('#id-function-play')
      playBtn.alt = '暂停'
      playBtn.src = 'image/暂停.png'
    },
    onSwith: (currentSong) => {
      // 初始化图表
      const playBtn = e('#id-function-play')
      playBtn.alt = '暂停'
      playBtn.src = 'image/暂停.png'

      //  修改歌手
      const authorEle = e('.header-autor span')
      const songNameEle = e('.header-songName')
      authorEle.innerHTML = currentSong.author
      songNameEle.innerHTML = currentSong.name

      // 判断这首歌是不是点过赞
      const aixin = e('#id-function-aixin')
      if (currentSong.isLike) {
        aixin.src='image/红心.png'
        aixin.alt = '红心'
      } else {
        aixin.src='image/爱心.png'
        aixin.alt = '爱心'
      }

      // 修改背景图片和歌手图片
      const bgEl = document.querySelector('#bg')
      const avatarEl = document.querySelector('.middle-introduced-image')
      const imgUrl = `url(http://144.202.11.219/webplayer/image/${currentSong.avatar})`
      bgEl.style.background = imgUrl
      avatarEl.style.background = imgUrl
      addBgimg(bgEl)
      addBgimg(avatarEl)

      // 修改歌曲时间
      const dtEl = document.querySelector('.audio-durationtime')
      dtEl.innerHTML = secondToDate(currentSong.duration)
    },
    onChangeMOdal: (playModal) => {
      const modal = e('#id-function-model')
      modal.src = `image/${playModal}.png`
    }
  })

  bindsongList()

  bindFooter()

  bindRange()
}

__main()
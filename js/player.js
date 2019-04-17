const songList = [
  {
    id: 1,
    name : 'Rolling In The Deep',
    author : 'Adele',
    path : 'music/Rolling In The Deep - Adele.mp3',
    isLike: false,
    avatar: 'ad.jpg',
    duration: 234,
  },{
    id: 2,
    name : 'Someone Like You',
    author : 'Adele',
    path : 'music/Someone Like You - Adele.mp3',
    isLike: false,
    avatar: 'ad.jpg',
    duration: 287,
  },{
    id: 3,
    name : '因为爱情',
    author : '陈奕迅',
    path : 'music/因为爱情 - 陈奕迅.mp3',
    isLike: false,
    avatar: 'cyx.jpg',
    duration: 217,
  },{
    id: 4,
    name : '丑八怪',
    author : '薛之谦',
    path : 'music/丑八怪 - 薛之谦.mp3',
    isLike: false,
    avatar: 'xzq.jpg',
    duration: 253,
  },{
    id: 5,
    name : '你的背包',
    author : '陈奕迅',
    path : 'music/你的背包 - 陈奕迅.mp3',
    isLike: false,
    avatar: 'cyx.jpg',
    duration: 236,
  },{
    id: 6,
    name : '作曲家',
    author : '李荣浩',
    path : 'music/作曲家 - 李荣浩.mp3',
    isLike: false,
    avatar: 'lrh.jpg',
    duration: 227,
  },
]

class RookiePlayer {
  constructor(audio, options={}) {
    this.audio = audio
    this.audio.volume = 0.3

    this.options = options
    this.init()
  }

  init() {
    const loadData = RookiePlayer.load() || {}

    const {currentSong = songList[0], songs = songList, playModal = 'list'} = loadData

    // 跟用户歌曲数据合并
    this.songs = songs.map((song, index) => Object.assign({}, songList[index], song))
    this.songsNumber = this.songs.length
    // 播放模式 list random single
    this.playModal = playModal
    // 当前播放的音乐
    this.currentSong = currentSong

    //关闭页面保存用户数据
    window.addEventListener("beforeunload", () => {
      RookiePlayer.save(this)
    });

    //获取当前歌曲在songs数组里的index
    this.currentSongIndex = 0;
    this.songs.forEach((song, index) => {
      if(song.name === currentSong.name) {
        this.currentSongIndex = index;
      }
    })

    // 初始化audio
    this.switchSong(this.currentSong.id)

    // 出发初始化
    this.trigger('init', this.songs)
  }

  switchSong(id) {
    const song = this.songs.filter((s) => s.id === id)[0]
    this.audio.src = song.path
    this.audio.canplay = this.audio.play()

    this.trigger('switch', song)
  }

  pause() {
    this.audio.pause()

    this.trigger('pause')
  }

  play() {
    this.audio.play()

    this.trigger('play')
  }

  triggerLike() {
    const isLike = !this.currentSong.isLike
    this.currentSong.isLike = isLike
    this.songs.forEach(song => {
      if (song.id === this.currentSong.id) {
        song.isLike = isLike
      }
    })
    this.trigger('clickLike', this.songs)

    return isLike
  }

  changeModal() {
    const modals = ['list', 'random', 'single']
    const index = modals.findIndex((v) => v === this.playModal)
    const newIndex = roopBetween(index, 0, 2)
    this.playModal = modals[newIndex]

    this.trigger('changeModal', this.playModal)
  }

  next() {
    this.currentSongIndex = this.getIndex('next')
    this.currentSong = this.songs[this.currentSongIndex]
    this.switchSong(this.currentSong.id)
  }

  last() {
    this.currentSongIndex = this.getIndex('last')
    this.currentSong = this.songs[this.currentSongIndex]
    this.switchSong(this.currentSong.id)
  }

  getIndex(dirction = 'next') {
    const modal = this.playModal
    const currentIndex = this.currentSongIndex
    if (modal == 'list') {
      if(dirction == 'next') {
        return roopBetween(currentIndex, 0, this.songsNumber - 1)
      } else {
        return roopBetween(currentIndex, 0, this.songsNumber - 1, '-')
      }
    } else if (modal == 'random') {
      return randomBetween(this.songsNumber)
    } else if (modal == 'single') {
      return currentIndex
    }
  }

  getCurrentSong() {
    return this.currentSong;
  }

  setCurrentTime(currentTime) {
    this.audio.currentTime = currentTime
  }

  getCurrentTime() {
    return this.audio.currentTime
  }
  
  trigger(eventName, ...rest) {
    if (eventName === 'pause') {
      this.options.onPause && this.options.onPause()
    } else if(eventName === 'play') {
      this.options.onPlay && this.options.onPlay()
    } else if(eventName === 'switch') {
      this.options.onSwith && this.options.onSwith(...rest)
    } else if(eventName === 'init') {
      this.options.onInit && this.options.onInit(...rest)
    } else if(eventName === 'clickLike') {
      this.options.onClickLike && this.options.onClickLike(...rest)
    } else if(eventName === 'changeModal') {
      this.options.onChangeMOdal && this.options.onChangeMOdal(...rest)
    } 
  }

  static load() {
    return JSON.parse(localStorage.getItem('rocking'))
  }

  static save(instance) {
    const currentSong = instance.currentSong
    const songs = instance.songs
    const playModal = instance.playModal
    const data = {
      currentSong,
      songs,
      playModal,
    }
    localStorage.setItem('rocking', JSON.stringify(data))
  }
}
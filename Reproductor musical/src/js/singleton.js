const Singleton = (function () {
  let playing = 0;
  let instance = null;
  let songs = [
    {
      title: 'Neón Furioso',
      dataSong: 'Neón Furioso',
      artist: 'Monte',
      album: 'Al borde',
      cover: 'monte.jpg',
      mp3: 'https://danielaaj12.github.io/Songos/Monte%20-%20Neon%20Furioso%20(1).mp3',
      wav: 'https://danielaaj12.github.io/Songos/Monte%20-%20Neon%20Furioso%20(1).mp3.wav',
      ogg: 'https://danielaaj12.github.io/Songos/Monte%20-%20Neon%20Furioso.ogg',
      year: '2011',
      started: false, 
    },
    {
      title: 'Trigger',
      dataSong: 'Trigger',
      artist: 'Magpie Jay',
      album: "Tragaluz",
      cover: 'mag.jpg',
      mp3: 'https://danielaaj12.github.io/Songos/Magpie%20Jay%20-%20Tigger%20(audio).mp3',
      wav: 'Magpie Jay - Trigger (audio).Wav',
      ogg: 'https://danielaaj12.github.io/Songos/Conquista%20Sessions%20-%20Trigger%20-%20Magpie%20Jay.ogg',
      year: '2018',
      started: false,
      
    },
    {
      title: 'Quiero conocer tu mundo',
      dataSong: 'Quiero conocer tu mundo',
      artist: 'Fármacos',
      album: 'Estado de gracia',
      cover: 'farmacos.jpg',
      mp3: 'https://danielaaj12.github.io/Songos/Fa%CC%81rmacos%20-%20Quiero%20conocer%20tu%20mundo%20(audio).mp3',
      wav: 'Fármacos - Quiero conocer tu mundo (audio).Wav',
      ogg: 'https://danielaaj12.github.io/Songos/Fa%CC%81rmacos%20-%20Quiero%20conocer%20tu%20mundo%20(audio).ogg',
      year: '2016',
      started: false,
      
    },
    {
      title: "Slow Love",
      dataSong: "Slow Love",
      artist: 'Tender',
      album: "Fear of Falling Asleep",
      cover: 'tender.jpg',
      mp3: "https://danielaaj12.github.io/Songos/TENDER%20-%20Slow%20Love.mp3",
      wav: "Tender - Slow Love.wav",
      ogg: "https://danielaaj12.github.io/Songos/TENDER%20-%20Slow%20Love.ogg",
      year: '2019',
      started: false,
     
    },
    {
      title: 'Sin apenas conocernos',
      artist: 'Cala Vento',
      album: 'Fruto Panorama',
      cover: 'cala.jpg',
      mp3: 'https://danielaaj12.github.io/Songos/CALA%20VENTO%20-%20SIN%20APENAS%20CONOCERNOS.mp3',
      wav: 'CALA VENTO - SIN APENAS CONOCERNOS.wav',
      ogg: 'https://danielaaj12.github.io/Songos/Cala%20Vento%20Sin%20Apenas%20Conocernos.ogg',
      year: '2015',
      started: false,
      dataSong: 'Sin apenas conocernos',
    },
  ];
  let playList = [];

  return class Singleton {
    constructor() {
      this.AUDIO = null;
      this.playing = false;
      this.cover = null;
      this.contCover = document.querySelector('.js-cover');
      if (!instance) {
        instance = this;
      }
      return instance;
    }

    set audio(data) {
      if (!data) {
        throw new Error(`Invalid set audio is not a HTMLaudioElement: ${data}`);
      }
      this.AUDIO = data;
    }

    /**
     * return array songs
     */
    get songsDATA () {
      return songs;
    }

    /**
     * return array playList
     */
    get playListDATA () {
      return playList;
    }

    get playingDATA() {
      return playing;
    }

    /**
     * push playlist
     *  @param {object} value
     */
    set setPlayList (value) {
      playList.push(value);
    }

      /**
     * push list
     *  @param {object} value
     */
    set setlist (value) {
      songs.push(value);
    }

    /**
     * set playing
     *  @param {number} value
     */
    set setPlaying(value) {
      this.playing = value;
    }

    set songPlaying(value) {
      playing = value;
    }

    setCover(index = playing) {
      if (this.playing === false) {
        document.body.style.backgroundImage = "url('headphones.png')";
        this.contCover.style.backgroundImage = "url('headphones.png')";
      } else {
        document.body.style.backgroundImage = `url(img/${playList[index].cover})`;
        this.contCover.style.backgroundImage = `url(img/${playList[index].cover})`;
      }
    }

    /**
     * Load the song
     *  @param {number} index
     */
    getSong(index) {
      this.setCover();

      if (index) {
        return `${playList[index].mp3}`;
      }
      return `${playList[playing].mp3}`;
    }

    initSong(dataSong) {
      this.AUDIO.setAttribute('src', `${this.getSong(dataSong)}`);
      this.setPlaying = false;
      this.togglePlay();
      // this.changeIco();
      this.setCover(dataSong);
    }

    /**
     * play the audio
     */
    play() {
      this.AUDIO.play();
      this.playing = true;
    }

    /**
     * pause the audio
     */
    pause() {
      this.AUDIO.pause();
      this.playing = false;
    }

    next() {
      if (playing >= songs.length - 1) {
        playing = 0;
      } else {
        playing += 1;
      }
      this.AUDIO.setAttribute('src', `${this.getSong()}`);
      if (this.playing === true) {
        this.playing = true;
        this.play();
      } else {
        this.playing = false;
        this.pause();
      }
      player.songActive();
    }

    back() {
      if (playing === 0) {
        playing = songs.length - 1;
      } else {
        playing -= 1;
      }
      this.AUDIO.setAttribute('src', `${this.getSong()}`);
      if (this.playing === true) {
        this.playing = true;
        this.play();
      } else {
        this.playing = false;
        this.pause();
      }
      player.songActive();
    }

    /**
     * toggle play/pause
     */
    togglePlay() {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    }

    /**
     * change icon of button
     * @param {HTMLButtonElement} button
     */
    changeIco(btnPlaypase) {
      if (this.playing) {
        btnPlaypase.classList.add('btn-play');
        btnPlaypase.classList.remove('btn-pause');
      } else {
        btnPlaypase.classList.remove('btn-play');
        btnPlaypase.classList.add('btn-pause');
      }
    }
  }
}());

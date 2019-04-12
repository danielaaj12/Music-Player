const NewSong = (function () {
  return class NewSong {
    constructor (name, artist, year, album, star, image, mp3, wav, ogg) {
      this.title = name;
      this.artist = artist;
      this.album = album;
      this.cover = image;
      this.mp3 = mp3;
      this.wav = wav;
      this.ogg = ogg;
      this.year = year;
      this.star = star;
      this.dataSong = name;
    }
  }
}());
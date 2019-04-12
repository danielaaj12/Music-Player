const singleton = new Singleton();
const player = new Player('.cont-audio');
const IMPORT = new Import();

(function () {
  const btnSongs = document.querySelector('#songs');
  const btnImport = document.querySelector('#import');
  const contSongs = document.querySelector('.js-songs');
  const contImport = document.querySelector('.js-import');

  // elementos de import
  const btnSave = document.querySelector('#save');
  let validated = 0;

  let name = null;
  let artist = null;
  let year = null;
  let album = null;
  let star = null;
  let image = null;
  let mp3 = null;
  let wav = null;
  let ogg = null;

  function getForm(e) {
    e.preventDefault();
    const dataname = document.querySelector('#name');
    const dataartist = document.querySelector('#artist');
    const datayear = document.querySelector('#year');
    const dataalbum = document.querySelector('#album');
    const datastar = document.querySelector('.switch-input');
    const dataimage = document.querySelector('#image');
    const datamp3 = document.querySelector('#mp3');
    const datawav = document.querySelector('#wav');
    const dataogg = document.querySelector('#ogg');

    name =  validate(dataname);
    artist =  validate(dataartist);
    year =  validate(datayear);
    album =  validate(dataalbum);
    star =  validateStar(datastar);
    image =  validateImage(dataimage);
    mp3 =  validateMp3(datamp3);
    wav =  validateWav(datawav);
    ogg =  validateOgg(dataogg);

    if(validate >= 9) {
      const newSong = new NewSong(name, artist, year, album, star, image, mp3, wav, ogg);
      addSong(newSong);
    }
  }

  function validate(element) {
    if(element.value) { 
      validated += 1;
      return element.value;
    } else {
      validated -= 1;
      alert(`insert a correct ${element}`);
    }
  }

  function validateStar(element) {
    validated += 1;
    return element.checked;
  }

  function validateImage(element) {
    if(element) {
      const re = /\.(?:jpg|png)$/;

      if (re.test(element.value)) {
        validated += 1;
        return element.value;
      } else {
        validated -= 1;
        alert(`insert a correct ${element}`);
      }
    }
  }

  function validateMp3(element) {
    if(element) {
      const re = /\.(?:mp3)$/;

      if (re.test(element.value)) {
        validated += 1;
        return element.value;
      } else {
        validated -= 1;
        alert(`insert a correct ${element}`);
      }
    }
  }

  function validateWav(element) {
    if(element) {
      const re = /\.(?:wav)$/;

      if (re.test(element.value)) {
        validated += 1;
        return element.value;
      } else {
        validated -= 1;
        alert(`insert a correct ${element}`);
      }
    }
  }

  function validateOgg(element) {
    if(element) {
      const re = /\.(?:ogg)$/;

      if (re.test(element.value)) {
        validated += 1;
        return element.value;
      } else {
        validated -= 1;
        alert(`insert a correct ${element}`);
      }
    }
  }

  function addSong(newSong) {
    singleton.setlist = newSong;
    player.composeList();
    console.log(newSong);
  }
  btnImport.addEventListener('click', () => {
    contSongs.classList.remove('show');
    contSongs.classList.add('hidde');
    contImport.classList.remove('hidde');
    contImport.classList.add('show');
  });
  
  btnSongs.addEventListener('click', () => {
    contSongs.classList.remove('hidde');
    contSongs.classList.add('show');
    contImport.classList.remove('show');
    contImport.classList.add('hidde');
  });

  btnSave.addEventListener('click', getForm);
}());

const Player = (function () {
  const contSongs = document.querySelector('.js-songs'); 
  const wrapper = document.querySelector('#container');
  return class Player {
    constructor(contAudio) {
      this.contAudio = document.querySelector(contAudio);
      this.contNav = document.querySelector('#cont-nav');
      this.contAllSongs = document.querySelector('#allSongs');
      this.contPlayList = document.querySelector('#playList');
      this.contCover = document.querySelector('.js-cover');
      this.songSelected = null;
      this.arraySelected = null;
      this.ulPlayList = null;
      this.ulList = null;
      this.dragged = null;
      this.btnPlaypase = null;
      this.AUDIO = null;
      this.compose();
      this.dragAndDrop();
    }

    compose() {
      this.AUDIO = this.audio();
      const playAction = this.btn('class', 'btn-play');
      const btnBack = this.btn('class', 'btn-back');
      const btnNext = this.btn('class', 'btn-next');
      const allSongs = this.allSongs();
      const playList = this.playList();
      const navSongs = this.nav();

      playAction.addEventListener('click', () => {
        singleton.changeIco(playAction);
        singleton.togglePlay();
      });
      this.playAction = playAction;
      btnBack.addEventListener('click', () => {
        singleton.back();
      });
      btnNext.addEventListener('click', () => {
        singleton.next();
      });

      contSongs.insertBefore(navSongs, this.contAllSongs);
      this.contAudio.appendChild(this.AUDIO);
      this.contNav.appendChild(btnBack);
      this.contNav.appendChild(playAction);
      this.contNav.appendChild(btnNext);
      this.contAllSongs.appendChild(allSongs);
      this.contPlayList.appendChild(playList);

      singleton.audio = this.AUDIO;

      this.disableButton(playAction);
      this.disableButton(btnBack);
      this.disableButton(btnNext);
    }

    nav() {
      const container = document.createElement('div');
      container.setAttribute('class', 'songs-header');

      const sortBy = document.createElement('select');
      sortBy.setAttribute('id', 'formSort');
      const optionDefault = this.option();
      optionDefault.setAttribute('selected','selected');
      optionDefault.innerHTML = 'Sor By'
      const option1 = this.option('artist');
      const option2 = this.option('songName');
      const option3 = this.option('year');
      const option4 = this.option('started');
      const option5 = this.option('album');

      const btnDelete = this.btn('class','js-delete');
      const btnEdit = this.btn('class', 'js-edit');
      this.disableButton(btnDelete);
      this.disableButton(btnEdit);
      btnDelete.setAttribute('class', 'delete');
      btnEdit.setAttribute('class', 'edit');
      btnDelete.innerHTML = 'Eliminar';
      btnEdit.innerHTML = 'Editar';

      btnDelete.addEventListener('click', () => {
        this.newModal();
      });

      const search = this.createSearch();

      sortBy.appendChild(optionDefault);
      sortBy.appendChild(option1);
      sortBy.appendChild(option2);
      sortBy.appendChild(option3);
      sortBy.appendChild(option4);
      sortBy.appendChild(option5);

      container.appendChild(sortBy);
      container.appendChild(btnDelete);
      container.appendChild(btnEdit);

      container.appendChild(search);

      return container;
    }

    newModal() {
      const cont = document.createElement('div');
      const message = document.createElement('p');
      const btnDelete = this.btn('class', 'pop-up__delite');
      const btnCancel = this.btn('class', 'pop-up__Cancel');

      message.innerHTML = '¿Estás seguro/a que quieres eliminar la canción?';
      btnDelete.innerHTML = 'Eliminar';
      btnCancel.innerHTML = 'Cancelar';

      btnCancel.addEventListener('click', () => {
        wrapper.removeChild(cont);
      });
      btnDelete.addEventListener('click', () => {
        this.deliteSong();
        wrapper.removeChild(cont);
      });

      message.setAttribute('class', 'pop-up__messaje');
      cont.setAttribute('class', 'pop-up');

      cont.appendChild(message);
      cont.appendChild(btnCancel);
      cont.appendChild(btnDelete);
      wrapper.append(cont);
    }

    deliteSong() {
      if (this.arraySelected === 'songs') {
        singleton.songsDATA.splice(this.songSelected, 1);
        this.composeList();
        console.log(this.arraySelected);
      } 
      if (this.arraySelected === 'playList') {
        singleton.playListDATA.splice(this.songSelected, 1);
        this.composePlayList();
        console.log(this.arraySelected);
      }
    }

    option(value = ' ') {
      const option = document.createElement('option')
      option.setAttribute('value', `${value}`);
      if (value) {
        option.innerHTML = value;
      }
      return option;
    }

    createSearch() {
      const form = document.createElement('form');
      form.setAttribute('class', 'cont-search');

      const input = document.createElement('input');
      input.setAttribute('type', 'search');
      input.setAttribute('placeholder', 'Search');

      form.appendChild(input);

      return form;
    }

    allSongs() {
      const container = document.createElement('ul');
      container.setAttribute('class', 'allsongs');
      container.setAttribute('id', 'div1');

      this.ulList = container;
      this.composeList(container);

      return container;
    }

    playList() {
      const container = document.createElement('ul');
      container.setAttribute('class', 'playList');
      container.setAttribute('id', 'div2');

      this.ulPlayList = container;
      this.composePlayList(container);

      return container;
    }

    composeList(container = this.ulList) {
      const songs = singleton.songsDATA;
      this.clear(container);

      songs.forEach((song, index) => {
        const row = document.createElement('li');
        const star = this.star(songs, index);
        row.setAttribute('id', `${index}`);
        row.setAttribute('dataSong', `${songs[index].dataSong}`);
        row.setAttribute('class', 'song clearfix');
        row.setAttribute('draggable', 'true');
        row.setAttribute('ondragstart', 'event.dataTransfer.setData("text/plain",null)');

        row.innerHTML = `${song.title}`;

        row.addEventListener('click', (e)=> {
          document.querySelectorAll('.song').forEach((element)=> {
            element.classList.remove('songActive');
          });
          row.classList.add('songActive');
          const btnEdit = document.querySelector('.edit');
          const btnDelete = document.querySelector('.delete');
 
          this.enableButton(btnDelete);
          this.enableButton(btnEdit);
          
          songs.forEach((element, i) => {
            if (element.dataSong === e.target.getAttribute('dataSong')) {
              this.songSelected = i;
              this.arraySelected = 'songs';
            }
          });
        });

        row.appendChild(star);
        container.appendChild(row);
      });
    }

    clear(container) {
      container.innerHTML = '';
    }

    composePlayList(container = this.ulPlayList) {
      const songs = singleton.playListDATA;
      this.clear(container);
      songs.forEach((song, index) => {
        const row = document.createElement('li');
        const star = this.star(songs, index);
        star.setAttribute('class', 'star starDefault');
        row.setAttribute('id', `${index}`);
        row.setAttribute('dataSong', `${songs[index].dataSong}`);
        row.setAttribute('class', 'song clearfix');
        row.setAttribute('draggable', 'true');

        row.addEventListener('click', () => {
          singleton.initSong(index);
        });

        row.addEventListener('click', (e)=> {
          document.querySelectorAll('.song').forEach((element)=> {
            element.classList.remove('songActive');
          });
          row.classList.add('songActive');
          const btnEdit = document.querySelector('.edit');
          const btnDelete = document.querySelector('.delete');
 
          this.enableButton(btnDelete);
          this.enableButton(btnEdit);
          
          songs.forEach((element, i) => {
            if (element.dataSong === e.target.getAttribute('dataSong')) {
              this.songSelected = i;
              this.arraySelected = 'playList';
              console.log(this.arraySelected);
            }
          });
        });

        row.innerHTML = `${song.title}`;

        row.appendChild(star);
        container.appendChild(row);
      });
    }
    //array de funcionalidad de la estrella

    star(array = singleton.songsDATA, index) {
      
      const star = document.createElement('button');
      star.addEventListener('click', ()=> {
        if(array[index].started) {
          array[index].started = false;
          star.setAttribute('class', 'star starDefault');
        } else {
          array[index].started = true;
          star.setAttribute('class', 'star starActive');
        }
      });
      if (array[index].started) {
        star.setAttribute('class', 'star starActive');
      } else {
        star.setAttribute('class', 'star starDefault');
      }
      return star;
    }

    songActive() {
      const playing = singleton.playingDATA;
      const playlistDom = document.querySelector('.playList').childNodes;
      console.log(playlistDom);
      playlistDom.forEach((element)=> {
        element.classList.remove('songActive');
      });

      playlistDom[playing].classList.add('songActive');
    }

    audio() {
      const audio = new Audio();
      audio.setAttribute('controls', '');
      audio.setAttribute('class', 'clearfix');

      audio.addEventListener('ended', () => {
        singleton.next();
      });

      singleton.setCover();
      return audio;
    }

    btn(type = 'class', value) {
      const btn = document.createElement('button');
      if (!type && value) {
        throw new Error(`
        El valor de clase no válido no es HTMLbtnElement: ${type} / ${value}`);
      } else {
        btn.setAttribute(`${type}`, `btn ${value}`);
      }
      return btn;
    }

    createInfo(playList, song) {
      const beforeInfo = document.querySelector('.contSongInfo');
      if(beforeInfo) {
        this.contCover.removeChild(beforeInfo);
      }
      console.log(song);
      const container = document.createElement('div');
      container.setAttribute('class', 'contSongInfo');

      const title = player.createTitle(song);
      const album = player.createAlbum(song);
      const artist = player.createArtist(song);
      const star = player.star(playList, song);

      container.appendChild(title);
      container.appendChild(album);
      container.appendChild(artist);
      container.appendChild(star);

      this.contCover.appendChild(container);
    }

    createTitle(song) {
      const playing = singleton.playListDATA;
      const title = document.createElement('p');
      title.setAttribute('class', 'playingTitle');
      title.innerHTML = `${playing[song].title}`;
      return title;
    }

    createAlbum(song) {
      const playing = singleton.playListDATA;
      const title = document.createElement('p');
      title.setAttribute('class', 'playingAlbum');
      title.innerHTML = `${playing[song].album}`;
      return title;
    }

    createArtist(song) {
      const playing = singleton.playListDATA;
      const title = document.createElement('p');
      title.setAttribute('class', 'playingArtist');
      title.innerHTML = `${playing[song].artist}`;
      return title;
    }
    /**
     * Disable a button
     * @param {HTMLButtonElement} button
     */
    disableButton (button) {
      button.setAttribute('disabled', '');
    }

    /**
     * Disable a button
     * @param {HTMLButtonElement} button
     */
    enableButton(button) {
      button.removeAttribute('disabled');
    }

    dragAndDrop() {
      document.addEventListener('dragstart', function drag (event) {
        this.dragged = event.target;
      });

      document.addEventListener('dragover', function dragover(event) {
        event.preventDefault();
      });

      document.addEventListener('drop', function drop(event) {
        const id = this.dragged.getAttribute('id');
        const dataSong = this.dragged.getAttribute('dataSong');
        const songs = singleton.songsDATA;
        const playList = singleton.playListDATA;
        const btnPlaypase = document.querySelector('.btn-play');
        const btnBack = document.querySelector('.btn-back');
        const btnNext = document.querySelector('.btn-next');
        const btnEdit = document.querySelector('.edit');
        const btnDelete = document.querySelector('.delete');

        if (event.target.className === 'playList') {
          player.arraySelected = 'playList';

          singleton.setPlayList = songs[id];
          player.composePlayList();
          songs.splice(id, 1);
          player.composeList();
          playList.forEach((element, index) => {
            if (element.dataSong === dataSong) {
              singleton.initSong(index);
              singleton.songPlaying = index;
              player.createInfo(playList, index);
            }
          });
          player.enableButton(btnPlaypase);
          player.enableButton(btnBack);
          player.enableButton(btnNext);
          player.enableButton(btnDelete);
          player.enableButton(btnEdit);
          player.songActive();
        }

        if (event.target.className === 'allsongs') {
          player.arraySelected = 'songs';
          singleton.setlist = playList[id];

          playList.splice(id, 1);
          player.composePlayList();
          player.composeList();
        }
      });
    }
  };
}());

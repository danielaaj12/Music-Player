const Import = (function () {
  return class Import {
    constructor () {
      this.container = document.querySelector('.js-import');
      this.state = false;
      this.FORM = null;

      this.render();
    }

    render() {
      const form = this.form();
      const columnLeft = this.columnLeft();
      const columnRight = this.columnRight();
      const formNav = this.formNav();
      
      form.appendChild(columnLeft);
      form.appendChild(columnRight);
      form.appendChild(formNav);
      this.FORM = form;
      this.container.appendChild(form);
    }

    form() {
      const form = document.createElement('form');
      form.setAttribute('class', 'form-import');
      this.FORM = form;
      return form;
    }

    columnLeft() {
      const container = this.div({type: 'class', value: 'column column-left'});

      container.appendChild(this.label('name',{type: 'for', value: 'name'}));
      container.appendChild(this.input('text', 'name', ' ', 'true'));

      container.appendChild(this.label('artist',{type: 'for', value: 'Artist'}));
      container.appendChild(this.input('text', 'artist', ' ', 'true'));

      container.appendChild(this.label('year',{type: 'for', value: 'year'}));
      container.appendChild(this.input('number', 'year', ' ', 'true'));

      container.appendChild(this.label('album',{type: 'for', value: 'album'}));
      container.appendChild(this.input('text', 'album', ' ', 'true'));

      container.appendChild(this.switch());

      return container;
    }

    columnRight() {
      const container = this.div({type: 'class', value: 'column column-right'});

      container.appendChild(this.label('Image',{type: 'for', value: 'image'}));
      container.appendChild(this.input('text', 'image', ' ', 'false'));

      container.appendChild(this.h3('Sources'));

      container.appendChild(this.label('mp3',{type: 'for', value: 'mp3'}));
      container.appendChild(this.input('text', 'mp3', ' ', 'false'));

      container.appendChild(this.label('waw',{type: 'for', value: 'waw'}));
      container.appendChild(this.input('text', 'waw', ' ', 'false'));

      container.appendChild(this.label('ogg',{type: 'for', value: 'ogg'}));
      container.appendChild(this.input('text', 'ogg', ' ', 'false'));

      return container;
    }

    formNav() {
      const container = this.div({type: 'class', value: 'cont__form-nav'});
      const nav = this.div({type: 'class', value: 'form__nav'});

      const btnSave = this.btnInput('save','save','form-btn', 'submit');
      const btnReset = this.btnInput('reset','reset','form-btn', 'reset');
      
      btnSave.addEventListener('click', this.getForm);

      container.appendChild(btnReset);
      container.appendChild(btnSave);
      container.appendChild(nav);
      return container;
    }

    btnInput(text, id, className, type) {
      const input = document.createElement('input');
      input.setAttribute('value', `${text}`);
      input.setAttribute('id', `${id}`);
      input.setAttribute('class', `${className}`);
      input.setAttribute('type', `${type}`);
      return input;
    }

    label(text,attribute) {
      const label = document.createElement('label');
      label.innerHTML = text;

      if(attribute) {
        label.setAttribute(`${attribute.type}`, `${attribute.value}`);
      }
      return label;
    }

    input(type,name,value,required) {
      const input = document.createElement('input');
      input.setAttribute('type', `${type}`);
      input.setAttribute('name', `${name}`);
      input.setAttribute('id', `${name}`);
      input.setAttribute('value', `${value}`);

      if(required) {
        input.setAttribute('required', '');
      }

      return input;
    }

    div(attribute) {
      const div = document.createElement('div');
      if (attribute) {
        div.setAttribute(`${attribute.type}`, `${attribute.value}`);
      }
      return div;
    }

    h3(text) {
      const h3 = document.createElement('h3');
      h3.innerHTML = text;
      return h3;
    }

    switch() {
      const container = this.label('',{type: 'class', value: 'switch'});

      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('class', 'switch-input');

      const span1 = document.createElement('span');
      span1.setAttribute('class', 'switch-label');
      span1.setAttribute('data-on', 'On');
      span1.setAttribute('data-off', 'Off');

      const span2 = document.createElement('span');
      span2.setAttribute('class', 'switch-handle');

      container.appendChild(checkbox);
      container.appendChild(span1);
      container.appendChild(span2);

      return container;
    }
  }
}());
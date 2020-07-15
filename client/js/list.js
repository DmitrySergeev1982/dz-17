import {Content} from './content'

export class List {
  constructor(container, data) {
    this.container = container;
    this.data = data;   
    this.activeListItem = null;
    this.handleClickList = this._clickList.bind(this)
    this._init();
  }

  _init() {
    this._render()
    this.container.addEventListener('click', this.handleClickList)
  }

  _removeActive() {
    if (!this.activeListItem) return;

    this.activeListItem.classList.remove('active');
  }



  _clickList() {
    const tag = event.target
    
    if (tag.classList.value.includes("list-item")) {
      const id = tag.getAttribute('data-id')  
         
      tag.classList.add('active')

      this._removeActive();  
      
      this.activeListItem = tag;
      
      fetch( '/api/data', { method: 'GET' })
        .then(function(response) {
          return response.json()
        })
        .then(function(dataObj) {
          dataObj.list.forEach(function(item) {
            if(item.id == id) {
              new Content(document.querySelector('#content'), item)
            } 
          })      
        })
        .catch((error) => console.error(error)) 
    }   
  }

  
  _render(data) {
    this._clear()
    this.data.forEach((item) => {
      const template = `
        <div class="list-item p-3" data-id="${item.id}">
          <h5>${item.title}</h5>
          <small>${item.date}</small> 
        </div>        
      `;
      
      this.container.innerHTML = this.container.innerHTML + template;
    })
  }

  _clear() {
    this.container.innerHTML = "";
  }

}
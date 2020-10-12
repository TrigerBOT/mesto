export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
   
      addItem(element) {       
          this._container.append(element);     
      }
    
  
    renderItems(isArray) {
      if(isArray){
      this._renderedItems.forEach((item) => {
        this._renderer(item);
      })}
    else{
      this._renderer(this._renderedItems);
    }
    }      
      
  }


 
'use strict';

const bookmarkList = (function(){

  function generateError(err) {
    /*let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }*/

    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${err}</p>
      </section>
    `;
  }


  function generateItemElement(item) {
  if(item.rating >= store.sortValue){ 
    if(item.expand){return `
    <li class="js-item-element" data-item-id="${item.id}">
    <h1>${item.title}</h1>
    <div class="bookmark-item-controls">
    <button class="bookmark-item-delete js-item-delete">
      <span class="button-label">delete</span>
    </button>
  </div>
  <span><font size = "+1">Rating:</font> ${item.rating}</span>

      <span class = "item-description">
     <font size = "+1"> Description:</font> ${item.desc} 
      <a class = "item-description" href=${item.url}>Visit Site</a>
      </span>
    </li>`;}
    
    return `
      <li class="js-item-element" data-item-id="${item.id}">
      <h1>${item.title}</h1>
      <div class="bookmark-item-controls">
      <button class="bookmark-item-delete js-item-delete">
        <span class="button-label">delete</span>
      </button>
    </div>
      <span><font size = "+1">Rating:</font> ${item.rating}</span>

      </li>`;
  }
  }
  
  
  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  
  function render() {

    console.log(store);

    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }

    let items = store.items;  
    const bookmarkListItemsString = generateBookmarkItemsString(items);
    $('.js-bookmark-list').html(bookmarkListItemsString);
  }
  
  
  function handleNewItemSubmit() {
    $('#js-bookmark-list-form').submit(function (event) {
      event.preventDefault();
      const newItemName = $('.js-bookmark-list-name').val();
      const newItemUrl = $('.js-bookmark-list-url').val();
      const newItemDesc = $('.js-bookmark-list-desc').val();
      const newItemRating = $('.js-bookmark-list-rating').val();


     
      api.createItem(newItemName,newItemUrl, newItemDesc, newItemRating, 
        
        
        (err) => {
          console.log(err.responseJSON.message);
          store.setError(err.responseJSON.message);
          render();
      },
        
        
        (newItemName) => {
        store.addItem(newItemName);
        render();
      });
      $('.js-bookmark-list-name').val('');
      $('.js-bookmark-list-url').val('');
      $('.js-bookmark-list-desc').val('');


    });
  }
  
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  
  function handleItemExpandClicked() {
    $('.js-bookmark-list').on('click', '.js-item-element', event => {
      const id = getItemIdFromElement(event.currentTarget);
      const item = store.findById(id);
      const objExpand = {expand: !item.expand};
        store.findAndUpdate(id, objExpand);
        render();
      
    });
  
}
  
  function handleDeleteItemClicked() {
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id, () => {
        store.findAndDelete(id);
        render();
      });

    });
  }

  function handleSortClicked(){
    var mySelect = document.getElementById('js-bookmark-sort');

    mySelect.onchange = function() {
       var x = document.getElementById("js-bookmark-sort").value;
       console.log(x);
       store.sortValue=x;
      render();
      }

    }

  

  /*
  f8unction handleToggleFilterClick() {
    $('.js-filter-expand').click(() => {
      store.toggleExpandFilter();
      render();
    });
  }*/
  

  
  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemExpandClicked();
    handleDeleteItemClicked();
    handleSortClicked();
  }

  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());

'use strict';

const bookmarkList = (function(){

  function generateItemElement(item) {
    return `
      <li class="js-item-element" data-item-id="${item.id}">
      <h1>${item.title}</h1>
      <span>${item.url}</span
          <div class="bookmark-item-controls">
          <button class="bookmark-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
  }
  
  
  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  
  function render() {
    let items = store.items;  
    console.log('`render` ran');
    const bookmarkListItemsString = generateBookmarkItemsString(items);
    $('.js-bookmark-list').html(bookmarkListItemsString);
  }
  
  
  function handleNewItemSubmit() {
    $('#js-bookmark-list-form').submit(function (event) {
      event.preventDefault();
      const newItemName = $('.js-bookmark-list-name').val();
      const newItemUrl = $('.js-bookmark-list-url').val();
      const newItemDesc = $('.js-bookmark-list-desc').val();

     
      api.createItem(newItemName,newItemUrl, newItemDesc, (newItemName) => {
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
      api.updateItem(id, objExpand, () => {
        store.findAndUpdate(id, objExpand);
        render();
      }
      );
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
  

  /*
  f8unction handleToggleFilterClick() {
    $('.js-filter-expand').click(() => {
      store.toggleExpandFilter();
      render();
    });
  }*/
  

  
  function bindEventListeners() {
    handleNewItemSubmit();
    //handleItemExpandClicked();
    handleDeleteItemClicked();
  }

  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());

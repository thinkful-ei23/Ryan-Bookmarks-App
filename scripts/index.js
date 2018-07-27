/* global shoppingList, store $ Item api*/
'use strict';
$(document).ready(function() {
  shoppingList.bindEventListeners();
  api.getItems((items) => {
    items.forEach((item) => store.addItem(item));
    shoppingList.render();
  });
});



/*$.getJSON('https://thinkful-list-api.herokuapp.com/ei-student/items', (response) => {
  //console.log('api response:', response);
});*/

/*api.getItems((items) => {
  items.forEach((item) => store.addItem(item));
  const item = store.items[0];
  console.log(item);
  console.log('current name: ' + item.name);
  store.findAndUpdate(item.id, { name: 'bar' });
  console.log('new name: ' + item.name);
});*/




'use strict';
/* global $ */

const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/ryan-bookmark';

  const getItems = function(callback) {
    //callback('api module works!');
    $.getJSON(`${BASE_URL}/items`, callback); 
  };

  const createItem = function(name, callback) {
    const newItem = JSON.stringify({name: name});
  
    $.ajax( {
      url: `${BASE_URL}/items`,
      method: 'POST',
      contentType : 'application/json',
      data : newItem,
      success: callback
    } , callback);
  };

  const updateItem = function(id, updateData, callback){
    const updatedData = JSON.stringify(updateData);
    $.ajax( {
      url: `${BASE_URL}/items/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: updatedData,
      success: callback
    } , callback);
  };

  const deleteItem = function(id, callback) {
    $.ajax( {
      url: `${BASE_URL}/items/${id}`,
      method: 'DELETE',
      success: callback
    } , callback);
  };
  
  return {
    getItems,
    createItem,
    updateItem,
    deleteItem
  };


}());

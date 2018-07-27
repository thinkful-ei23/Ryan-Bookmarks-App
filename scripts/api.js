'use strict';
/* global $ */

const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/ryan/bookmarks';

  const getItems = function(callback) {
    //callback('api module works!');
    $.getJSON(`${BASE_URL}`, callback); 
  };

  const createItem = function(name, url, desc, callback) {
    const newItem = JSON.stringify({title: name, url: url, desc: desc});
  
    $.ajax( {
      url: `${BASE_URL}`,
      method: 'POST',
      contentType : 'application/json',
      data : newItem,
      success: callback
    } , callback);
  };

  const updateItem = function(id, updateData, callback){
    const updatedData = JSON.stringify(updateData);
    $.ajax( {
      url: `${BASE_URL}/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: updatedData,
      success: callback
    } , callback);
  };

  const deleteItem = function(id, callback) {
    $.ajax( {
      url: `${BASE_URL}/${id}`,
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

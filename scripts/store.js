'use strict';


const store = (function(){

  const setError = function(error) {
    this.error = error;
  };

  const addItem = function(item) {
    this.items.push(item);
    console.log(store);
  };

  const findById = function(id) {
    return store.items.find(item => item.id === id);
  };


  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
  };


  return {
    items: [],
    sortValue: 1,
    error:null,
    create: null,

    setError,
    addItem,
    findById,
    findAndDelete,
    findAndUpdate,
  };
  
}());

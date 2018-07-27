/* global cuid */

// eslint-disable-next-line no-unused-vars
const Item = (function(){

  const validateName = function(name) {
    if (!name) throw new TypeError('Name must not be blank');
    if (!url) throw new TypeError('URL field must not be blank');

  };

  const create = function(name, url, rating) {
    return {
      id: cuid(),
      name,
      url,
      rating,
      expand: false
    };
  };

  return {
    validateName,
    create,
  };
  
}());

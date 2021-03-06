'use strict';

// YOU KNOW WHAT TO DO //
/**
 *identity: Designed to take a value and return that same value to check its 
 * identity.
 * 
 * @param {Value} data: data being passed to function to identify 
 * @return  {Value} data: returns value input
 */
function identity(value) {
    return value;
}



/**
 *typeOf: Designed to take a value and return its type as a string.
 * 
 * @param {Value} data: data being used to generate a type
 * @return {String} a string representing the type of data that value is.
 */
function typeOf(value) {
    if (Array.isArray(value)) {
        return 'array';
    } else if (value === null) {
        return 'null';
    } else if (typeof value === 'object') {
        return 'object';
    } else if (typeof value === 'function') {
        return 'function';
    } else if (typeof value === 'string') {
        return 'string';
    } else if (typeof value === 'undefined') {
        return 'undefined';
    } else if (typeof value === 'number') {
        return 'number';
    } else if (typeof value === 'boolean') {
        return 'boolean';
    }
}



/**
 *first: Designed to take an array, and return the first X number of elements
 * in that array. If there is no array or the number is negative, an empty
 * array is returned. If no number is given, or number is not a number, the 
 * first element in the array is returned.
 * 
 * @param {Array} collection: collection being looped over
 * @param {Number}: number of elements to be returned in a new array
 * @return {Array} collection: returns the first {number} of elements in a new array
 */
function first(array, number) {
    if (!Array.isArray(array) || number < 0) {
        return [];
    }
    else if (number === null || typeof number !== 'number') {
        return array[0];
    } else {
        return array.slice(0, number);
    }
}



/**
 *last: Designed to take an array, and return the last X number of elements in
 * that array. If the {array} param is not an array, an empty array is returned.
 * If there is no number, or {number} is not a number, the last element in the
 * array is returned.
 * 
 * @param {Array} collection: collection to be looped over
 * @param {Number} number: number of elements to be returnd in new array
 * @return  {Array} collection: returns the last {number} of elements in a new array
 */
function last(array, number) {
    if(!Array.isArray(array)) {
        return [];
    }     else if (number === null || typeof number !== 'number') {
        return array[array.length - 1];
    }else if (number > array.length) {
        return array;
    }else {
        return array.slice([array.length - number], [array.length]);
    }
}



/**
 *indexOf: Designed to loop over an array and return the index of a value if it
 * is found in that array
 * 
 * @param {Array} collection: collection designed to be looped over
 * @param {Value} data: data to be checked against in order to find an index
 * @return {Number} datatype: returns first index of the value passed to the 
 * //function. If the value is not found, -1 is returned.
 */
function indexOf(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return i;
        }
    } return -1;
}

/**
 *contains: Designed to loop an array, and look for a value and return a boolean
 * if that value is found therein
 * 
 * @param {Array} collection: collection to be looped over
 * @param {Value} data: data to be checked against to find a boolean
 * @return {Boolean} returns a boolean of true or false if the value exists in the array
 * or not
 */
function contains(array, value) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        } 
    } return false;
}



/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 * @return TRICK Question. Each doesn't return anything.
 */
function each(collection, func) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            const element = collection[i];
            func(element , i, collection);
        
        }
    } else if (typeof collection === 'object') {
        for (let key in collection) {
            const element = collection[key];
            func(element, key, collection);
        }
    }
}



/**
 *unique: Designed to iterate over an array, and return a new array with all the
 * duplicates removed. 
 * 
 * @param {Array} collection: collection over which to iterate
 * @return {Array} collection: returns a new array of unique elements with no
 * duplicates
 */
function unique(array) {
  let newArr = [];
    for (let i = 0; i < array.length; i++) {
        if(indexOf(newArr, array[i]) === -1) {
            newArr.push(array[i]);
        }
    }return newArr;
}



/**
 *filter: Designed loop a collection, passing some test to each element and if
 * it resolves to true then the element is pushed to a new array
 * 
 * @param {Array or Object} collection: collection designed to be looped over
 * @param {Test} action: function applies to each value in the loop 
 * @return {Array} collection: returns a new array of filtered elements that 
 * pass the test given to each element
 */
function filter(collection, test) {
   let newArr = [];
  each(collection, (element, i, collection) => {
     if (test(element, i, collection)) {
         newArr.push(element);
     }
 }); return newArr;
}



/**
 *reject: Designed to loop over a collection, filtering it with some action and
 * return all elements that resolve to false in a new array
 * 
 * @param {Array or Object} collection: collection to be iterated over
 * @param {Action} action: function to be passed as a test to the collection 
 * @return {Array} collection: returns an array of elements that do not pass the
 * test given to each element/the rejected elements
 */
function reject(collection, action) {
    let newArr = [];
    
    filter(collection, (element, i, collection) => {
        if (action(element, i, collection) === false) {
            newArr.push(element);
        }
    }); return newArr;
}



/**
 *partition: Designed to loop over a collection, passing all the elements that
 * pass to one array, and those that do not to another array
 * 
 * @param {Array or Object} collection: collection to be iterated over
 * @param {Action} action: function that acts as a test to discern which array 
 * to place the element
 * @return {Array} collection: returns a new array, with two sub arrays, one 
 * containing all the elements that pass a test, and the other containing all 
 * the elements that failed to pass
 */
function partition (collection, action) {
  let mainArray = [[],[]];
  each(collection, (element, i, collection) => {
      if(action(element,i, collection) == true) {
          mainArray[0].push(element);
      } else {
          mainArray[1].push(element);
      }
  });  return mainArray;
}



/**
 *map: Designed iterate over a collection, and create a new array with the results
 * of calling a function on each element in the original array.
 * 
 * @param {Object or Array} collection: collection to be iterated over
 * @param {Action} action: function passed to each element in order to modify
 * what will be pushed into the new array
 * @return {Array} collection: returns a new array with the results of passing
 * each element to a function
 */
function map (collection, action) {
 let newArr = [];
 each(collection, (element, index, collection) => {
     newArr.push(action(element, index, collection));
 }); return newArr;
}



/**
 *pluck: Designed to iterate over a collection, and push a specified property
 * from each element into a new array and return the new array
 * 
 * @param {Object or Array} collection: collection to be iterated over
 * @param {Prop} property: property on the object to be accessed in order to 
 * attain a value to be pushed into new array
 * @return {Array} collection: returns an array with the values of each element
 * at a specified property
 */
function pluck(collection, prop) {
    let newArr = [];
    each(collection, (element, i, collection) => {
        newArr.push(element[prop]);
    }); return newArr;
}



/**
 *every: Designed to iterate over a collection, and pass a test to each element
 * If each element in the collection is true then true is returned. But if even
 * one elment is false then false is returned. If no test is passed to the 
 * function, the function will return true if a collection exists, and false if
 * not
 * 
 * @param {Object or Array} collection: collection to be iterated over
 * @param {Action} action: function designed to test each element being 
 * iterated over
 * @return {Boolean}: returns a true if each element passes a test, however if
 * each element does not pass then false is returned.
 */
function every (collection, action) {
    if (action === undefined) {
        for (let i = 0; i <collection.length; i++) {
            if (collection[i]) {
                return true;
            } else if (!collection[i]){
                return false;
            }
        }
    } else if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            if (action(collection[i], i, collection) === false) {
                return false;
            }
        }
        }else {
            for (var key in collection) {
                if (action(collection[key], key, collection) === false) {
                    return false;
                }
            }
        }return true;
}



/**
 *some: Designed to iterate over a collection, and return true if even one 
 * element in the array passes the test resolving to true. If no elements pass
 * then false is returned. If no action is given, then if the collection exists
 * true will be returned. Conversely, if it does not, false will be returned.
 * 
 * @param {Object or Array} collection: collection to be iterated over
 * @param {Action} action: function to be passed to each element to return a 
 * boolean
 * @return {Boolean}: returns true if even one element passes a test, however
 * if no elements pass the test then false is returned
 */
 function some(collection, action) {
    if (action === undefined) {
        for (let i = 0; i < collection.length; i++) {
            if (collection[i]) {
                return true;
            }return false;
        }
    } else if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
            if (action(collection[i], i, collection)) {
                return true;
            }
        }return false;
    } else {
        for (var key in collection) {
            if (action(collection[key], key, collection)) {
                return true;
            } return false;
        }
        }
    
}



/**
 *reduce: Designed to loop over an array, perform some action on each element,
 * and return that modified value as a new seed. If no seed is given, then the
 * first element in the array becomes the seed
 * 
 * @param {array} collection: collection to be iterated over
 * @param {action} action: function designed to modify each element being looped
 * @param {seed} data: placeholder designed to hold modified value after each
 * iteration
 * @return {any data type}: returns any data type specified by the user after
 * passing a function to each element and accruing the result in an accumulator
 */
function reduce(array, action, seed) {
    each(array, (element, i, array) => {
        if(seed === undefined) {
            seed = array[0];
        } else {
            seed = action(seed, element, i);
        }
    });
    return seed;
}



/**
 *extend: Designed to copy the values of one or more source objects onto a 
 * target object
 * 
 * @param {obj} collection: target collection onto which values will be copied
 * @param {obj2} collection: source collection from which values will be copied
 * @param {...callMeWhatever} collection: source collection set off with rest
 * operator to tell computer that as many args can be passed to the function as
 * needed
 * @return {Object} collection: returns object values copied from sources
 */
function extend(obj, obj2, ...callMeWhatever) {
  return Object.assign(obj, obj2, ...callMeWhatever);  
}
module.exports.each = each;
module.exports.identity = identity;
module.exports.typeOf = typeOf;
module.exports.first = first;
module.exports.last = last;
module.exports.indexOf = indexOf;
module.exports.contains = contains;
module.exports.unique = unique;
module.exports.filter = filter;
module.exports.reject = reject;
module.exports.partition = partition;
module.exports.map = map;
module.exports.pluck = pluck;
module.exports.every = every;
module.exports.some = some;
module.exports.reduce = reduce;
module.exports.extend = extend;
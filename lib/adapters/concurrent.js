var concurrent = require('concurrent');
var Promise = concurrent.Promise;
var collections = concurrent.collections;

exports.pending = function() {
  var promise = new Promise();

  return {
    promise: promise,
    fulfill: function(value) {
      promise.fulfill(value);
    },
    reject: function(reason) {
      promise.reject(reason);
    }
  }
};

exports.fulfilled = function(value) {
  var promise = new Promise();
  promise.fulfill(value);
  return promise;
};

exports.rejected = function(reason) {
  var promise = new Promise();
  promise.reject(reason);
  return promise;
};

exports.map = collections.map;
exports.reduce = collections.reduce;

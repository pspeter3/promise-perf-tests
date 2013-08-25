var avow = require('avow');

// This will work, but may create a slight but unfair perf advantage for avow
//exports.pending = avow;

// So, explicitly mimic other adapters
exports.pending = function() {
	var v = {};
  v.promise = avow(function(resolve, reject) {
    v.fulfill = resolve;
    v.reject = reject;
  });

  return v;
};

exports.fulfilled = avow.lift;
exports.rejected = avow.reject;
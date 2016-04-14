'use strict';

// load math.js 
var math = require('mathjs');

function calculator(event, cb) {
  console.log("mathExp: ", JSON.stringify(event.mathExp));

  if (event.httpMethod === "POST" && event.mathExp.length>0) {
    var response = {
        result: math.eval(event.mathExp)
    };

    return cb(null, response);    
  }
  return cb(null, {result: 0});
};

module.exports.handler = function(event, context) {
  calculator(event, function(error, response) {
    return context.done(error, response);
  });
};

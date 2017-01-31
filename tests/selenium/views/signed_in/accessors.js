'use strict';

const By = require('selenium-webdriver').By;
const Accessors = require('../accessors');


function SignedInAccessors() {
  Accessors.apply(this, arguments);
}

SignedInAccessors.prototype = Object.assign({

  //TBD

}, Accessors.prototype);

module.exports = SignedInAccessors;

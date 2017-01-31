'use strict';

const By = require('selenium-webdriver').By;
const Accessors = require('../accessors');


function LoginAccessors() {
  Accessors.apply(this, arguments);
}

LoginAccessors.prototype = Object.assign({

  get passwordField() {
    return this.waitForElement(By.css('#app > div > div.jumbotron > div > div > form > div:nth-child(2) > input'));
  },

  get singInButton() {
    return this.waitForElement(By.css('#app > div > div.jumbotron > div > div > form > div:nth-child(3) > button'));
  },

  get unauthorizedError() {
  	return this.waitForElement(By.css('#app > div > div.jumbotron > div > div > form > div.form-group.has-error > span'))
  }

}, Accessors.prototype);

module.exports = LoginAccessors;

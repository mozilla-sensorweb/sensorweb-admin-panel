'use strict';

var LoginView = require('./views/login/view.js');

function MainPage(driver) {
    this.driver = driver;
}

MainPage.prototype = {
    getLogInPage : function() {
        return new LoginView(this.driver);
    },

    stop() {
    return this.driver.quit();
  },
};

module.exports = MainPage;

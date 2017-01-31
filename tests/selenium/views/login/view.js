'use strict';

const View = require('../view');
const LoginAccessors = require('./accessors');


function LoginView() {
  [].push.call(arguments, LoginAccessors);
  View.apply(this, arguments);

  this.accessors.passwordField;
  this.accessors.singInButton;
}

LoginView.prototype = Object.assign({

  correctPassword(password) {
    return this.accessors.passwordField.sendKeys(password)
    .then(() => { this.accessors.singInButton.click() 
    .then(() => {
      const SignedInView = require('../signed_in/view');
      return new SignedInView(this.driver);
    });
  });
  },

  incorrectLogin(password) {
    return this.accessors.passwordField.sendKeys(password)
      .then(()=>{
        return this.accessors.singInButton.click()
      }).then(() => { return this.accessors.unauthorizedError.getText()})
  }

}, View.prototype);

module.exports = LoginView;

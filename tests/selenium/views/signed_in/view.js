'use strict';

const View = require('../view');
const SignedInAccessors = require('./accessors');


function SignedInView() {
  [].push.call(arguments, SignedInAccessors);
  View.apply(this, arguments);
}

SignedInView.prototype = Object.assign({

 // Functions for the SingedIn View TBD

}, View.prototype);

module.exports = SignedInView;

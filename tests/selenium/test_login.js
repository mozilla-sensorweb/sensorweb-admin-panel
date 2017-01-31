'use strict';

var assert = require('assert');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

const By = require('selenium-webdriver').By;
const until = webdriver.until;

var service = new chrome.ServiceBuilder(path).build();
    chrome.setDefaultService(service);

var HOST_URL = 'http://localhost:3000'

describe( 'Show main page', function(done) {

    var mochaTimeOut = 30000; //ms
    var driver;

    var MainPage = require('./mainPage');
    var mainPage;
    var loginView;
    var elements;


    before(function() {
        this.timeout(mochaTimeOut);
        driver = new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    });

    after(() => mainPage.stop());

    beforeEach(function() {
       driver.get(HOST_URL)
    });

    it('should be titled sensorweb', function () {
    this.timeout(mochaTimeOut);
      return driver.wait(webdriver.until.titleIs('SensorWeb'), 5000)
        .then(function(value) {
          return assert.equal(value, true);
        });
    });

    describe('Sign In', function() {

        beforeEach(function() {
          elements = {
            pwd: driver.findElement(webdriver.By.css('#app > div > div.jumbotron > div > div > form > div:nth-child(2) > input')),
            signIn: driver.findElement(webdriver.By.css('button.btn.btn-primary.btn-lg'))
          };
            mainPage = new MainPage(driver);
            loginView = mainPage.getLogInPage();
            return loginView;   
        });

        it('should have the rights fields', function() {
            var types = {
            pwd: 'password',
            signIn: 'submit'
            };
            var promises = Object.keys(elements).map(function(key) {
                return elements[key].getAttribute('type')
                .then(function(value) {
                assert.equal(value, types[key]);
                });
            });
            return Promise.all(promises);
        });

        it('should error if wrong password', function () {
            return loginView.incorrectLogin('a')
            .then((text) => { assert.equal(text, 'Unauthorized')});
        });

        it('should error if empty password', function () {
            return loginView.incorrectLogin('')
            .then((text) => { assert.equal(text, 'Unauthorized')});
        });

        it('should login if password is correct', function () {
            // The password should be the one used in server -> dev.json file
            return loginView.correctPassword('PasswordSet')
        });
   });
});

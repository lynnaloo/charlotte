'use strict';

var RollingSpider = require('rolling-spider');
var temporal = require('temporal');

var charlotte = new RollingSpider();

charlotte.connect(function() {
  charlotte.setup(function() {

    temporal.queue([
      {
        delay: 0,
        task: function () {
          charlotte.flatTrim();
          charlotte.startPing();
          charlotte.flatTrim();
          console.log('Taking off!');
          charlotte.takeOff();
          charlotte.flatTrim();
        }
      },
      {
        delay: 3000,
        task: function () {
          console.log('Going forward');
          charlotte.forward();
        }
      },
      {
        delay: 500,
        task: function () {
          console.log('Landing!');
          charlotte.land();
        }
      }]);
  });
});

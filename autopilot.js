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
          charlotte.takeOff();
        }
      },
      {
        delay: 3000,
        task: function () {
          charlotte.forward();
        }
      },
      {
        delay: 500,
        task: function () {
          charlotte.land();
        }
      }]);
  });
});

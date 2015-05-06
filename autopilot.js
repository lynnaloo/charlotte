// Based on Rolling Spider sample code

'use strict';

var Drone = require('rolling-spider');
var temporal = require('temporal');

var charlotte = new Drone(process.env.UUID);
charlotte.connect(function () {
  charlotte.setup(function () {

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
          charlotte.forward({steps: 100});
        }
      },
      {
        delay: 2000,
        task: function () {
          charlotte.turnRight({steps: 300});
        }
      },
      {
        delay: 2000,
        task: function () {
          charlotte.forward({steps: 100});
        }
      },
      {
        delay: 2000,
        task: function () {
          charlotte.tiltLeft({steps: 30, speed: 100});
        }
      },
      {
        delay: 2000,
        task: function () {
          charlotte.tiltRight({steps: 30, speed: 100});
        }
      },
      {
        delay: 2000,
        task: function () {
          charlotte.frontFlip();
        }
      },
      {
        delay: 2000,
        task: function () {
          charlotte.land();
        }
      },
      {
        delay: 5000,
        task: function () {
          process.exit(0);
        }
      }
    ]);

  });
});

// based on Rolling Spider sample: https://github.com/voodootikigod/node-rolling-spider/blob/master/eg/keyboard.js

'use strict';

var keypress = require('keypress');
var Drone = require('rolling-spider');

var ACTIVE = true;
var STEPS = 2;
var charlotte;

function cooldown() {
  ACTIVE = false;
  setTimeout(function () {
    ACTIVE = true;
  }, STEPS * 12);
}

// make `process.stdin` begin emitting 'keypress' events
keypress(process.stdin);

process.stdin.setRawMode(true);
process.stdin.resume();

if (process.env.UUID) {
  console.log('Searching for ', process.env.UUID);
}

charlotte = new Drone(process.env.UUID);

function launch() {
  charlotte.connect(function () {
    charlotte.setup(function () {
      console.log('Prepare for take off! ', charlotte.name);
      charlotte.flatTrim();
      charlotte.startPing();
      charlotte.flatTrim();

      charlotte.on('battery', function () {
        console.log('Battery: ' + charlotte.status.battery + '%');
        charlotte.signalStrength(function (err, val) {
          console.log('Signal: ' + charlotte.status.battery + 'dBm');
        });

      });
      setTimeout(function () {
        charlotte.takeOff();
        ACTIVE = true;
      }, 1000);

    });
  });

}

// listen for the 'keypress' event
process.stdin.on('keypress', function (ch, key) {
  if (ACTIVE && key) {
    if (key.name === 'm') {
      charlotte.emergency();
      setTimeout(function () {
        process.exit();
      }, 3000);
    } else if (key.name === 't') {
      charlotte = new Drone(process.env.UUID);
      launch();
    } else if (key.name === 'w') {
      charlotte.forward({ steps: STEPS });
      cooldown();
    } else if (key.name === 's') {
      charlotte.backward({ steps: STEPS });
      cooldown();
    } else if (key.name === 'left') {
      charlotte.turnLeft({ steps: STEPS });
      cooldown();
    } else if (key.name === 'a') {
      charlotte.tiltLeft({ steps: STEPS });
      cooldown();
    } else if (key.name === 'd') {
      charlotte.tiltRight({ steps: STEPS });
      cooldown();
    } else if (key.name === 'right') {
      charlotte.turnRight({ steps: STEPS });
      cooldown();
    } else if (key.name === 'up') {
      charlotte.up({ steps: STEPS * 2.5 });
      cooldown();
    } else if (key.name === 'down') {
      charlotte.down({ steps: STEPS * 2.5 });
      cooldown();
    } else if (key.name === 'i' || key.name === 'f') {
      charlotte.frontFlip({ steps: STEPS });
      cooldown();
    } else if (key.name === 'j') {
      charlotte.leftFlip({ steps: STEPS });
      cooldown();
    } else if (key.name === 'l') {
      charlotte.rightFlip({ steps: STEPS });
      cooldown();
    } else if (key.name === 'k') {
      charlotte.backFlip({ steps: STEPS });
      cooldown();
    } else if (key.name === 'q') {
      console.log('Initiated Landing Sequence...');
      charlotte.land();
      setTimeout(function () {
        process.exit();
      }, 3000);
    }
  }
  if (key && key.ctrl && key.name === 'c') {
    process.stdin.pause();
    process.exit();
  }
});

launch();

'use strict';

var keypress = require('keypress');
var RollingSpider = require('rolling-spider');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
process.stdin.resume();

var charlotte = new RollingSpider(process.env.UUID);
console.log('t');
charlotte.connect(function () {
  console.log('connecting to Charlotte');
  charlotte.setup(function () {
    // start on flat surface
    d.flatTrim();
    // find quadcopter
    console.log('Charlotte, are you there?');
    d.startPing();
    d.flatTrim();
    console.log('Taking off!!');
    d.takeOff();
    d.flatTrim();

    // listen for the "keypress" event
    console.log('Listening for key controls ...');

    process.stdin.on('keypress', function (ch, key) {
      if (!key) {
        console.log('invalid input');
        return;
      }

      if (key) {
        if (key.name === 'q') {
          console.log('Landing now...');
          charlotte.land();
          setTimeout(function () {
            process.exit();
          }, 3000);
        }

        if (key.name === 'w') {
          console.log('Going forward');
          charlotte.forward({steps: 50});

        } else if (key.name === 's') {
          console.log('Going backward');
          charlotte.backward({steps: 50});

        } else if (key.name === 'a') {
          console.log('Turning Left');
          charlotte.turnLeft({steps: 20});

        } else if (key.name === 'left') {
          console.log('Tilting Left');
          charlotte.tiltLeft({steps: 20});

        } else if (key.name === 'right') {
          console.log('Tilting Right');
          charlotte.tiltRight({steps: 20});

        } else if (key.name === 'd') {
          console.log('Turning Right');
          charlotte.turnRight({steps: 20});

        } else if (key.name === 'up') {
          console.log('Going up');
          charlotte.up();

        } else if (key.name === 'down') {
          console.log('Going down!');
          charlotte.down();

        } else if (key.name === 'f') {
          console.log('FLIP!!!');
          charlotte.frontFlip();

        } else if ( key.ctrl && key.name === 'p') {
           console.log('Pausing');
           process.stdin.pause();
        }
      }
    });
  });
});

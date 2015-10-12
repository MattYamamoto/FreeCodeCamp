$(document).ready(function() {
  "use strict";
  var $action = $('.action'),
      $breakDec = $('.break-dec'),
      $breakInc = $('.break-inc'),
      $breakTime = $('.break-time .number'),
      $clock = $('.clock'),
      $light = document.getElementsByClassName('light'),
      $pomoDec = $('.pomo-dec'),
      $pomoInc = $('.pomo-inc'),
      $pomoTime = $('.pomo-time .number'),
      $progressFill = $('.progress-fill'),
      breakColor = '#A00',
      buffer = [],
      //not all characters are 5x7
      characters = {
        " ": [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        '0': [
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 1, 1],
          [1, 0, 1, 0, 1],
          [1, 1, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0]
        ],
        '1': [
          [0, 0, 1, 0, 0],
          [0, 1, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 1, 1, 1, 0]
        ],
        '2': [
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [0, 0, 0, 0, 1],
          [0, 0, 0, 1, 0],
          [0, 0, 1, 0, 0],
          [0, 1, 0, 0, 0],
          [1, 1, 1, 1, 1]
        ],
        '3': [
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [0, 0, 0, 0, 1],
          [0, 0, 1, 1, 0],
          [0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0]
        ],
        '4': [
          [0, 0, 0, 1, 0],
          [0, 0, 1, 1, 0],
          [0, 1, 0, 1, 0],
          [1, 0, 0, 1, 0],
          [1, 1, 1, 1, 1],
          [0, 0, 0, 1, 0],
          [0, 0, 0, 1, 0]
        ],
        '5': [
          [1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 0],
          [0, 0, 0, 0, 1],
          [0, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0]
        ],
        '6': [
          [0, 0, 1, 1, 0],
          [0, 1, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0]
        ],
        '7': [
          [1, 1, 1, 1, 1],
          [0, 0, 0, 0, 1],
          [0, 0, 0, 1, 0],
          [0, 0, 1, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 1, 0, 0, 0]
        ],
        '8': [
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0]
        ],
        '9': [
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 1],
          [0, 0, 0, 0, 1],
          [0, 0, 0, 1, 0],
          [0, 1, 1, 0, 0]
        ],
        P: [
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0]
        ],
        a: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [0, 0, 0, 0, 1],
          [0, 1, 1, 1, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 1]
        ],
        d: [
          [0, 0, 0, 0, 1],
          [0, 0, 0, 0, 1],
          [0, 0, 0, 0, 1],
          [0, 1, 1, 1, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 1]
        ],
        e: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 1, 1, 1, 1],
          [1, 0, 0, 0, 0],
          [0, 1, 1, 1, 1]
        ],
        m: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 1, 0, 1, 0],
          [1, 0, 1, 0, 1],
          [1, 0, 1, 0, 1],
          [1, 0, 1, 0, 1],
          [1, 0, 0, 0, 1]
        ],
        o: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0]
        ],
        r: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [1, 0, 1, 1, 0],
          [1, 1, 0, 0, 1],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [1, 0, 0, 0, 0]
        ],
        s: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 1, 1, 1, 1],
          [1, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [0, 0, 0, 0, 1],
          [1, 1, 1, 1, 0]
        ],
        u: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0]
        ],
        ":": [
          [0],
          [1],
          [1],
          [0],
          [1],
          [1],
          [0]
        ]
      },
      chimeURL = 'https://dl.dropbox.com/s/fru6bojfqtewixt/Music_Box.mp3',
      chime = new Audio(chimeURL),
      clockTimer,
      clockState = {time: '', totalDur: '', type: '', progress: ''},
      colOffset = 0,
      effectSpeed = 50,
      effectTimer,
      mask = [],
      paused = false,
      pauseTimer,
      pomoColor = '#0A0',
      rowOffset = 0,
      running = false,
      scrollSpeed = 50,
      scrollTimer,
      totCols = $('.light-row-0').children().length,
      totRows = $('.light-row').length,
      wrapHoriz = false,
      wrapVert = false;

  //creates an array with 'num' number of empty sub-Arrays
  function subArrays(num) {
    return Array.apply(null, new Array(num))
      .map(function() {
        return [];
      });
  }

  //For an array of sub-arrays, find the greatest sub-array length
  function getMaxRows(arr) {
    return arr.reduce(function(prev, curr) {
      return prev.length > curr.length ? prev : curr;
    }).length;
  }

  //checks array against size value, if array is smaller then pad rows
  //to the bottom using padChar
  function padRows(arr, size, padChar) {
    var rowLength = arr[0].length;

    if (arr.length < size && rowLength !== undefined) {
      arr.push(Array.apply(null, new Array(rowLength)).map(function() {
        return padChar;
      }));
      padRows(arr, size, padChar);
    }

    return arr;

  }

  //Return index number of light for $light array/object
  function rowColLookup(row, col) {
    var ind = (row * totCols) + col;

    return ind;
  }

  function clearLED() {
    var elements = $light;

    for(var i = 0; i < elements.length; i++) {
      elements[i].className = elements[i].className.replace('on', 'off');
    }
  }

  //Stop all effects
  function clearEffects() {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(effectTimer);
  }

  //Stop all timers (effects and clocks)
  function clearTimers() {
    window.clearTimeout(scrollTimer);
    window.clearTimeout(effectTimer);
    window.clearTimeout(clockTimer);
    window.clearTimeout(pauseTimer);
  }

  //gets character led matrix for given character.
  function getCharMatrix(char) {
    return characters[char];
  }

  //LED matrix height (number of rows) for a character
  function getCharHeight(char) {
    return characters[char].length;
  }

  //LED matrix width (number of cols) for a character
  function getCharWidth(char) {
    return characters[char][0].length;
  }

  //take array of led character sub-arrays and merge rows with single column
  //seperating characters
  function mergeChars(arr) {
    var results = subArrays(getMaxRows(arr)),
        maxRows = getMaxRows(arr);

    arr.map(function(charSubArray) {
      padRows(charSubArray, maxRows, 0).map(function(row, ind) {
        results[ind].push.apply(results[ind], row);
        results[ind].push(0);
      });
    });
    return results;
  }

  //Sets input string to the buffer
  function setString(str) {
    var stringArray = mergeChars(str.split("").map(getCharMatrix));

    //create mask with visible state
    mask.forEach(function(row, ind) {
      //clear the row (mask may have been previously set)
      mask[ind] = [];
      for (var i = 0; i < stringArray[0].length; i++) {
        mask[ind].push(1);
      }
    });

    buffer = stringArray;
    return buffer;
  }

  //fix for negative number mods:  x%y = ((x%y)+y)%y
  function fixMod(x, y) {
    return ((x%y)+y)%y;
  }

  //Map input array, 'arr', to the screen display through the mask array
  function drawDisplay(arr) {
    var $currLight,
        screenRow,
        screenCol,
        wrapMin,
        strLength = arr[0].length + 5,
        strHeight = arr.length + 2;

    clearLED();

    if (strLength > totCols) {
      wrapMin = strLength;
    } else {
      wrapMin = totCols;
    }

    //map applicable portion of the array to screen lights class
    arr.forEach(function(row, rowInd) {
      row.forEach(function(col, colInd) {
        if (wrapHoriz === true || wrapHoriz === undefined) {
          screenCol = fixMod((colInd + colOffset), wrapMin);
        } else {
          screenCol = colInd + colOffset;
        }
        if (wrapVert === true) {
          screenRow = fixMod((rowInd + rowOffset), strHeight);
        } else {
          screenRow = rowInd + rowOffset;
        }

        if (!(screenRow >= totRows || screenRow < 0 ||
            screenCol >= totCols || screenCol < 0)) {
          $currLight = $light.item(rowColLookup(screenRow,screenCol));
          if (arr[rowInd][colInd] && mask[rowInd][colInd]) {
            $currLight.className = $currLight.className.replace('off', 'on');
          } else {
            $currLight.className = $currLight.className.replace('on', 'off');
          }
          $currLight = null;
        }
      });
    });
  }

  //Display input string to the screen
  function displayString(str) {
    drawDisplay(setString(str));
  }

  //Returns length/width (in number of LEDs) of a given string
  function stringDisplayLength(str) {
    var chars = str.split("");

    return chars
      .map(getCharWidth)
      .reduce(function(prev, curr) {
        return prev + curr + 1;
      });
  }

  //Pad buffer to center string
  //Only applies if string is smaller than LED length
  function center(str) {
    var padding = 0;

    padding = Math.floor((totCols - stringDisplayLength(str)) / 2);
    if (padding > 0) {
      colOffset = padding;
    }
    return str;
  }





  //Clock/Timer functions

  //Input time in milliseconds returns array of strings representing
  // 2 digit hours, minutes, and seconds
  function toHoursMinsSecs(time) {
    var hours,
        mins,
        secs;

    //convert time from milliseconds to seconds
    time = time / 1000;

    secs = time % 60;
    mins = ((time - secs) % 3600) / 60;
    hours = (time - (mins * 60) - secs) / 3600;

    //makes a number at least 2 digits
    function minTwoDigits(num) {
      if (num > 9) {
        return num;
      } else {
        return "0" + num;
      }
    }

    secs = minTwoDigits(secs).toString();
    mins = minTwoDigits(mins).toString();
    hours = minTwoDigits(hours).toString();

    return [hours, mins, secs];
  }

  //takes a time in milliseconds and returns a time string
  //in the format of hh:mm:ss
  function timeString(time) {
    var timeArr = toHoursMinsSecs(time);

    return timeArr[0] + ":" + timeArr[1] + ":" + timeArr[2];
  }

  //fill the clock background to the precent (from bottom) specified.
  function progress(percent, color) {
    $progressFill.css({
      'transform': 'scaleY(' + percent + ')',
      'background-color': color
    });

  }

  //Countdown timer. ProgressColor gives visual representation in background
  //of clock face
  function countDownTimer(startTime, endCallback, progColor) {
    var refTime = new Date().getTime() - 1000,
        currTime = startTime,
        totalTime = clockState.totalDur || currTime,
        err,
        progressColor = progColor || pomoColor;

    $progressFill.css('background-color', progressColor);

    (function stepTime() {
      var percent = 1 - currTime / totalTime;
      clockState.time = currTime;

      if (currTime >= 0) {
        running = true;
        displayString(timeString(clockState.time));

        progress(percent, progressColor);

        currTime -= 1000;
        //keep timing honest by using system clock to check against starting reference time
        err = ((new Date().getTime() - refTime) - (startTime - currTime));

        clockTimer = window.setTimeout(stepTime, (1000 - err));
      } else if (currTime < 0) {
        running = false;
        endCallback();
      }
    })();
  }

  //Return 'session' or 'break' time, in milliseconds, from from the DOM
  function getPomoTime(type) {
    var pomoTimes = {
        session : parseInt($pomoTime.html()) * 60 * 1000,
        break : parseInt($breakTime.html()) * 60 * 1000,
    };

    return pomoTimes[type];
  }

  //Start pomo clock sequence.  If called from paused state, then retrieve
  //time & status info from the 'ClockState' object
  //Pass in scroll dir and repeat time if desired.
  function startPomo(scrollDir, repeatTime) {
    var scrollParams = {dir: scrollDir, pauseTime: repeatTime, initialDelay: repeatTime, wrap: true};

    if(!paused) {
      clockState.totalDur = getPomoTime('session');
      center(timeString(getPomoTime('session')));
      clearEffects();
      pomoTimer( getPomoTime('session') );
    } else {
      paused = false;
      center(timeString(clockState.time));
      clearEffects();
      pomoTimer(clockState.time);
    }

    scroll(scrollParams);

  }

  //Starts the 'seesion' time sequence and sets the 'break' timer
  //to run on session completinon.
  function pomoTimer(pomoTime) {
    clockState.type = 'session';

    countDownTimer(pomoTime, function() {
      clearEffects();
      center(timeString(getPomoTime('break')));
      chime.play();
      breakTimer(getPomoTime('break'));
    }, pomoColor);
  }

  //Starts the 'break' time sequence and sets the 'session' timer
  //to run on session completinon.
  function breakTimer(breakTime) {
    clockState.type = 'break';

    countDownTimer(breakTime, function() {
        clearEffects();
        center(timeString(getPomoTime('break')));
        chime.play();
        pomoTimer( getPomoTime('session') );
      }, breakColor);
  }

  //Stops(pauses) clcok.  Pass in current time for display purposes
  function pause(timeStr) {
    displayString(center('Paused'));
    pauseTimer = window.setTimeout(function() {
      displayString(center(timeStr));
      pauseTimer = window.setTimeout(pause, 2000, timeStr);
    }, 2000);

  }

  //Resums countdown clock using 'ClockState' object to retrieve
  //current time, progress, and type of countdown (session or break')
  function resume(clockStateObj) {
    paused = false;
    clearTimers();

    if(clockStateObj.type === 'session'){
      pomoTimer(clockStateObj.time);
    }
    else if(clockStateObj.type === 'break'){
      breakTimer(clockStateObj.time);
    }

  }



  //Effect functionality

  function changeRowOffset(delta) {
    return rowOffset += delta;
  }

  function changeColOffset(delta) {
    return colOffset += delta;
  }

  //Set global wrap variables
  function setWrapGlobal(dir, wrap) {
    if (dir === 'left' || dir === 'right') {
      if (wrap === true) {
        wrapHoriz = true;
      } else {
        wrapHoriz = false;
      }
    } else if (dir === 'up' || dir === 'down') {
      if (wrap === true) {
        wrapVert = true;
      } else {
        wrapVert = false;
      }
    }
  }

  /*
  Scroll function use object to contain arguments (default values shown):
    {'dir': 'left, 'repetitions': -1, 'wrap': false, 'pauseTime': 0, 'initialDelay': 0}
    dir:  up, down, left, right
    repetitions: enter a number for number of times scroll, -1 causes infinite scroll
    wrap: true or false.  When set to false all text clears screen before wrapping
    paustTime: Time to pause, in milliseconds, after text has returned to
              start position.  Enter 0 for continuous scroll effect
    initialDelay: time, in millisceonds, to wait before first scroll
  */
  function scroll(obj) {
    var startRow = rowOffset,
      startCol = colOffset,
      counter = 0,
      condition,
      deferred = $.Deferred(),
      dir = obj.dir || 'left',
      repetitions = obj.repetitions || -1,
      wrap = obj.wrap || false,
      pauseTime = obj.pauseTime || 0,
      initialDelay = obj.initialDelay || 0,
      endDelay = obj.endDelay || 0,
      delay,
      end,
      wrapAroundCoord,
      positions = {
        'left': {
          'wrap': {
            'wrapPoint': 0
          },
          'none': {
            'wrapPoint': -buffer[0].length
          },
          'wrapAround': totCols - 1,
          'func': changeColOffset,
          'step': -1
        },
        'right': {
          'wrap': {
            'wrapPoint': buffer[0].length
          },
          'none': {
            'wrapPoint': totCols
          },
          'wrapAround': 0,
          'func': changeColOffset,
          'step': 1
        },
        'up': {
          'wrap': {
            'wrapPoint': 0
          },
          'none': {
            'wrapPoint': -totRows
          },
          'wrapAround': totRows - 1,
          'func': changeRowOffset,
          'step': -1
        },
        'down': {
          'wrap': {
            'wrapPoint': 0
          },
          'none': {
            'wrapPoint': totRows
          },
          'wrapAround': -totRows,
          'func': changeRowOffset,
          'step': 1
        }
      };

    //get condition string used to access positions object property
    switch (wrap) {
      case true:
        condition = 'wrap';
        break;
      default:
        condition = 'none';
        break;
    }

    end = positions[dir][condition].wrapPoint;
    wrapAroundCoord = positions[dir].wrapAround;
    //scrollInc = positions[dir].func(positions[dir].step);

    //Set's the global wrapping variables to true or false
    setWrapGlobal(dir, wrap);

    //Repeated actions to peform scroll
    function doScroll() {
      //Prevents scrolling after repetitions limit reached.
      //Negative numbers allow inifinte scroll
      if (counter >= repetitions && repetitions > 0) {
        return window.setTimeout(function() {
          deferred.resolve();}, endDelay);
      }

      //If the wrap point is reached, reset offset to opposite side.
      if (dir === 'left' || dir === 'right') {
        if (colOffset === end) {
          colOffset = wrapAroundCoord;
        } else {
          colOffset += positions[dir].step;
        }
      } else if (dir === 'up' || dir === 'down') {
        if (rowOffset === end) {
          rowOffset = wrapAroundCoord;
        } else {
          rowOffset += positions[dir].step;
        }
      }

      //if scroll has reached starting point incrememnt the counter and
      //delay for pauseTime, otherwise continue at scrolling speed.
      if (startRow === rowOffset && startCol === colOffset) {
        counter++;
        if (counter > 0) {
          delay = pauseTime > scrollSpeed ? pauseTime : scrollSpeed;
        }
      } else {
        delay = scrollSpeed;
      }
      drawDisplay(buffer);
      scrollTimer = window.setTimeout(doScroll, delay);
    }

    //start scrolling after initial delay
    scrollTimer = window.setTimeout(doScroll, initialDelay);

    return deferred;
  }

  //The 'mask' array is used for wipe effects. The following functions are
  //used for setting rows, cols, a range of cols, or the entire mask.
  //The state can be 1 or 0.  1 is transparent.
  function setMaskRow(rowIndex, state) {
    if (mask[rowIndex]) {
      mask[rowIndex] = mask[rowIndex].map(function() {
        return state;
      });
    }
  }

  function setMaskCol(colIndex, state) {
    mask = mask.map(function(row) {
      return row.map(function(currState, ind) {
        if (ind === colIndex) {
          return state;
        } else {
          return currState;
        }
      });
    });
  }

  function setMaskRangeByCols(startCol, endCol, state) {
    mask = mask.map(function(row) {
      return row.map(function(currState, colInd) {
        if (colInd >= startCol && colInd <= endCol) {
          return state;
        } else {
          return currState;
        }
      });
    });
  }

  function setMaskTo(state) {
    setMaskRangeByCols(0, mask[0].length - 1, state);
  }


  //Wipe effect can be 'left', 'right', 'up', or 'down', and you can
  //wipe 'in' or 'out'.  Speed is set by global 'effectSpeed'
  function wipe(dir, inOrOut) {
    var deferred = $.Deferred(),
        effectLength,
        totRowCol,
        lengthLED,
        startPos,
        step,
        masker,
        wipeInfo = {
          'left': {
            'startRef': buffer[0].length - 1,
            'maskFunc': setMaskCol,
            'stepAmount': -1
          },
          'right': {
            'startRef': 0,
            'maskFunc': setMaskCol,
            'stepAmount': 1
          },
          'up': {
            'startRef': totRows - 1,
            'maskFunc': setMaskRow,
            'stepAmount': -1
          },
          'down': {
            'startRef': 0,
            'maskFunc': setMaskRow,
            'stepAmount': 1
          }
        };

    function changeStep(delta) {
      return step += delta;
    }

    switch (dir) {
      case 'right':
      case 'left':
        totRowCol = totCols - 1;
        lengthLED = buffer[0].length;
        break;
      case 'up':
      case 'down':
        totRowCol = totRows - 1;
        lengthLED = buffer.length;
        break;
    }

    if (scrollSpeed > effectSpeed) {
      effectLength = lengthLED;
    } else {
      //Determine what part of the buffer will be visible during effect,
      //LED display length is fine if not scrolling, but if scrolling need
      //to take into account the scroll speed.  10% is added for good measure.
      effectLength = Math.min(lengthLED,
        Math.floor((totRowCol / (1 - (scrollSpeed / effectSpeed))) * 1.1));
    }

    startPos = wipeInfo[dir].startRef;
    step = startPos;

    //Set the state of the nonvisible portion of the mask
    if (inOrOut === 'in' && (dir === 'left' || dir === 'right')) {
      setMaskRangeByCols(effectLength, mask[0].length, 1);
    } else if (inOrOut === 'out' && (dir === 'left' || dir === 'right')) {
      setMaskRangeByCols(effectLength, mask[0].length, 0);
    }

    switch (inOrOut) {
      case 'in':
        masker = 1;
        setMaskTo(0);
        break;
      case 'out':
        masker = 0;
        break;
    }

    (function wiper(maskFunc, stepAmount) {
      maskFunc(step, masker);
      changeStep(stepAmount);

      drawDisplay(buffer);

      if (((dir === 'left' || dir === 'up') && step < 0) ||
        ((dir === 'right' || dir === 'down') && step > effectLength)) {
        return deferred.resolve();
      }

      effectTimer = window.setTimeout(wiper, effectSpeed, maskFunc, stepAmount);

    }(wipeInfo[dir].maskFunc, wipeInfo[dir].stepAmount));

    return deferred;
  }

  //button assignments
  function buttons() {
    //clock face
    $action.click(function() {
      if(running === false && paused === false){
        clearTimers();
        $action.html('Click to Pause');
        startPomo('left', 5000);
      } else if (running === true && paused === false) {
        paused = true;
        clearTimers();
        $action.html('Click to Resume');
        pause(timeString(clockState.time));
        running = false;
      } else {
        $action.html('Click to Pause');
        resume(clockState);
      }

    });

    function changeNum(elem, amount) {
      var $el = elem,
          original = parseInt($el.html()),
          newVal = original + amount;

      if (newVal >= 0) {
        $el.html(newVal);
      }

    }

    $pomoDec.click(function() {
      changeNum($pomoTime, -1);
      if (running === false) {
        displayString(timeString(getPomoTime('session')));
      }
    });

    $pomoInc.click(function() {
      changeNum($pomoTime, 1);
      if (running === false) {
        displayString(timeString(getPomoTime('session')));
      }
     });

    $breakDec.click(function() {
      changeNum($breakTime, -1);
    });

    $breakInc.click(function() {
      changeNum($breakTime, 1);
    });
  }

  //Initial sequence of events
  function waitToStart() {
    var el = $clock,
        displayQueue = [];

    function dq() {
      el.dequeue('anim');
    }

    displayQueue = [
      [function(){
        setString(center('Pomodoro'));
        dq();
      }, 2000],
      [function(){
        wipe('up', 'in').then(dq);
      }],
      [function(){
        scroll({
            'dir': 'left',
            'repetitions': 1,
            'wrap': true,
            'endDelay': 1500
          }).then(dq);
      }],
      [function(){
        clearTimeout(scrollTimer);
        displayString(center(timeString(getPomoTime('session'))));
        wipe('left', 'in').then(function() {
          running = false;
          dq();
        });

      }]
    ];

    function doQueue(queue) {
      queue.forEach(function(block) {
        el.queue('anim', block[0]).delay(block[1] || 0);
      });
      el.dequeue('anim');
    }

    doQueue(displayQueue);
  }

  function initialize() {
    buttons();
    //create buffer and mask array structure
    buffer = subArrays(totRows);
    mask = subArrays(totRows);

    if( $(window).width() <= 350){
      $('.light').css({
        'width': '2px',
        'height': '2px'
      });
    }
    waitToStart();
  }

  //Let's Do This!
  initialize();
});

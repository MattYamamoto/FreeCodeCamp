$(document).ready(function() {
  var $keyButtons = $('.key-button'),
    $keyText = $('.key-text'),
    $keyAlt1Text = $('.key-alt-text-1'),
    $keyAlt2Text = $('.key-alt-text-2'),
    $screenNum = $('.line-number'),
    $screenContent = $('.content'),
    $headerRow1 = $('#header-row1 .screen-header-content'),
    $headerRow1Right = $('#header-row1 .screen-header-right'),
    $headerRow2 = $('#header-row2 .screen-header-content'),
    $headerRow2Right = $('#header-row2 .screen-header-right'),
    $display = $('.screen-main-display-container'),
    altBtnState = '',
    cancelKey = 'k38',
    inputLine = false,
    inputMode = 'dec',
    cursorPosition = 0,
    maxLineChars = 18,
    maxDispDigits = 9,
    menu,
    mode = 'deg',
    menuSlots = 6,  // number of menu spaces on screen
    defaultLineNums = ["1:", "2:", "3:", "4:", "5:"],
    reDec = new RegExp(/^([\-\+]?)([\d]*)(\.?)([\d]*)([Ee][\d]+)?$/),
    keyState = 0, //0 is main, 1 is alt1, 2 is alt2
    keyMap,
    keyboardKeyMap = {
      '0': 'k39',
      '1': 'k34',
      '2': 'k35',
      '3': 'k36',
      '4': 'k29',
      '5': 'k30',
      '6': 'k31',
      '7': 'k24',
      '8': 'k25',
      '9': 'k26',
      '.': 'k40',
      'Enter': 'k18',
      '+': 'k42',
      '-': 'k37',
      '*': 'k32',
      '\/': 'k27',
      'e': 'k41',
      'E': 'k41',
      'Backspace': 'k22',
      'Delete': 'k21',
      'ArrowLeft': 'k15',
      'ArrowRight': 'k17',
      'ArrowUp': 'k10',
      'ArrowDown': 'k16',
      'Escape': 'k38'
    },
    screenStack = {
      lineNumbers: defaultLineNums.slice(),
      lineContents: []
    };

  /**
    *
    *Initialization and Setup Functions
    *
  */

  //setKeys function maps text onto appropriate key.
  function setKeys() {
    //set text for each key
    $keyText.each(function(ind) {
      $(this).html(keyMap["k" + ind].main.text || "~k" + ind + "~");
    });

    //set alt1 text for each key
    $keyAlt1Text.each(function(ind) {
      var offset = ind + 6; //compensate for 6 top keys w/o alt text
      $(this).html(keyMap["k" + offset].alt1.text);
    });

    //set alt2 text for each key
    $keyAlt2Text.each(function(ind) {
      var offset = ind + 6; //compensate for 6 top keys w/o alt text
      $(this).html(keyMap["k" + offset].alt2.text);
    });

    //set Cancel key (overrides key's native main func)
    //should be bottom row key or text will interfere
    $('#' + cancelKey).parent().append('<div id="cancel">Cancel</div>');
    keyMap[cancelKey].main.func = clearInputLine;
  }

  // set the keyMap object.  This is in a function so that other objects
  // which may be needed can be instantiated first.
  function setKeyMap() {
    keyMap = {
      "k0": {
        "main": {
          "text": " ",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k1": {
        "main": {
          "text": " ",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k2": {
        "main": {
          "text": " ",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k3": {
        "main": {
          "text": " ",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k4": {
        "main": {
          "text": " ",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k5": {
        "main": {
          "text": " ",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k6": {
        "main": {
          "text": "Main",
          "val": "main",
          "func": menu.goToMenu
        },
        "alt1": {
          "text": "A",
          "val": "A",
          "func": numClick
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k7": {
        "main": {
          "text": "sin",
          "val": "",
          "func": sinKey
        },
        "alt1": {
          "text": "B",
          "val": "B",
          "func": numClick
        },
        "alt2": {
          "text": "asin",
          "val": "",
          "func": asinKey
        }
      },
      "k8": {
        "main": {
          "text": "cos",
          "val": "",
          "func": cosKey
        },
        "alt1": {
          "text": "C",
          "val": "C",
          "func": numClick
        },
        "alt2": {
          "text": "acos",
          "val": "",
          "func": acosKey
        }
      },
      "k9": {
        "main": {
          "text": "tan",
          "val": "",
          "func": tanKey
        },
        "alt1": {
          "text": "D",
          "val": "D",
          "func": numClick
        },
        "alt2": {
          "text": "atan",
          "val": "",
          "func": atanKey
        }
      },
      "k10": {
        "main": {
          "text": "<i class='fa fa-chevron-up'></i>",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "E",
          "val": "E",
          "func": numClick
        },
        "alt2": {
          "text": "Up",
          "val": "",
          "func": menu.goToPrevMenu
        }
      },
      "k11": {
        "main": {
          "text": "Next",
          "val": "",
          "func": nextMenu
        },
        "alt1": {
          "text": "F",
          "val": "F",
          "func": numClick
        },
        "alt2": {
          "text": "Prev",
          "val": "",
          "func": ""
        }
      },
      "k12": {
        "main": {
          "text": "&radic;x",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "<span class='math'>x<sup>2</sup></span>",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "<span class='math'><sup>x</sup>&radic;y</span>",
          "val": "",
          "func": ""
        }
      },
      "k13": {
        "main": {
          "text": "y<sup>x</sup>",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "<span class='math'>10<sup>x</sup></span>",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "log",
          "val": "",
          "func": ""
        }
      },
      "k14": {
        "main": {
          "text": "1/x",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "<span class='math'>e<sup>x</sup></span>",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "ln",
          "val": "",
          "func": ""
        }
      },
      "k15": {
        "main": {
          "text": "<i class='fa fa-chevron-left'></i>",
          "val": "",
          "func": cursorLeft
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k16": {
        "main": {
          "text": "<i class='fa fa-chevron-down'></i>",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k17": {
        "main": {
          "text": "<i class='fa fa-chevron-right'></i>",
          "val": "",
          "func": cursorRight
        },
        "alt1": {
          "text": "Swap",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k18": {
        "main": {
          "text": "ENTER",
          "val": "",
          "func": enterKey
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k19": {
        "main": {
          "text": "&pi;",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k20": {
        "main": {
          "text": "mod",
          "val": "",
          "func": moduloKey
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k21": {
        "main": {
          "text": "DEL",
          "val": "",
          "func": clearStack
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k22": {
        "main": {
          "text": "<i class='fa fa-arrow-left'></i>",
          "val": "",
          "func": delInputChar
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k23": {
        "main": {
          "text": "+/-",
          "val": "",
          "func": toggleSign
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k24": {
        "main": {
          "text": "7",
          "val": 7,
          "func": numClick
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k25": {
        "main": {
          "text": "8",
          "val": 8,
          "func": numClick
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k26": {
        "main": {
          "text": "9",
          "val": 9,
          "func": numClick
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k27": {
        "main": {
          "text": "/",
          "val": "/",
          "func": divideKey
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k28": {
        "main": {
          "text": "<i class='fa fa-reply'></i>",
          "val": "alt1",
          "func": altBtn
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k29": {
        "main": {
          "text": "4",
          "val": 4,
          "func": numClick
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k30": {
        "main": {
          "text": "5",
          "val": 5,
          "func": numClick
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k31": {
        "main": {
          "text": "6",
          "val": 6,
          "func": numClick
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k32": {
        "main": {
          "text": "*",
          "val": "*",
          "func": MultiplyKey
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k33": {
        "main": {
          "text": "<i class='fa fa-share'></i>",
          "val": "alt2",
          "func": altBtn
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k34": {
        "main": {
          "text": "1",
          "val": 1,
          "func": numClick
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k35": {
        "main": {
          "text": "2",
          "val": 2,
          "func": numClick
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k36": {
        "main": {
          "text": "3",
          "val": 3,
          "func": numClick
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k37": {
        "main": {
          "text": "-",
          "val": "-",
          "func": subtractKey
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k38": {
        "main": {
          "text": "ON",
          "val": "",
          "func": ""
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k39": {
        "main": {
          "text": "0",
          "val": 0,
          "func": numClick
        },
        "alt1": {
          "text": "Test",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "Test2",
          "val": "",
          "func": ""
        }
      },
      "k40": {
        "main": {
          "text": ".",
          "val": ".",
          "func": numClick
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k41": {
        "main": {
          "text": "EE",
          "val": "E",
          "func": numClick
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      },
      "k42": {
        "main": {
          "text": "+",
          "val": "+",
          "func": addKey
        },
        "alt1": {
          "text": "",
          "val": "",
          "func": ""
        },
        "alt2": {
          "text": "",
          "val": "",
          "func": ""
        }
      }
    };

  }

  /**
    *
    *Screen Functions
    *
  */

  // function returns a copy of the input line with cursor at given position
  function insertCurosr(position) {
    var newLine;

    //verify we're on input line
    if(inputLine === true) {
      //check if input line is array of characters
      if(Array.isArray(screenStack.lineContents[0])) {
        //grab a copy of the input array
        newLine = screenStack.lineContents[0].slice();
      } else { //a string is displayed there, so make it an array.
        newLine = screenStack.lineContents[0].split("");
      }


      //splice in the cursor at the given position
      newLine.splice(position, 0, '<span class="cursor">|</span>');
    }

    return newLine;
  }

  // function to handle excessive characters on a line.
  function formatLine(contents) {
    var formattedLine,
        numExcessChars = contents.length - maxLineChars,
        type = typeof contents,
        startIndex = numExcessChars < 0 ? 0 : numExcessChars;

    if(numExcessChars > 0) {

      if(Array.isArray(contents)) {
        formattedLine = contents.slice();
      } else if(type === 'string') {
        formattedLine = contents.split("");
      }

      if(cursorPosition > startIndex){
        formattedLine.splice(0, contents.length - maxLineChars, "...");
      } else if(cursorPosition <= startIndex && cursorPosition > 1) {
        formattedLine = formattedLine.splice(cursorPosition, maxLineChars - 2);
        formattedLine.unshift("...");
        formattedLine.push("...");
      } else {
        formattedLine = formattedLine.splice(0, maxLineChars - 2);
        formattedLine.push("...");
      }

      if(type === 'string') {
        formattedLine.join("");
      }

    }

    return formattedLine || contents;

  }

  // Format numbers to fit maxDispDigits
  function screenNumberFormat(num) {
    var numLen,
        whole,
        wholeLen;

    // validate input is number, if not attempt conversion.
    if(num === undefined || isNaN(num)) { // if num is undefined should dispaly empty string
      return "";
    } else if(typeof num === 'string') {
      num = parseFloat(num);
    } else if(Array.isArray(num)) {
      num = parseFloat(num.join(""));
    }

    // number of chracters in num
    numLen = num.toString().length;
    whole = Math.floor(num);
    wholeLen = whole.toString().length;

    if(numLen > maxDispDigits) { //num is too large
      // whole number protion is too long then put in exponential form
      if(wholeLen > maxDispDigits ) {
        return num.toExponential(maxDispDigits);
      } else {  // decimals take up too  much room so display in fixed form
        return num.toFixed(maxDispDigits - wholeLen);
      }
    }

    return num;
  }


  // draw the screen
  function refreshScreen() {
    var nodeText = ['<div class="screen-main-display">'],
      j = 1,
      lineNum,
      content;

    // create html for each line
    for (var i = 4; i >= 0; i--) {
      lineNum = screenStack.lineNumbers[i];

      // check for input line and also verify that this is index 0
      // any other index would be anomalous
      if(inputLine === true && i === 0) {

        // insert the cursor and join the input array to be dispalyed as string
        content = formatLine(insertCurosr(cursorPosition)).join("");

        // opening line div tag needs 'input-line' class
        nodeText[j++] = '<div id="line' + i + '" class="line input-line">';
      } else {

        //grabe content from the screenStack object.
        content = screenNumberFormat(screenStack.lineContents[i]);

        // generic opeing line div tag.
        nodeText[j++] = '<div id="line' + i + '" class="line">';
      }

      nodeText[j++] = '<div class="line-number">';
      nodeText[j++] = lineNum;
      nodeText[j++] = '</div>';
      nodeText[j++] = '<div class="line-content">';
      nodeText[j++] = content;
      nodeText[j++] = '</div>';
      nodeText[j++] = '</div>';
    }

    //close screen-main-dispaly div
    nodeText[j++] = '</div>';

    //replace display with newly created html
    $display.empty().append(nodeText.join(""));

  }


  //Create a new input line
  function openInputLine(char) {
    inputLine = true;
    cursorPosition++;
    //new line is added to front of screenStack
    screenStack.lineNumbers.unshift(""); //has no line number
    screenStack.lineContents.unshift([char.toString()]);
    refreshScreen();
  }

  //Add characters to the input line text
  function concatInputChar(char) {
    screenStack.lineContents[0].splice(cursorPosition, 0, char.toString());
    cursorPosition++;
    refreshScreen();
  }

  //Remove characters from the input line
  function delInputChar() {
    if(cursorPosition > 0) {
      cursorPosition--;
      screenStack.lineContents[0].splice(cursorPosition, 1);
      refreshScreen();
    }
  }

  //Remove the inputLine and return what was there as a float
  function clearInputLine() {
    var input = [];
    //only clear first screenStack entries if current line is
    //an input line.
    if(screenStack.lineNumbers[0] === "") {
      input = screenStack.lineContents[0];
      screenStack.lineNumbers.shift();
      screenStack.lineContents.shift();
      inputLine = false;
      refreshScreen();
    }

    return parseFloat(input.join(""));
  }


  // function returns the content of a given line number.
  // line number corresponds to line number on screen.
  // If present, 0 represents input line
  function getLineContents(lineNum) {
    var contents;
    //if input line is present, screenStack.lineContents is indexed correctly
    if(inputLine === true) {
      contents = screenStack.lineContents[lineNum];
    } else {  //if no inptul line, screen line 1 lies at index 0;
      contents = screenStack.lineContents[lineNum - 1] || "";
    }

    return contents;
  }

  function getLineString(lineNum) {
    var str = getLineContents(lineNum);

    return Array.isArray(str) ? str.join("") : str;
  }

  function getLineFloat(lineNum) {
    return parseFloat(getLineString(lineNum));
  }

  function formatedParseFloat(str) {
    var num = parseFloat(str);
  }

  // function clears number of lines specified starting from the bottom of
  // the stack. This occurs irrespective of input line
  function clearLines(num) {
    // defalut to 1 if none specified.
    num = num || 1;

    // delete line conents and numbers for number of lines specified.
    for(var i = 0; i < num; i++) {
      screenStack.lineNumbers.shift();
      screenStack.lineContents.shift();
    }

    //maintain minimum of default line numbers
    if(screenStack.lineNumbers.length < defaultLineNums.length) {
      screenStack.lineNumbers = defaultLineNums.slice();
    }

    // in case was input line, set inputLine to false
    inputLine = false;
  }

  function addLineToStack(val) {
    //the next line number value
    var lineNum = screenStack.lineNumbers.length + 1;

    //prepend val to the screenStack.lineContents array
    screenStack.lineContents.unshift(val);

    //if another line number is needed, add it to the line numbers.
    if(screenStack.lineContents.length > screenStack.lineNumbers.length) {
      screenStack.lineNumbers.push(lineNum.toString(10) + ":");
    }
  }

  //Place content at a specific line.
  //0 is input line (which may not be visible)
  //If no input line is present, one will be created
  function placeAtLine(lineNum, val) {
    if(lineNum > 0) {
      screenStack.lineContents.splice(lineNum - 1 , 0, val);
    } else {

    }
  }




  /**
    *
    * Menu Functionality
    *
  */

  menu = (function() {
    var $keyOptionButtons = $('.key-option-button'),
        $menus = $('.menu'),
        slots = menuSlots,
        menuLength,
        mainMenu = 'main',
        menuState = [],
        page = 0,
        screenMenus = {
          main: {
            mode: {
              deg: degKey,
              rad: radKey,
              'd->r': degToRad,
              'r->d': radToDeg
            },
            men2: "",
            men3: "",
            men4: "",
            men5: "",
            men6: "",
            men7: ""
          }
        };

    // Draws appropriate menu text and menu button style
    function drawMenu(menuObj) {
      // get keys for menuObj.  These are the menu block labels
      var keys = Object.keys(menuObj);

      // iterate through the menu divs
      $menus.each(function(ind) {
        var key = keys[ind + (page * slots)];

        // if there's something to add to the menus
        if(key) {
          // set the menu html to the key text for each menu
          $(this).html(key);

          // check if this key's property is an object.  If so, this is a menu
          // otherwise it is an action button.
          if(typeof menuObj[key] === 'object') {
            $(this).addClass('menu-folder');
          } else {
            $(this).removeClass('menu-folder');
          }
        } else {  // else ensure the menu space is empty
          $(this).html('');
        }

      });



      menuLength = keys.length;
    }

    function getCurrMenuObj() {
      return menuState.reduce(function(prev, curr) {
        return prev[curr];
      }, screenMenus);
    }

    function nextMenu() {
      if(menuLength > slots) {
        page = ++page % ((menuLength % slots) + 1);
        drawMenu(getCurrMenuObj());
      }
    }

    // navigate to top level menu
    function goToMenu(name) {
      menuState = [name];
      $headerRow2.html(menuState.join(' -> '));
      drawMenu(getCurrMenuObj());
    }

    // Draws submenu by name relative to the current menu object
    function goToSubMenu(name) {
      menuState.push(name);
      $headerRow2.html(menuState.join(' -> '));
      drawMenu(getCurrMenuObj());
    }

    function goToPrevMenu() {
      if(menuState.length > 1){
        menuState.pop();
        $headerRow2.html(menuState.join(' -> '));
        drawMenu(getCurrMenuObj());
      }
    }

    // handle clicks to option buttons
    $keyOptionButtons.click(function() {
      var index = $keyOptionButtons.index(this),
          name = $menus.eq(index).text(),
          currMenu = getCurrMenuObj();

      if(typeof currMenu[name] === 'object') {  // if button is submenu
        goToSubMenu(name);  // the go to subment
      } else if (typeof currMenu[name] === 'function') {
        console.log('here');
        currMenu[name]();  // if button is an action/function, run it.
      }

    });

    // initialize the menus
    function init() {
      goToMenu(mainMenu);
    }

    // return the menu object for public reference
    return {
      init: init,
      nextMenu: nextMenu,
      subMenu: goToSubMenu,
      goToMenu: goToMenu,
      goToPrevMenu: goToPrevMenu
    };


  })();



  /**
    *Calculation/Operation functions
    *These are assigned to keys in the keyMap object
    *
  */

  //
  //Basic Calculator functionality
  //

  //handle any character that needs to be added to input line
  function numClick(char) {
    //check that we have an input line (a line with no line number)
    //otherwise assume input and concat to what's there
    if (screenStack.lineNumbers[0] !== "") {
      openInputLine(char);
    } else {
      concatInputChar(char);
    }

  }

  // Take content and return a string with toggled sign
  function changeSign(lineContent) {

    if(inputLine) { // if on input line handle the array of chars
      // get a string from array of chars
      lineContent = lineContent.join("");

      if(lineContent.charAt(0) === '+') { //if + make it -
          lineContent = '-' + lineContent.substring(1);
      } else if(lineContent.charAt(0) === '-') { //if - make it +
          lineContent = '+' + lineContent.substring(1);
      } else {  //else number is implied positive, make it -
          lineContent = '-' + lineContent;
          cursorPosition++;
      }
    } else {
      // other lines contain number, so invert sign
      lineContent *= -1;
    }

    // If on input line return an array of chars, else the new number
    return inputLine ? lineContent.split("") : lineContent;
  }

  //toggle sign of active line
  function toggleSign() {
    var lineNum = inputLine ? 0 : 1;

    //replace first line of screen with signed version
    screenStack.lineContents[0] = changeSign(getLineContents(lineNum));
    refreshScreen();
  }

  //validate the syntax of string number for a give mode.
  //  mode: 'dec', 'bin', 'hex'
  function validateSyntax(str, mode) {

    switch(mode) {
      case 'dec':
        return reDec.test(str);
    }

  }

  function enterKey() {
    var val = "";

    if(inputLine === true) {
      val = getLineString(0);
      if(validateSyntax(val, inputMode)) {
        addLineToStack(clearInputLine());
      } else {
        console.log('Error');
      }

    } else {
      val = screenStack.lineContents[0];
      placeAtLine(1, val);
    }

    refreshScreen();
  }

  //Clear the screen stack and reset the line numbers
  function clearStack() {
    //enforce clearing of stack only when input line not present.
    if(inputLine === false) {
      screenStack.lineContents = [];
      screenStack.lineNumbers = defaultLineNums.slice();
      refreshScreen();
    }
  }

  // display syntax error message in the header.
  function operationSyntaxErr() {
    $headerRow1Right.html("SYNTAX ERROR");
  }

  function clearOperationSyntaxErr() {
    $headerRow1Right.html("");
  }

  // checks the elements of an array and returns false if any are
  // the falsy values used.
  function checkForArgs(arr) {
    return !(arr.some(function(arg) {
      if(arg === undefined || arg === '' || isNaN(arg) || arg === null) {
        return true;
      }
    }));
  }

  // function returs an array of 'num' arguments from the stack in decending
  // order, irrespecitve of the precesnce of the input Line.
  function getFirstLines(num) {
    var arr = [],
        firstLine = 1;  // starting line

    if(inputLine === true) {
      firstLine = 0;  // if on inputline, start with line 0
      num = num - 1;  // adjust num to compensate from starting at zero
    }

    for(var i = firstLine; i <= num; i++ ) {
      if(i === 0) {
        arr.push(parseFloat(getLineString(0))); // handle input line
      } else {
        arr.push(getLineContents(i));
      }
    }

    // check for valid arguments.
    if(checkForArgs(arr)) {
      // return reveresed array so arguemnts are in decending stack order.
      return arr.reverse();
    } else {
      operationSyntaxErr();
      return false;
    }


  }

  // clears the number of lines specfied and replaces with the rslt.
  function stackOperation(numLinesInOperation, callback) {
    var argsArray = getFirstLines(numLinesInOperation);

    if(argsArray) {
      clearLines(numLinesInOperation);
      addLineToStack(callback.apply(this, argsArray));
    }
    refreshScreen();
  }

  function add(num1, num2) {
    return num1 + num2;
  }

  function addKey() {
    stackOperation(2, add.apply(this, getFirstLines(2)));
  }

  function subtract(num1, num2) {
    return num1 - num2;
  }

  function subtractKey() {
    stackOperation(2, subtract.apply(this, getFirstLines(2)));
  }

  function multiply(num1, num2) {
    return num1 * num2;
  }

  function MultiplyKey() {
    stackOperation(2, multiply.apply(this, getFirstLines(2)));
  }

  function divide(num1, num2) {
    return num1 / num2;
  }

  function divideKey() {
    stackOperation(2, divide);
  }

  function modulo(num1, num2) {
    return num1 % num2;
  }

  function moduloKey() {
    stackOperation(2, modulo.apply(this, getFirstLines(2)));
  }

  //
  // Tirg functionality
  //

  function changeMode(angleMode) {
    if(mode === angleMode) {
      return;
    }

    mode = angleMode;
    if(mode === 'rad') {
      $headerRow1.html('rad');
    } else {
      $headerRow1.html('');
    }
  }

  function degKey() {
    changeMode('deg');
  }

  function radKey() {
    changeMode('rad');
  }

  function convertToRad(deg) {
    return deg * (Math.PI / 180);
  }

  function convertToDeg(rad) {
    return rad * (180 / Math.PI);
  }

  function degToRad() {
    stackOperation(1, convertToRad(getFirstLines(1)));
  }

  function radToDeg() {
    stackOperation(1, convertToDeg(getFirstLines(1)));
  }

  function sinKey() {
    var num = getFirstLines(1)[0];

    if(mode === 'deg') {
       stackOperation(1, Math.sin(convertToRad(num)));
    } else if(mode === 'rad') {
      stackOperation(1, Math.sin(num) );
    }
  }

  function cosKey() {
    var num = getFirstLines(1)[0];

    if(mode === 'deg') {
       stackOperation(1, Math.cos(convertToRad(num)));
    } else if(mode === 'rad') {
      stackOperation(1, Math.cos(num) );
    }
  }

  function tanKey() {
    var num = getFirstLines(1)[0];

    if(mode === 'deg') {
       stackOperation(1, Math.tan(convertToRad(num)));
    } else if(mode === 'rad') {
      stackOperation(1, Math.tan(num) );
    }
  }

  function asinKey() {
    var num = getFirstLines(1)[0];

    if(mode === 'deg') {
       stackOperation(1, convertToDeg(Math.asin(num)));
    } else if(mode === 'rad') {
      stackOperation(1, Math.asin(num) );
    }
  }

  function acosKey() {
    var num = getFirstLines(1)[0];

    if(mode === 'deg') {
       stackOperation(1,convertToDeg(Math.acos(num)));
    } else if(mode === 'rad') {
      stackOperation(1, Math.cos(num) );
    }
  }

  function atanKey() {
    var num = getFirstLines(1)[0];

    if(mode === 'deg') {
       stackOperation(1, convertToDeg(Math.atan(num)));
    } else if(mode === 'rad') {
      stackOperation(1, Math.tan(num) );
    }
  }




  //
  // Non-math related buttons
  //

  function cursorLeft() {
    if(cursorPosition > 0 && inputLine === true) {
      cursorPosition--;
      refreshScreen();
    }
  }

  function cursorRight() {
    if(cursorPosition < screenStack.lineContents[0].length &&
       inputLine === true) {
      cursorPosition++;
      refreshScreen();
    }
  }

  function setAltBtnState(type) {
    var btnText = {
      alt1: "<i class='fa fa-reply'></i>",
      alt2:  "<i class='fa fa-share'></i>"
    };

    altBtnState = type;
    if(type !== '') {
      $headerRow2Right.html(btnText[type]);
    } else {
      $headerRow2Right.html('');
    }
  }

  function altBtn(name) {
    if(altBtnState === name) {
      setAltBtnState('');
    } else {
      setAltBtnState(name);
    }
  }

  function nextMenu() {
    menu.nextMenu();
  }

  /**
    *
    *Event bindings
    *
  */

  $keyButtons.click(function() {
    var key = $(this).attr('id'),
        func;

    //  clear any operation syntax error on screeen.
    clearOperationSyntaxErr();

    switch(altBtnState) {
      case 'alt1':
        func = keyMap[key].alt1.func;
        setAltBtnState('');
        break;

      case 'alt2':
        func = keyMap[key].alt2.func;
        setAltBtnState('');
        break;

      default:
        func = keyMap[key].main.func;
        break;
    }

    if(func) {
      func(keyMap[key].main.val);
    }

  });

  // physicsal keyboard button bindings
  $('body').keydown(function(e){
    var key,
        func,
        val;
    // check that key is used
    if(keyboardKeyMap[e.key]) {
      e.preventDefault();
      key = keyboardKeyMap[e.key];  // get corresponding calc key
      func = keyMap[key].main.func;  // get calc key function
      val = keyMap[key].main.val;  // get calc key value

      func(val);  //run calc key function
    }

  });
/*

*/
  /**
    *
    *Lets' Go!: Initialize the calculator
    *
  */
  (function initialize() {
    menu.init();  // initialize the menu first so that methods are available.
    setKeyMap();
    setKeys();
    refreshScreen();
  })();


});

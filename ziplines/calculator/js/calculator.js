$(document).ready(function() {
  var $$screenLines = {},
      $$keys = {},
      keyMap = {
        "k0": {
          "main": " ",
          "alt1": "",
          "alt2": ""
        },
        "k1": {
          "main": " ",
          "alt1": "",
          "alt2": ""
        },
        "k2": {
          "main": " ",
          "alt1": "",
          "alt2": ""
        },
        "k3": {
          "main": " ",
          "alt1": "",
          "alt2": ""
        },
        "k4": {
          "main": " ",
          "alt1": "",
          "alt2": ""
        },
        "k5": {
          "main": " ",
          "alt1": "",
          "alt2": ""
        },
        "k6": {
          "main": "",
          "alt1": "",
          "alt2": ""
        },
        "k7": {
          "main": "",
          "alt1": "",
          "alt2": ""
        },
        "k8": {
          "main": "",
          "alt1": "",
          "alt2": ""
        },
        "k9": {
          "main": "",
          "alt1": "",
          "alt2": ""
        },
        "k10": {
          "main": "<i class='fa fa-arrow-up'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k11": {
          "main": "Next",
          "alt1": "",
          "alt2": ""
        },
        "k12": {
          "main": "",
          "alt1": "",
          "alt2": ""
        },
        "k13": {
          "main": "",
          "alt1": "",
          "alt2": ""
        },
        "k14": {
          "main": "",
          "alt1": "",
          "alt2": ""
        },
        "k15": {
          "main": "<i class='fa fa-arrow-left'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k16": {
          "main": "<i class='fa fa-arrow-down'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k17": {
          "main": "<i class='fa fa-arrow-right'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k18": {
          "main": "A",
          "alt1": "",
          "alt2": ""
        },
        "k19": {
          "main": "B",
          "alt1": "",
          "alt2": ""
        },
        "k20": {
          "main": "C",
          "alt1": "",
          "alt2": ""
        },
        "k21": {
          "main": "D",
          "alt1": "",
          "alt2": ""
        },
        "k22": {
          "main": "E",
          "alt1": "",
          "alt2": ""
        },
        "k23": {
          "main": "F",
          "alt1": "",
          "alt2": ""
        },
        "k24": {
          "main": "",
          "alt1": "",
          "alt2": ""
        },
        "k25": {
          "main": "7",
          "alt1": "",
          "alt2": ""
        },
        "k26": {
          "main": "8",
          "alt1": "",
          "alt2": ""
        },
        "k27": {
          "main": "9",
          "alt1": "",
          "alt2": ""
        },
        "k28": {
          "main": "-",
          "alt1": "",
          "alt2": ""
        },
        "k29": {
          "main": "<i class='fa fa-reply'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k30": {
          "main": "4",
          "alt1": "",
          "alt2": ""
        },
        "k31": {
          "main": "5",
          "alt1": "",
          "alt2": ""
        },
        "k32": {
          "main": "6",
          "alt1": "",
          "alt2": ""
        },
        "k33": {
          "main": "+",
          "alt1": "",
          "alt2": ""
        },
        "k34": {
          "main": "<i class='fa fa-share'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k35": {
          "main": "1",
          "alt1": "",
          "alt2": ""
        },
        "k36": {
          "main": "2",
          "alt1": "",
          "alt2": ""
        },
        "k37": {
          "main": "3",
          "alt1": "",
          "alt2": ""
        },
        "k38": {
          "main": "-",
          "alt1": "",
          "alt2": ""
        },
        "k39": {
          "main": "+/-",
          "alt1": "",
          "alt2": ""
        },
        "k40": {
          "main": "0",
          "alt1": "Test",
          "alt2": "Test2"
        },
        "k41": {
          "main": ".",
          "alt1": "",
          "alt2": ""
        },
        "k42": {
          "main": "Enter",
          "alt1": "",
          "alt2": ""
        },
        "k43": {
          "main": "+",
          "alt1": "",
          "alt2": ""
        }
      },
      screenStack = {
        lineNumbers: ["1:", "2:", "3:", "4:", "5:"],
        lineContents: []
      };

  //
  function getSelectors() {
    //For each 'line' on the screen create an object storing
    //the line Number element and the line content element
    //places those in the screenLines object by ID
    $('.line').each(function() {
      $$screenLines[$(this).attr('id')] = {
        "lineNum": $(this).find(".line-number"),
        "lineContent": $(this).find(".content")
      };
    });

    //for each 'key-button' on the keyboard create an object storing
    //it's container, the button itself, the text area of the button
    //as well as the text area of the alt keys.  Store this object
    //in the keys object by ID.
    $('.key-button').each(function() {
      $$keys[$(this).attr('id')] = {
        "container": $(this).parent(),
        "button": $(this),
        "text": $('.key-text', this),
        "alt1": $(this).parent().find(".key-alt-text-1"),
        "alt2": $(this).parent().find(".key-alt-text-2")
      };
    });


  }

  //setKeys function maps text onto appropriate key.
  function setKeys() {
    for(var key in $$keys) {
      if($$keys.hasOwnProperty(key)){
        $$keys[key].text.html(keyMap[key].main || "~" + key + "~"),
        $$keys[key].alt1.html(keyMap[key].alt1),
        $$keys[key].alt2.html(keyMap[key].alt2);
      }
    }
  }

  function drawScreen() {
    for(var i = 0; i < 5; i++) {
      $$screenLines["line" + i].lineNum.html(screenStack.lineNumbers[i]);
      $$screenLines["line" + i].lineContent.html(screenStack.lineContents[i]);
    }
  }

  
  //Initialize the calculator
  (function initialize() {
    getSelectors();
    setKeys();
    drawScreen();
  })();


});

$(document).ready(function() {
  var $keyButtons = $('.key-button'),
      $keyText = $('.key-text'),
      $keyAlt1Text = $(".key-alt-text-1"),
      $keyAlt2Text = $(".key-alt-text-2"),
      $screenNum = $('.line-number'),
      $screenContent = $('.content'),
      $display = $('.screen-main-display-container'),
      keyMap = {
        "k0": {
          "text": " ",
          "alt1": "",
          "alt2": ""
        },
        "k1": {
          "text": " ",
          "alt1": "",
          "alt2": ""
        },
        "k2": {
          "text": " ",
          "alt1": "",
          "alt2": ""
        },
        "k3": {
          "text": " ",
          "alt1": "",
          "alt2": ""
        },
        "k4": {
          "text": " ",
          "alt1": "",
          "alt2": ""
        },
        "k5": {
          "text": " ",
          "alt1": "",
          "alt2": ""
        },
        "k6": {
          "text": "",
          "alt1": "",
          "alt2": ""
        },
        "k7": {
          "text": "",
          "alt1": "",
          "alt2": ""
        },
        "k8": {
          "text": "",
          "alt1": "",
          "alt2": ""
        },
        "k9": {
          "text": "",
          "alt1": "",
          "alt2": ""
        },
        "k10": {
          "text": "<i class='fa fa-arrow-up'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k11": {
          "text": "Next",
          "alt1": "",
          "alt2": ""
        },
        "k12": {
          "text": "",
          "alt1": "",
          "alt2": ""
        },
        "k13": {
          "text": "",
          "alt1": "",
          "alt2": ""
        },
        "k14": {
          "text": "",
          "alt1": "",
          "alt2": ""
        },
        "k15": {
          "text": "<i class='fa fa-arrow-left'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k16": {
          "text": "<i class='fa fa-arrow-down'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k17": {
          "text": "<i class='fa fa-arrow-right'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k18": {
          "text": "A",
          "alt1": "",
          "alt2": ""
        },
        "k19": {
          "text": "B",
          "alt1": "",
          "alt2": ""
        },
        "k20": {
          "text": "C",
          "alt1": "",
          "alt2": ""
        },
        "k21": {
          "text": "D",
          "alt1": "",
          "alt2": ""
        },
        "k22": {
          "text": "E",
          "alt1": "",
          "alt2": ""
        },
        "k23": {
          "text": "F",
          "alt1": "",
          "alt2": ""
        },
        "k24": {
          "text": "",
          "alt1": "",
          "alt2": ""
        },
        "k25": {
          "text": "7",
          "alt1": "",
          "alt2": ""
        },
        "k26": {
          "text": "8",
          "alt1": "",
          "alt2": ""
        },
        "k27": {
          "text": "9",
          "alt1": "",
          "alt2": ""
        },
        "k28": {
          "text": "-",
          "alt1": "",
          "alt2": ""
        },
        "k29": {
          "text": "<i class='fa fa-reply'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k30": {
          "text": "4",
          "alt1": "",
          "alt2": ""
        },
        "k31": {
          "text": "5",
          "alt1": "",
          "alt2": ""
        },
        "k32": {
          "text": "6",
          "alt1": "",
          "alt2": ""
        },
        "k33": {
          "text": "+",
          "alt1": "",
          "alt2": ""
        },
        "k34": {
          "text": "<i class='fa fa-share'></i>",
          "alt1": "",
          "alt2": ""
        },
        "k35": {
          "text": "1",
          "alt1": "",
          "alt2": ""
        },
        "k36": {
          "text": "2",
          "alt1": "",
          "alt2": ""
        },
        "k37": {
          "text": "3",
          "alt1": "",
          "alt2": ""
        },
        "k38": {
          "text": "-",
          "alt1": "",
          "alt2": ""
        },
        "k39": {
          "text": "+/-",
          "alt1": "",
          "alt2": ""
        },
        "k40": {
          "text": "0",
          "alt1": "Test",
          "alt2": "Test2"
        },
        "k41": {
          "text": ".",
          "alt1": "",
          "alt2": ""
        },
        "k42": {
          "text": "Enter",
          "alt1": "",
          "alt2": ""
        },
        "k43": {
          "text": "+",
          "alt1": "",
          "alt2": ""
        }
      },
      screenStack = {
        lineNumbers: ["1:", "2:", "3:", "4:", "5:"],
        lineContents: []
      };

  //setKeys function maps text onto appropriate key.
  function setKeys() {
    //set text for each key
    $keyText.each(function(ind) {
      $(this).html(keyMap["k" + ind].text || "~k" + ind + "~");
    });

    //set alt1 text for each key
    $keyAlt1Text.each(function(ind) {
      var offset = ind + 6; //compensate for 6 top keys w/o alt text
      $(this).html(keyMap["k" + offset].alt1);
    });

    //set alt2 text for each key
    $keyAlt2Text.each(function(ind) {
      var offset = ind + 6; //compensate for 6 top keys w/o alt text
      $(this).html(keyMap["k" + offset].alt2);
    });
  }

  function drawScreen() {
    var node = $('<div class="screen-main-display"></div>'),
        lineNum,
        content;

    //create html for each line
    for(var i =0; i < 5; i++) {
      lineNum = screenStack.lineNumbers[i];
      content = screenStack.lineContents[i] || "";
      node.prepend('<div id="line' + i + '" class="line">' +
                      '<span class="line-number">' + lineNum + '</span>' +
                      '<span class="content">' + content + '</span>' +
                    '</div>');
    }

    //place new display html on the screen
    $display.empty().append(node);

  }

  $keyButtons.click(function() {


  });

  //Initialize the calculator
  (function initialize() {
    setKeys();
    drawScreen();
  })();


});

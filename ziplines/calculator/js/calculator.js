$(document).ready(function() {
  var $keyButtons = $('.key-button'),  //jQuery object holdeing all keys
    keyMap = {
      "k0": {
        "main": "",
        "alt1": "",
        "alt2": ""
      },
      "k1": {
        "main": "",
        "alt1": "",
        "alt2": ""
      },
      "k2": {
        "main": "",
        "alt1": "",
        "alt2": ""
      },
      "k3": {
        "main": "",
        "alt1": "",
        "alt2": ""
      },
      "k4": {
        "main": "",
        "alt1": "",
        "alt2": ""
      },
      "k5": {
        "main": "",
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
    };

  //setKeys function maps text onto appropriate key.
  function setKeys() {
    $keyButtons.each(function(ind) {
      var main = keyMap["k" + ind].main || "~" + ind + "~",
          alt1 = keyMap["k" + ind].alt1,
          alt2 = keyMap["k" + ind].alt2;

      $(this).parent().find(".key-alt-text-1").html(alt1);
      $(this).parent().find(".key-alt-text-2").html(alt2);
      $('.key-text', this).html(main);

    })
  }

  $keyButtons.mousedown(function() {});

  //Initialize the calculator
  (function initialize() {
    setKeys();
  })();


});

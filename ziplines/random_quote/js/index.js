$(document).ready(function() {
  var stringStack = [],
      displayCompleted = true,
      charDelay = 15,
      lineDelay = 1000,
      data, userName, quote, author, link,
      dosEl = $('.dos'),
      inputHistory = [],
      maxHistory = 10,
      initialSequence = [
        [displayString, ['Welcome', 'main'], 500],
        [displayString, ["I'm sorry, but I don't recognize you.", 'main'], 250],
        [displayString, ["What is your name?", 'main'], 0],
        [getName, '', 0],
        [displayString, ["If at any time you forget what I can do you can ask for help.", 'main'], 500],
        [displayString, ["Simply type help.", 'main'], 750],
        [displayString, ["I have a wonderful databse of interesting quotations.", 'main'], 500],
        [displayString, ["Would you like to hear one? Y/N", 'main'], 0],
        [initialQuote, '', 0],
        [steadyState, '', 0]
      ];

  //click anywhere in dos window brings focus to input box
  dosEl.click(function() {
    $('.userEntry').focus();
  });

  //add an input field and dynamically rezize it.
  function userInputField() {
    if (displayCompleted === true) {
      $('.current-line span:last-child').after('<input class="userEntry" type="text" name="input">');
    }
    
    $('.userEntry').keydown(function(event) {
      var keyPressed = event.keyCode;
      if (keyPressed === 8 || keyPressed === 46) {
        $(this).attr({
          width: 'auto',
          size: $(this).val().length
        });
      } else {
        $(this).attr({
          width: 'auto',
          size: $(this).val().length + 2
        });
      }
    });
    
    $('.userEntry').focus();
  }

  //If enter key is pressed, get the data user has typed and pass to callback
  //function.  Since input fields are generated dynamically, this fucntion unbinds the
  //the keyup handler before the callback, then, assuming that the callback generates a new
  //line with a new input field, rebinds the keyup handler to the new field.
  function getUseInput(callback) {
    var position = inputHistory.length,
        handler = function(e) {
          if (e.keyCode === 13) {
            $('body').unbind('keyup', handler);
            data = $('.userEntry').val();
            createNewLine(data);
            callback(data);
            
            //keep track of user input History
            if(inputHistory.length < maxHistory){
              inputHistory.push(data);
            } else {
              inputHistory.splice(0,1);
              inputHistory.push(data);
            }
          }
          
          //up arrow shows command line history towards past
          if(e.keyCode === 38){
            position--;
            if(position < 0){
              position = inputHistory.length - 1;
            }
            $('.userEntry').val(inputHistory[position]).keydown();
          }
    
        //down arrow shows command line history towards current
          if(e.keyCode === 40){
            position++;
            if(position > inputHistory.length - 1){
              position = 0;
            }
            $('.userEntry').val(inputHistory[position]).keydown();
          }
    };
    
    $('body').on('keyup', '.userEntry', handler);
  }
  
  

  //Remove the 'current' state from the current line, then add new line as 'current'
  //Then add an input field and bring it to focus.  Additionally, in order to let the user's
  //inputted text persisit,  you may pass the function text to append to the line you are 
  //leaving
  function createNewLine(lastLineTextAppend) {
    if (lastLineTextAppend !== undefined) {
      $('.current-output').append(lastLineTextAppend);
    }
    
    $('.current-line').removeClass('current-line');
    $('.current-output').removeClass('current-output');
    $('.userEntry').remove();
    dosEl.append('<div class="line current-line"><span class="output current-output">></span></div>');
    userInputField();
    $('.userEntry').focus();
  }
  
  //Delete the last line on the screen
  function deleteLastLine() {
    $('.line:last').remove();
  }

  //Clear all lines and leave a new line
  function deleteAllLines() {
      $('.line').remove();
      createNewLine();
    }

  //adds a string, str, to the queue, of name dQName, do be displayed
  //on the screen. Uses printFromStack to handle character output.  dequeueFlag
  //is set to 'false' if the function should not dequeue the current queue item
  //after display is completed.
  function displayString(str, dQName, dequeueFlag) {
    var strArray = str.split('');
    //input line is removed and each character in the strArray is pushed
    //into the stringStack array for printing to the screen.
    $('.userEntry').remove();
    $.each(strArray, function(ind, letter) {
      stringStack.push(letter);
    });
    //a 'break' is pushed after each string in order to handl the case
    //where display string may be called before previous call has finished
    //'break' acts as a keyword for the printFromStack function to start a new line.
    stringStack.push('break');
    if (displayCompleted === true) {
      printFromStack(dQName, dequeueFlag);
    }
  }
  
  //prints one character at a time from the stringStack array to the screen.
  //dQName and dequeueFlag are passed in (usually from the displayString function),
  //in order to dequeue the current queue process after completion.
  function printFromStack(dQName, dequeueFlag) {
    var typed,
        currentChar,
        containsLink,
        isLink;
        
    displayCompleted = false;
    //setTimeout used to add delay between characters
    typed = setTimeout(function() {
      //if there are characters in the stringStack, print and remove each char
      if (stringStack.length > 0) {
        currentChar = stringStack[0];
        stringStack.splice(0, 1);
        //As long as character is not 'break', add to html and call printFromStack for next character 
        if (currentChar !== 'break') {
          $('.current-output').html($('.current-output').html() + currentChar);
          printFromStack(dQName, dequeueFlag);
        } else { //if 'break' encountered, create new line, pause for line delay, then keep printing
          createNewLine();
          if (stringStack.length > 1) {
            setTimeout(function() {
              printFromStack(dQName, dequeueFlag);
            }, lineDelay);
          } else { //there is nothing after this 'break' to print, so no need to delay
            printFromStack(dQName, dequeueFlag);
          }
        }

      } else { //stringStack is empty so display is completed
        displayCompleted = true;
        
        //checks if output is web address starting with 'http', if so make it a link
        containsLink = $('.output:contains("http"):last');
        isLink = containsLink.text().slice(1);
        if(isLink.length > 0){
          containsLink.wrap('<a href="' + isLink + '" target="_blank"></a>');
        }
                
        userInputField();
        
        //dequeue this queue item unless dequeueFlag is false
        if (dequeueFlag !== false) {
          dosEl.dequeue(dQName);
        }
      }
      
      return;
    }, charDelay);
  }

  //Take an array of things to do, goDoArray, and execute them in order using queueing
  //in specific queue with name 'qName'
  //goDoArray elements should be formatted [function to run, [arguments], delay after]
  function execute(goDoArray, qName) {
    $.each(goDoArray, function(ind, command) {
      var func = command[0],
          delay = command[2],
          arg;
      
      //if 'arugments' is single item not in an array, place it in an array
      //since an array of arguments is expected.
      if (typeof command[1] !== 'object') {
        arg = [command[1]];
      } else {
        arg = command[1];
      }
      
      //queue is attached to the dos Element, 'dosEl'.  Function to add to the queue
      //of name 'qName' is added with given arguments and has delay added after queue
      //item is completed.
      dosEl.queue(qName, function() {
        func.apply(this, arg);
      }).delay(delay, qName);
    });
    
    //dequeue command begins the proccess of running queued functions.
    dosEl.dequeue(qName);
  }

  //get user's name and say hello
  function getName() {
    getUseInput(function(name) {
      userName = name;
      deleteAllLines();
      displayString("Hello " + userName, 'main');
    });
  }

  //initial sequence asking for quote is unique, this function handles
  //that situation
  function initialQuote() {
    //user was asked a yes/no question, get response
    getUseInput(function(data) {
      if (/^n$/i.test(data) || /^no$/i.test(data)) {
        deleteAllLines();
        displayString("In that case, I'll wait patiently until you need me.", false);
        setTimeout(function() {
          deleteAllLines();
          displayString('Standing by...', 'main');
        }, 1500);
      } else if (/^y$/i.test(data) || /^yes$/i.test(data)) {
        deleteAllLines();
        getQuote(function() {
          //since this is first quote retrieved, inform user of tweeting ability
          displayString(["If you would like to tweet this, please type tweet.  Otherwise,",
            "as I mentioned earlier, feel free to type help to see what else I can do for you."].join(' '));
        });

      } else { //user has entered something other than yes/no
        deleteAllLines();
        displayString("You didn't answer my question. Nevermind. What is it you want?", 'main');
      }
    });
  }

  //Retrieve a quote in JSON format and display the quote and author.
  function getQuote(callback) {
    var quoteQueue;
    
    $.getJSON("https://jsonp.afeld.me/?callback=?&url=http%3A%2F%2Fquotes.stormconsultancy.co.uk%2Frandom").
    done(function(request) {
      quote = request.quote;
      author = request.author;
      link = request.permalink;
      //operations to perform in order to display quote
      quoteQueue = [
        [displayString, [quote, 'quote'], 500],
        [displayString, ["A quotation from " + author, 'quote'], 100],
        [function() {
          createNewLine();
          if (callback !== undefined) {
            callback();
          }
        }, '', 0]
      ];
      //add the operations from 'quoteQueue' to the queue named 'quote'
      execute(quoteQueue, 'quote');
      //begin running queue
      dosEl.dequeue('main');
    });
  }

  
  //Tweeting a quote
  function tweet() {
    var url, 
        specialChars;
    
    //check that a quote has been retrieved
    if (quote) {
      //replace special chars with character code appropriate for url
      String.prototype.multiReplace = function(mapObj){
        var str = this;
        str = str.replace('%', '%25');
        function escapeRegExp(string){
          return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        for(var x in mapObj){
          if(mapObj.hasOwnProperty(x)) {
          	str = str.replace(new RegExp(escapeRegExp(x), 'g'), mapObj[x]);
          }
        }
        return str; 
      };
      specialChars = {';': '%3b', '+': '%2B', '#': '%23', '^': '%5E', 
                      '&': '%26', '{': '%7B', '}': '%7D','|': '%7C'};                
      quote = quote.multiReplace(specialChars);
      url = "https://twitter.com/intent/tweet?text=" + quote + " -" + author;
      
      //check that tweet length will be appropriate for twitter's 140 character limit,
      //if not, warn user and provide perma link to quote
      if (quote.length + author.length + 2 < 140) {
        $('.current-line').append('<a href="' + url + '" target="_blank" class="tweet"></a>');
        $('.tweet')[0].click();
        //window.open(url);  this didn't work on the iPhone, hence used two previous lines
      } else {
        displayString(["This quote will be too long for twitter, so you will have to",
          "edit it. I will provide a link back to the source for your followers. Standby. . ."].join(' '), false);
        setTimeout(function() {
          $('.current-line').append('<a href="' + url + " " + link + '" target="_blank" class="tweet"></a>');
          $('.tweet')[0].click();
          //window.open(url + " " + link);
        }, 3000);
      }
    } else {
      displayString("I'm sorry, I have nothing in my memory to tweet. Just ask me " +
          "for a quote if you would like one.", false);
    }
    
    //signal completion of current queue item by dequeueing
    dosEl.dequeue('main');
  }

  //Handles case, after all initial steps taken, to take user input
  function steadyState() {
    getUseInput(function(data) {
      var formatted,
          toDo,
          compound01 = "I'm sorry " + userName + ". I'm afraid I can't do that.",
          compound02 = userName + ", just what do you think you're doing? " +  
          "I'm not sure I understood that. Perhaps you should try again.",
          //all accepted user requests
          operations = {
            "quote": function() {
              getQuote();
            },
            "tweet": function() {
              tweet();
            },
            "get link": function() {
              displayString(link, 'main');
            },
            "clear": function() {
              deleteAllLines();
              dosEl.dequeue('main');
            },
            "change name": function() {
              displayString("What is your name?");
              getName();
            },
            "open pod bay doors": compound01,
            "sing": "Daisy, Daisy, give me your answer do. I'm half crazy all for the love " + 
              "of you. It won't be a stylish marriage, I can't afford a carriage. But you'll " +
              "look sweet upon the seat of a bicycle built for two.",
            "reset": function(){
            deleteAllLines();
            dosEl.clearQueue('main');
            execute(initialSequence, 'main');
          },
          "help": "quote, tweet, get link, clear, change name, open pod bay doors, sing, reset",
            "default": compound02
    };
      
      //handles cases where user enters no text
      if (data === undefined) {
        steadyState();
      } else if (data === "") {
        createNewLine();
      }
    
      //take user input, make lower case, and check against operations
      formatted = data.toLowerCase();
      toDo = operations[formatted];
      
      //if operation required is a string, display the resulting string or the default message
      if (typeof toDo === 'string' || typeof toDo === 'undefined') {
        dosEl.queue('main', function() {
          displayString(toDo || operations['default'], 'main');
          steadyState();
        }).dequeue('main');
      //else the required operations is a function, do that function
      } else if (typeof toDo === 'function') {
        dosEl.queue('main', function() {
          toDo();
        }).queue('main', function() {
          steadyState();
        }).dequeue('main');
      }
    
    });
  }

  //begin screen display starting with the initial sequence
  execute(initialSequence, 'main');
});
$(document).ready(function() {
  var accounts = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "comster404", "brunofin", "thomasballinger", "noobs2ninjas", "beohoff", "MedryBW"];
  var twitchData = {}
  var channels = [];

  //Show an error message if needed
  function reportError(str) {
    //Show error message to user
    $('.error_container').append(
      '<div class="error"> \
          <div class="error_message">' + str + '</div> \
          <div class="btn error_message_close"><i class="fa fa-times"></i>\
          </div>').slideDown();;
    //x button to clear error message.  Clears account/channel from 
    //the accounts array
    $('.error_message_close').click(function() {
      $(this).closest('div.error').slideUp('fast', function() {
        $(this).remove();
      });
      if ($('.error').length === 0) {
        $('.errors').slideUp();
      }
    });
  }

  //Display channel from a given user in list
  function channelDisplay(userName) {
    var logo, status, streamStatus, stream;
    //get the object for the provided userName from the channels Array
    var userObj = channels.filter(function(channel) {
      return channel.name === userName;
    })[0];
    //set user image, or placeholder if none
    if (userObj.logo === null) {
      logo = 'http://placehold.it/75x75';
    } else {
      logo = userObj.logo
    }

    //use channel description if exits AND channel is streaming
    if (userObj.status !== null && userObj.stream !== null) {
      status = '<span class="small">' + userObj.status + '</span>';
    } else {
      status = '';
    }

    //streaming status
    if (userObj.stream !== null) {
      streamStatus = 'online'
      stream = '<span class="streamIndicator"><i class="fa fa-circle on"></i></span>'
    } else {
      streamStatus = 'offline'
      stream = '<span class="streamIndicator"><i class="fa fa-circle off"></i></span>'
    }

    //append channel as li to ul in the list area
    $('.list ul').append('<li class="listing" streamstatus="' + streamStatus +
      '" channelname="' + userObj.name + '" visible="true"> \
      <div class="channel"> \
        <a href="' + userObj.url + '" target="_blank"> \
          <div>' + stream +
      '<img src=' + logo + ' alt="missing logo" class="img-circle" width=75px height=75px>' +
      '<div class="channelText"> \
              <h3>' + userObj.name + '</h3> \
              <p class="status">' + status + '</p> \
            </div> \
          </div> \
        </a> \
      </div> \
      <div class="btn channel-delete"><i class="fa fa-times"></i></div> \
    </li>');

    //show delete channel button on channel hover
    $('.listing').hover(function() {
          $('.channel-delete', this).show()
        },
        function() {
          $('.channel-delete', this).hide()
        })
      //delete button removes channel from display and removes from channels array
    $('.channel-delete').click(function() {
      var channelName = $(this).closest('.listing').attr('channelname').toLowerCase();
      var channelsPos = channels.map(function(stream) {
        return stream.name.toLowerCase();
      }).indexOf(channelName);
      if (channelsPos >= 0) {
        channels.splice(channelsPos, 1);
      }
      $(this).closest('.listing').remove();
    });

  }

  //Alphabetize listing
  function channelSort() {
    $('.list ul').append(
      $('.listing').sort(function(a, b) {
        return $(a).attr('channelname') > $(b).attr('channelname') ? 1 : -1;
      })
    );
  }

  //Get and display channel for a given userName
  function channelInfo(userName) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + userName + '?callback=?',
      function(stream) {
        //check for valid user
        if (stream.status !== 404) {
          $.getJSON(stream._links.channel + '?callback=?', function(channel) {
            channels.push({
              name: channel.display_name,
              logo: channel.logo,
              stream: stream.stream,
              status: channel.status,
              url: channel.url
            });
            channelDisplay(channel.display_name);
            channelSort();
          });
        } else {
          reportError("Sorry, " + userName + " doesn't seem to be a valid channel.");
        }
      });
  }

  //Header filter buttons
  //fucntion used for each button, specifiy what to hide by attribute
  function btnFilter(toHide) {
      $('.listing').show().attr('visible', true);
      $('.listing[streamstatus=' + toHide.data.hide + ']').hide().attr('visible', false);
      $('.menu').removeClass('btn-primary').addClass('btn-default')
      $(this).addClass('btn-primary').removeClass('btn-default');
      $('#searchBox').val('').keyup(); //clear search box every time filter state changes
    }
    //Buttons
  $('#btn-online').click({
    hide: 'offline'
  }, btnFilter);
  $('#btn-offline').click({
    hide: 'online'
  }, btnFilter);
  $('#btn-all').click({
    hide: 'none'
  }, btnFilter);

  //Search box filter
  $('#searchBox').keyup(function() {
    $('.listing[visible=true]').show();
    var regex = new RegExp($(this).val(), 'ig');

    //add a clear button to the end of search field if field has values
    if ($('#searchBox').val().length > 0) {
      $('#search-addon2').removeClass('clearSearch');
    } else {
      $('#search-addon2').addClass('clearSearch');
    }
    //clear the search field if clear button pressed
    $('#search-addon2').click(function() {
      $('#searchBox').val('').keyup();
    });
    //hide elements not macthing regex
    $('.listing[visible="true"]').filter(function() {
      return !regex.test($(this).attr("channelname"));
    }).hide();
  });

  //Add user field
  $('#channelAdd').keyup(function(event) {
    //unhide plus button at end of field if field is populated, otherwise keep hidden
    if ($('#channelAdd').val().length > 0) {
      if ($('#channel-addon2').hasClass('hide')) {
        $('#channel-addon2').removeClass('hide');
      }
      //if use is typing in the add user field, clear the search field
      if ($('#searchBox').val() !== '') {
        $('#searchBox').val('').keyup();
      }
    } else {
      $('#channel-addon2').addClass('hide');
    }
    //plus button attempts to add user
    $('#channel-addon2').unbind().click(function() {
      //check to see if user name is already present in channels array
      //if it isn't get channelInfo, if it is display an error
      var userName = $('#channelAdd').val().toLowerCase();
      var namesArr = channels.map(function(stream) {
        return stream.name.toLowerCase();
      });
      if (namesArr.indexOf(userName) < 0) {
        channelInfo(userName);
      } else {
        reportError($('#channelAdd').val() + ' is already on your list');
      }

      $('#channelAdd').val('').keyup();

    });
    //enter key triggers add user button press
    if ((event).keyCode === 13) {
      $('#channel-addon2').click();
    }

    //Add User suggestions: twitch doesn't offer user search, so this is a bit of a hack
    //using their channel search but only displays user names which are filtered
    //to match the input. So not all valid usernames will show suggestions
    //SuggestionList function generates html to display suggestions from array containing usernames
    function SuggestionList(arr) {
        $('#suggestion').empty();
        $.each(arr, function(ind, item) {
          $('#suggestion').append('<li>' + item + '</li>')
        })
      }
      //after 2 charters entered, query twitch, return array of usernames, display html
    if ($('#channelAdd').val().length > 2) {
      var suggestions = [];
      xhr = $.getJSON('https://api.twitch.tv/kraken/search/channels?callback=?&q=' +
        $('#channelAdd').val() + '&limit=5',
        function(searchObj) {
          suggestions = searchObj.channels.map(function(channel) {
            return channel.display_name;
          }).filter(function(name) {
            var re = new RegExp($('#channelAdd').val(), 'i');
            return re.test(name);
          });
          if (suggestions.length > 0) {
            $('#suggestion').append(SuggestionList(suggestions)).slideDown('fast');
            $('#suggestion li').click(function() {
              $('#channelAdd').val($(this).text());
            });
          }

        });
    } else {
      $('#suggestion').slideUp('fast');
    }

  });

  //initialize by getting data
  function intialize() {
    //get channel info place into channel array
    $.each(accounts, function(ind, account) {
      channelInfo(account);
    });
  }

  intialize();
});
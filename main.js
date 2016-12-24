/* jQuery(document).ready(function($) {
	// Find the right method, call on correct element
	function launchFullscreen(element) {
	    if (element.requestFullscreen) {
	        element.requestFullscreen();
	    } else if (element.mozRequestFullScreen) {
	        element.mozRequestFullScreen();
	    } else if (element.webkitRequestFullscreen) {
	        element.webkitRequestFullscreen();
	    } else if (element.msRequestFullscreen) {
	        element.msRequestFullscreen();
	    }
	}

	function exitFullscreen() {
	    if (document.exitFullscreen) {
	        document.exitFullscreen();
	    } else if (document.mozCancelFullScreen) {
	        document.mozCancelFullScreen();
	    } else if (document.webkitExitFullscreen) {
	        document.webkitExitFullscreen();
	    }
	}

	function dumpFullscreen() {
	    console.log("document.fullscreenElement is: ", document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
	    console.log("document.fullscreenEnabled is: ", document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled);
	}

	function startTimer() {
	    var regex = /\d{2}/g,
	        matches = getTimer.match(regex),
	        minutes = matches[0],
	        seconds = matches[1],
	        setTimer = new Date();

	    setTimer.setMinutes(minutes);
	    setTimer.setSeconds(seconds);

	    timer = setInterval(function () {
	        var totalMs = setTimer.getTime(),
	            minutes, seconds;

	        setTimer.setTime(totalMs - 1000);

	        minutes = setTimer.getMinutes();
	        seconds = setTimer.getSeconds();

	        if (minutes === 0 && seconds === 0) {
	            clearInterval(timer);
	            if (lastItem === true) {
	                $('#selection').text('All Done!');
	            } else {
	                newSelection();
	            }
	        }

	        $("#timer").text(
	        (minutes >= 10 ? minutes : "0" + minutes) + ":" + (seconds >= 10 ? seconds : "0" + seconds));

	    }, 1000);
	}

	function newSelection() {
	    //clearInterval(timer);
	    var selection = items.sort(function () {
	        return 0.5 - Math.random();
	    }).pop();

	    var instances = $.grep(items, function (elem) {
	        return elem === selection;
	    }).length;

	    $('#selection').text(selection);

	    if (instances > 0) {
	        $('#selection').append('<span>You have ' + instances + ' left.</span>');
	    } else {
	        $('#selection').append('<span>Last One</span>');
	    }

	    //$("#timer").text(getTimer);
	    // startTimer();
	    if (items.length === 0) {
	        lastItem = true;
	    }
	}

	var getTimer = $("#timer").text(),
	    items = new Array(),
	    lastItem = false,
	    timer;

	// Add items to list
	$('#list li').each(function () {
    var amount = $(this).data('amount'),
      i = 0,
      item = $(this).text();

    function addItem(name) {
      if (amount > i) {
        i++;
        items.push(name);
        addItem(name);
      }
    }

    addItem(item);
	});

	$('#start').click(function () {
	    launchFullscreen(document.documentElement);
	    newSelection();
	    $('#next').removeAttr('style');
	    $(this).remove();
	});

	$('#next').click(function () {
	    //clearInterval(timer);
	    if (lastItem === true) {
	        $('#selection').text('All Done!');
	        $('#controls').remove();
	    } else {
	        newSelection();
	    }
	});

});
*/

var app = new Vue({
	el: '#app',
  // app initial state
  data: {
    // todos: todoStorage.fetch(),
    // newTodo: '',
    // editedTodo: null,
    // visibility: 'all',

		message: 'Hello Randomizr!',

		people: [
      {
      	name: 'Kevin',
      	count: 2
      },
      {
      	name: 'Janet',
      	count: 3
      },
      {
      	name: 'John',
      	count: 1
      },
      {
      	name: 'Sarah',
      	count: 4
      },
      {
      	name: 'Tim',
      	count: 2
      },
      {
      	name: 'Karissa',
      	count: 3
      }

		]

		// shared: [
		// 	{
		// 		id: [ 8174, 1747 ],
		// 		count: 1
		// 	},
		// 	{
		// 		id: [ 8174, 2104 ],
		// 		count: 1
		// 	}
		// ]

  }
});

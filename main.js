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


/* jQuery(document).ready(function($) {

	function newSelection() {
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

	    if (items.length === 0) {
	        lastItem = true;
	    }
	}

	var items = new Array(),
	    lastItem = false;

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
	    if (lastItem === true) {
	        $('#selection').text('All Done!');
	        $('#controls').remove();
	    } else {
	        newSelection();
	    }
	});

});
*/


// localStorage persistence
var STORAGE_KEY = 'randomizr'
var listStorage = {
  fetch: function () {
    var people = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    people.forEach(function (person, index) {
      person.id = index
    })
    listStorage.uid = people.length
    return people
  },
  save: function (people) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(people))
  }
}

var app = new Vue({
	el: '#app',
  // app initial state
  data: {
		message: 'Randomizr!',
    people: listStorage.fetch(),
		present : false,

		newPerson: {
      name: '',
      count: ''
    },

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

  },

  // watch people change for listStorage persistence
  watch: {
    people: {
      handler: function (people) {
        listStorage.save(people)
      },
      deep: true
    }
  },

  // methods
  methods: {
    addPerson: function () {
      if ( !this.newPerson.name || !this.newPerson.name.trim() || !this.newPerson.count ) {
        return
      }

      app.people.push({
        // id: listStorage.uid++,
				id: app.people.uid++,
        name: this.newPerson.name,
        count: this.newPerson.count
      })

      this.newPerson.name = ''
      this.newPerson.count = ''

    },
    removePerson: function (person) {
      this.people.splice(this.people.indexOf(person), 1)
    },
		startRandomizr: function () {
			launchFullscreen(document.documentElement)
			app.present = true
			window.addEventListener('keyup', function(e){
				if(e.key == 'Escape') app.present = false;
			})
		}
  }

});

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

// localStorage persistence
const STORAGE_KEY = 'randomizr'
let listStorage = {
  fetch: function () {
    var people = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // people.forEach(function (person, index) {
    //   person.id = index
    // })
    return people
  },
  save: function (people) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(people))
  }
}

// let uid = 0 // Math.max.apply(Math,array.map(function(obj){return obj.id;}))

let app = new Vue({
	el: '#app',

  // app initial state
  data: {
		newPerson: {
      name: '',
      count: ''
    },
    people: listStorage.fetch(),
		present : false,
		bowl: [],
		iterator: 0,
		history: []

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
				id: this.uid,
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

			let bowl = this.bowl

			// for each person in people
			this.people.forEach(function(person) {

				// while in count
				for (i = 0; i < person.count; i++) {
					// add name to bowl
			    bowl.push(person.id)
				}

			})

			bowl.sort(function() { return 0.5 - Math.random() })

			launchFullscreen(document.documentElement)
			app.present = true
			window.addEventListener('keyup', function(e){
				if(e.key == 'Escape') app.present = false;
			})
		}

  },

	computed: {

		uid: function(){
			return app.people.length ? Math.max.apply(Math,app.people.map(function(obj){return obj.id})) + 1 : 1
		},

		selected: function(){

			if(app.bowl.length) {

				let id = app.bowl[app.iterator]

				return app.people.find(function(person) {

					if(person.id === id) {

						--person.count

						return person

				  }

				})

			} else {

				return 0

			}

		}

	}

});

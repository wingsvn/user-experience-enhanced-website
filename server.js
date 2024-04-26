// opzetten van de webserver
import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const apiUrl = "https://fdnd-agency.directus.app/items";

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

let favorites = {}

// ROUTES
// maak een GET route voor de index (home)
app.get('/', function(request, response) {
  Promise.all([ // Fetch data from all endpoints concurrently using Promise.all()
    fetchJson(apiUrl + "/tm_story"),
    fetchJson(apiUrl + "/tm_language"),
    fetchJson(apiUrl + "/tm_playlist"),
    fetchJson(apiUrl + "/tm_audio"),
  ]).then(([storyData, languageData, playlistData, audioData]) => {

  response.render('home', {
      stories: storyData.data, 
      languages: languageData.data,
      playlists: playlistData.data,
      audio: audioData.data
    }) 
  })
})

// maak een GET route voor testing
app.get("/testing", function (request, response) {
  response.render("testing");
});

// maak een GET route voor lessons
app.get('/lessons', function(request, response) {
  Promise.all([ // Fetch data from all endpoints concurrently using Promise.all()
    fetchJson(apiUrl + "/tm_story"),
    fetchJson(apiUrl + "/tm_language"),
    fetchJson(apiUrl + "/tm_audio"),
    fetchJson(apiUrl + "/tm_playlist"),
  ]).then(([storyData, languageData, audioData, playlistData]) => {

  response.render('lessons', {
      stories: storyData.data, 
      languages: languageData.data,
      playlists: playlistData.data,
      audio: audioData.data,
      favorites: favorites,
      likedPlaylist: request.query
    }) 
  })
})

// maak een POST route voor lessons (like)
app.post('/:playlistId/like-or-unlike', function(request, response) {
  const playlistId = Number(request.params.playlistId);
  const actie = request.body.actie; // Retrieve the value of the 'actie' parameter from the form

  // Implement the logic to handle liking or unliking the playlist
  if (actie === 'like') {
    favorites[playlistId] = true
    // Handle 'like' action
  } else if (actie === 'unlike') {
    favorites[playlistId] = false
  }

  // Als onze POST request de 'enhanced' property heeft, werd deze door
  // client-side JS afgevuurd. In dat geval willen we alleen een partial
  // renderen/terugsturen. De client-side JS gebruikt dat stukje HTML om
  // de UI state snel en makkelijk te updaten.
  // Als er geen 'enhanced' property is, dan was het een 'normale' browser
  // POST, en sturen we de gebruiker door naar het overzicht van het mandje.
  // if (request.body.enhanced) {
  //   response.render('partials/suggested-playlist', {favorites: favorites})
  // } else {
  //   response.redirect(303, '/lessons')
  // }

  // Handle 'unlike' action
   response.redirect('/lessons?liked-playlist='+playlistId)
  })

// maak een GET route voor stories
app.get('/stories', function(request, response) {
  Promise.all([ // Fetch data from all endpoints concurrently using Promise.all()
    fetchJson(apiUrl + "/tm_story"),
    fetchJson(apiUrl + "/tm_language"),
    fetchJson(apiUrl + "/tm_playlist"),
    fetchJson(apiUrl + "/tm_audio"),
 ]).then(([storyData, languageData, audioData, playlistData]) => {
  
  response.render('stories', {
      stories: storyData.data, 
      languages: languageData.data,
      playlists: playlistData.data,
      audio: audioData.data     
    }) 
  })
})

// maak een GET route voor playlist
app.get('/playlist', function(request, response) {
  Promise.all([ // Fetch data from all endpoints concurrently using Promise.all()
    fetchJson(apiUrl + "/tm_story"),
    fetchJson(apiUrl + "/tm_language"),
    fetchJson(apiUrl + "/tm_playlist"),
    fetchJson(apiUrl + "/tm_audio"),
  ]).then(([storyData, languageData, audioData, playlistData]) => {
  
    response.render('playlist', {
      stories: storyData.data, 
        languages: languageData.data,
        playlists: playlistData.data,
        audio: audioData.data
    }) 
  })
})

  // maak een GET route voor statistics
  app.get("/statistics", function (request, response) {
    response.render("statistics");
  });

// maak een GET route voor profile
  app.get("/profile", function (request, response) {
    response.render("profile");
  });

// start de webserver
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
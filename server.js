console.log('Hier komt je server voor Sprint 10. Gebruik uit Sprint 9 alleen de code die je mee wilt nemen.')


// opzetten van de webserver 
import express from 'express'
import fetchJson from './helpers/fetch-json.js'

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

let favorites = {}

// routes aanmaken

// maak een GET route voor de index (home)
app.get('/', function(request, response) {
    Promise.all([ // Fetch data from all endpoints concurrently using Promise.all()
    fetchJson('https://fdnd-agency.directus.app/items/tm_story'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_language'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_audio'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_playlist')
  ]).then(([storyData, languageData, audioData, playlistData]) => {

    response.render('home', {
        stories: storyData.data, 
        languages: languageData.data,
        playlists: playlistData.data,
        audio: audioData.data}) 
    })
  })

// maak een GET route voor lessons 
app.get('/lessons', function(request, response) {
    Promise.all([ // Fetch data from all endpoints concurrently using Promise.all()
    fetchJson('https://fdnd-agency.directus.app/items/tm_story'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_language'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_audio'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_playlist')
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
  const action = request.body.action; // Retrieve the value of the 'actie' parameter from the form

  // Implement the logic to handle liking or unliking the playlist
  if (action === 'like') {
    favorites[playlistId] = true
    // Handle 'like' action
  } else if (action === 'unlike') {
    favorites[playlistId] = false

    // Handle 'unlike' action
  }

  response.redirect('/lessons?liked-playlist='+playlistId+'#suggested-playlist')
  })

// maak een GET route voor stories
app.get('/lessons/stories', function(request, response) {
    Promise.all([ // Fetch data from all endpoints concurrently using Promise.all()
    fetchJson('https://fdnd-agency.directus.app/items/tm_story'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_language'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_audio'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_playlist')
  ]).then(([storyData, languageData, audioData, playlistData]) => {

    response.render('stories', {
        stories: storyData.data, 
        languages: languageData.data, 
        playlists: playlistData.data, 
        audio: audioData.data}) 
    })
  })

// maak een GET route voor playlist
app.get('lessons/playlist', function(request, response) {
    Promise.all([ // Fetch data from all endpoints concurrently using Promise.all()
    fetchJson('https://fdnd-agency.directus.app/items/tm_story'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_language'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_audio'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_playlist')
  ]).then(([storyData, languageData, audioData, playlistData]) => {

    response.render('playlist', {
        stories: storyData.data, 
        languages: languageData.data, 
        playlists: playlistData.data, 
        audio: audioData.data}) 
    })
  })

// maak een GET route voor testing 
app.get('/testing', function(request, response) {
    Promise.all([ // Fetch data from all endpoints concurrently using Promise.all()
    fetchJson('https://fdnd-agency.directus.app/items/tm_story'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_language'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_audio'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_playlist')
  ]).then(([storyData, languageData, audioData, playlistData]) => {

    response.render('testing', {
        stories: storyData.data, 
        languages: languageData.data, 
        playlists: playlistData.data, 
        audio: audioData.data}) 
    })
  })

// maak een GET route voor statistics
app.get('/statistics', function(request, response) {
    Promise.all([ // Fetch data from all endpoints concurrently using Promise.all()
    fetchJson('https://fdnd-agency.directus.app/items/tm_story'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_language'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_audio'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_playlist')
  ]).then(([storyData, languageData, audioData, playlistData]) => {

    response.render('statistics', {
        stories: storyData.data, 
        languages: languageData.data, 
        playlists: playlistData.data, 
        audio: audioData.data}) 
    })
  })

// maak een GET route voor profile
app.get('/profile', function(request, response) {
    Promise.all([ // Fetch data from all endpoints concurrently using Promise.all()
    fetchJson('https://fdnd-agency.directus.app/items/tm_story'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_language'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_audio'),
    fetchJson('https://fdnd-agency.directus.app/items/tm_playlist')
  ]).then(([storyData, languageData, audioData, playlistData]) => {

    response.render('profile', {
        stories: storyData.data, 
        languages: languageData.data, 
        playlists: playlistData.data, 
        audio: audioData.data}) 
    })
  })


// start de webserver
app.set('port', process.env.PORT || 8000)
app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
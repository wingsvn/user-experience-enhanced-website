
// carrousel
// Get the stories content list
const storiesContent = document.querySelector('.stories-content');

// Get the playlists content list
const playlistsContent = document.querySelector('.playlists-content');

// Create a div for the carousel buttons
const carrouselButtonsDiv = document.createElement('div');
carrouselButtonsDiv.classList.add('carrousel-buttons');

// Get the previous and next buttons
const prevButton = document.createElement('button');
prevButton.textContent = 'vorige';
prevButton.classList.add('carrousel-button');
prevButton.id = 'prevButton';

const nextButton = document.createElement('button');
nextButton.textContent = 'volgende';
nextButton.classList.add('carrousel-button');
nextButton.id = 'nextButton';

// Append the buttons to the carousel buttons div
carrouselButtonsDiv.appendChild(prevButton);
carrouselButtonsDiv.appendChild(nextButton);

// Insert the carousel buttons div between stories content and playlists content
storiesContent.insertAdjacentElement('afterend', carrouselButtonsDiv);

// Add event listeners to the buttons
prevButton.addEventListener('click', () => {
    storiesContent.scrollBy({
        left: -storiesContent.offsetWidth, // Scroll to previous item
        behavior: 'smooth' // Smooth scrolling effect
    });
});

nextButton.addEventListener('click', () => {
    storiesContent.scrollBy({
        left: storiesContent.offsetWidth, // Scroll to next item
        behavior: 'smooth' // Smooth scrolling effect
    });
});

// enhanced user experience: no refresh 
// Selecteer alle bestelformulieren
let forms = document.querySelectorAll('form.like-or-unlike-playlist')

// Loop door al die formulieren
forms.forEach(function(form) {

    // Luister naar het submit event
    form.addEventListener('submit', function(event) {
        //console.log(form)
        //console.log(this.action)
        // Het this object refereert hier naar het formulier zelf

		// Lees de data van het formulier in
		// https://developer.mozilla.org/en-US/docs/Web/API/FormData
        let data = new FormData(this)

        // Voeg een extra eigenschap aan de formulierdata toe
		// Deze gaan we server-side gebruiken om iets anders terug te sturen
		data.append('enhanced', true)

        // Waarschijnlijk wil je op deze plek ook een loading state
		// maken, maar daar gaan we volgende week mee aan de slag

		// Gebruik een client-side fetch om een POST te doen naar de server
		// Als URL gebruiken we this.action
		// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
        fetch(this.action, {

            // Als method gebruiken we this.method (waarschijnlijk POST)
            method: this.method,

            // Als body geven de data van het formulier mee (inclusief de extra eigenschap)
			// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
            body: new URLSearchParams(data)

        }).then(function(response) {
            // Als de server een antwoord geeft, krijgen we een stream terug
			// We willen hiervan de text gebruiken, wat in dit geval HTML teruggeeft
            return response.text();

        }).then(function(responseHTML) {
            //console.log(responseHTML)
            // En de HTML kunnen we gebruiken om onze DOM aan te passen
            document.querySelector('.suggested-playlist-container').innerHTML = responseHTML;
            console.log(responseHTML)

            // En hier kun je bijvoorbeeld nog wat extra's doen om duidelijker te maken
			// dat er iets gebeurd is op de pagina
			// document.querySelector('').open = true;

		    // Een eventuele loading state haal je hier ook weer weg
        });

    // Als alles gelukt is, voorkom dan de submit van de browser zelf
	// Stel dat je hierboven een tikfout hebt gemaakt, of de browser ondersteunt
	// een bepaalde feature hierboven niet (bijvoorbeeld FormData), dan krijg je
	// een error en wordt de volgende regel nooit uitgevoerd. De browser valt dan
	// automatisch terug naar de standaard POST, wat prima is.
	    event.preventDefault()
    })
})
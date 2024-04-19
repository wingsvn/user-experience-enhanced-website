

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
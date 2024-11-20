// Select main section of page to add shows section to
let mainSection = document.querySelector('.main');

// Create new section element for shows
let showsSection = document.createElement('section');
showsSection.classList.add('shows');
mainSection.appendChild(showsSection);

// Create shows title element
let showsTitle = document.createElement('h2');
showsTitle.classList.add('shows__title');
showsTitle.innerText = 'Shows';
showsSection.appendChild(showsTitle);

// Create gallery to hold show cards
let showsGallery = document.createElement('div');
showsGallery.classList.add('shows__gallery');
showsSection.appendChild(showsGallery)

// Create header row to label shows
let showsHeader = document.createElement('ul');
showsHeader.classList.add('shows__header');
showsGallery.appendChild(showsHeader);

// Creat column labels for date, venue and location
let dateLabel = document.createElement('li');
dateLabel.classList.add('shows__labels');
dateLabel.innerText = 'Date'
showsHeader.appendChild(dateLabel)

let venueLabel = document.createElement('li');
venueLabel.classList.add('shows__labels');
venueLabel.innerText = 'Venue'
showsHeader.appendChild(venueLabel)

let locationLabel = document.createElement('li');
locationLabel.classList.add('shows__labels');
locationLabel.innerText = 'Location'
showsHeader.appendChild(locationLabel)

// Import API class and initialize with API key
import { bandSiteApi } from "./band-site-api.js";
const API_KEY = `4ae0307a-ef25-454d-97e1-83776bd8b6a1`
const api = new bandSiteApi(API_KEY);

// Get show dates from API
let showsData = await api.getShowDates();
console.log(showsData)

// Loop through show data and create a card for each show
for (let i = 0; i < showsData.length; i++) {
    let show = showsData[i];
    
    // Create new card for show
    let showsCard = document.createElement('article');
    showsCard.classList.add("shows__card");
    showsGallery.appendChild(showsCard)

    // Create list to hold show details
    let showsList = document.createElement('ul');
    showsList.classList.add('shows__list');
    showsCard.appendChild(showsList);

    // Create list item for date information
    let dateInformation = document.createElement('li');
    dateInformation.classList.add('shows__item');
    showsList.appendChild(dateInformation);

    // Add subtitle and date text to date information
    let dateSubtitle = document.createElement('h3');
    dateSubtitle.classList.add('shows__subtitle');
    dateSubtitle.innerText = 'Date';
    dateInformation.appendChild(dateSubtitle);

    let dateText = document.createElement('p');
    dateText.classList.add('shows__information');
    dateText.classList.add('shows__information--bold');

    // Convert timestamp to local date
    let showDate = new Date(show.date)
    dateText.innerText = showDate.toLocaleDateString();
    dateInformation.appendChild(dateText);
    
    // Create list item for venue information
    let placeInformation = document.createElement('li');
    placeInformation.classList.add('shows__item');
    showsList.appendChild(placeInformation);

    // Add subtitle and venue text to venue information
    let placeSubtitle = document.createElement('h3');
    placeSubtitle.classList.add('shows__subtitle');
    placeSubtitle.innerText = 'Venue';
    placeInformation.appendChild(placeSubtitle);

    let placeText = document.createElement('p');
    placeText.classList.add('shows__information');
    placeText.innerText = show.place;
    placeInformation.appendChild(placeText);
    
    // Create list item for location information
    let locationInformation = document.createElement('li');
    locationInformation.classList.add('shows__item');
    showsList.appendChild(locationInformation);

    // Add subtitle and location text to location information
    let locationSubtitle = document.createElement('h3');
    locationSubtitle.classList.add('shows__subtitle');
    locationSubtitle.innerText = 'Location';
    locationInformation.appendChild(locationSubtitle);

    let locationText = document.createElement('p');
    locationText.classList.add('shows__information');
    locationText.innerText = show.location;
    locationInformation.appendChild(locationText);
    
    // Create buy tickets button
    let showsButton = document.createElement('a');
    showsButton.classList.add('shows__button');
    showsButton.innerHTML = 'BUY TICKETS';
    showsList.appendChild(showsButton);
}

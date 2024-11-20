let mainSection = document.querySelector('.main');

let showsSection = document.createElement('section');
showsSection.classList.add('shows');
mainSection.appendChild(showsSection);

let showsTitle = document.createElement('h2');
showsTitle.classList.add('shows__title');
showsTitle.innerText = 'Shows';
showsSection.appendChild(showsTitle);

let showsGallery = document.createElement('div');
showsGallery.classList.add('shows__gallery');
showsSection.appendChild(showsGallery)

let showsHeader = document.createElement('ul');
showsHeader.classList.add('shows__header');
showsGallery.appendChild(showsHeader);

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
const API_KEY = `78283900-cd8f-44d2-bda7-25ec1cba590c`
const api = new bandSiteApi(API_KEY);

// Get show dates from API
let showsData = await api.getShowDates();
console.log(showsData)


for (let i = 0; i < showsData.length; i++) {
    let show = showsData[i];
    
    let showsCard = document.createElement('article');
    showsCard.classList.add("shows__card");
    showsGallery.appendChild(showsCard)

    let showsList = document.createElement('ul');
    showsList.classList.add('shows__list');
    showsCard.appendChild(showsList);

    let dateInformation = document.createElement('li');
    dateInformation.classList.add('shows__item');
    showsList.appendChild(dateInformation);

    let dateSubtitle = document.createElement('h3');
    dateSubtitle.classList.add('shows__subtitle');
    dateSubtitle.innerText = 'Date';
    dateInformation.appendChild(dateSubtitle);

    let dateText = document.createElement('p');
    dateText.classList.add('shows__information');
    dateText.classList.add('shows__information--bold');

    let showDate = new Date(show.date)
    dateText.innerText = showDate.toLocaleDateString();
    dateInformation.appendChild(dateText);
    
    let placeInformation = document.createElement('li');
    placeInformation.classList.add('shows__item');
    showsList.appendChild(placeInformation);

    let placeSubtitle = document.createElement('h3');
    placeSubtitle.classList.add('shows__subtitle');
    placeSubtitle.innerText = 'Venue';
    placeInformation.appendChild(placeSubtitle);

    let placeText = document.createElement('p');
    placeText.classList.add('shows__information');
    placeText.innerText = show.place;
    placeInformation.appendChild(placeText);
    
    let locationInformation = document.createElement('li');
    locationInformation.classList.add('shows__item');
    showsList.appendChild(locationInformation);

    let locationSubtitle = document.createElement('h3');
    locationSubtitle.classList.add('shows__subtitle');
    locationSubtitle.innerText = 'Location';
    locationInformation.appendChild(locationSubtitle);

    let locationText = document.createElement('p');
    locationText.classList.add('shows__information');
    locationText.innerText = show.location;
    locationInformation.appendChild(locationText);
    
    let showsButton = document.createElement('a');
    showsButton.classList.add('shows__button');
    showsButton.innerHTML = 'BUY TICKETS';
    showsList.appendChild(showsButton);
}

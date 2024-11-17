let showsData = [
    {
        date: "Mon Sept 09 2024",
        venue: "Ronald Lane",
        location: "San Francisco, CA",
    },
    {
        date: "Tue Sept 17 2024",
        venue: "Pier 3 East",
        location: "San Francisco, CA",
    },
    {
        date: "Sat Oct 12 2024",
        venue: "View Lounge",
        location: "San Francisco, CA",
    },
    {
        date: "Sat Nov 16 2024 ",
        venue: "Hyatt Agency",
        location: "San Francisco, CA",
    },
    {
        date: "Fri Nov 29 2024",
        venue: "Moscow Center",
        location: "San Francisco, CA",
    },
    {
        date: "Wed Dec 18 2024 ",
        venue: "Press Club",
        location: "San Francisco, CA",
    },
];

let showsSection = document.querySelector('.shows__gallery');

for (let i = 0; i < showsData.length; i++) {
    let show = showsData[i];
    
    let showsCard = document.createElement('article');
    showsCard.classList.add("shows__card");
    showsSection.appendChild(showsCard)

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
    dateText.innerText = show.date;
    dateInformation.appendChild(dateText);
    
    let venueInformation = document.createElement('li');
    venueInformation.classList.add('shows__item');
    showsList.appendChild(venueInformation);

    let venueSubtitle = document.createElement('h3');
    venueSubtitle.classList.add('shows__subtitle');
    venueSubtitle.innerText = 'Venue';
    venueInformation.appendChild(venueSubtitle);

    let venueText = document.createElement('p');
    venueText.classList.add('shows__information');
    venueText.innerText = show.venue;
    venueInformation.appendChild(venueText);
    
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
    showsButton.innerHTML = 'COMMENT';
    showsList.appendChild(showsButton);
}

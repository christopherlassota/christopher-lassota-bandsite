// Import API class and initialize with API key
import { bandSiteApi } from "./band-site-api.js";
const API_KEY = `78283900-cd8f-44d2-bda7-25ec1cba590c`
const api = new bandSiteApi(API_KEY);

// Get comments from API
let commentData = await api.getComments();

// Select container where comments will be rendered
let commentSection = document.querySelector('.comment__gallery');

/**
 * Funtion to render comments in the comment section.
 * Clears comments, then iterates through data and
 * creates HTML elements dynamically for each comment.
 */
let renderComments = () => {
    // Clear comments
    commentSection.innerHTML = '';

    // Loop through comment data and create comment cards
    for (let i = 0; i < commentData.length; i++) {
        let comment = commentData[i];

        // Create card element
        let commentCard = document.createElement('article');
        commentCard.classList.add('comment__card')
        commentSection.appendChild(commentCard)

        // Create profile picture placeholder
        let commentPicture = document.createElement('div');
        commentPicture.classList.add('comment__profile-picture');
        commentCard.appendChild(commentPicture);

        // Create container for comment content (header & text)
        let commentContent = document.createElement('div');
        commentContent.classList.add('comment__content');
        commentCard.appendChild(commentContent);

        // Create comment header (name and date)
        let commentHeader = document.createElement('ul');
        commentHeader.classList.add('comment__header');
        commentContent.appendChild(commentHeader);

        // Add commenter's name
        let commentName = document.createElement('li');
        commentName.classList.add('comment__name');
        commentName.innerText = comment.name;
        commentHeader.appendChild(commentName);

        // Add date of comment
        let commentDate = document.createElement('li');
        commentDate.classList.add('comment__date');
        // convert timestamp to local date
        const date = new Date(comment.timestamp)
        commentDate.innerText = date.toLocaleDateString(); // i.e. 11/19/2024
        commentHeader.appendChild(commentDate);

        // Add comment text
        let commentText = document.createElement('p');
        commentText.classList.add('comment__text');
        commentText.innerText = comment.comment;
        commentContent.appendChild(commentText)
    }
}

/**
 * Event handler for form submission
 * Prevents default form behaviour, collect input values, send new comments to API,
 * re-fetches updated comments then re-renders comment section
 */
let handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on submit

    // Get user input from form fields
    const nameInput = event.target.name.value;
    const commentInput = event.target.comment.value;

    // Create new comment object
    const newComment = {
        name: nameInput,
        comment: commentInput,
    }

    // Post new comment to API
    await api.postComment(newComment);
    await api.getComments();

    // Re-render comment section so new comments are included
    renderComments()

    // Resets form fields
    event.target.reset();
}

// Attach form submission handler to form
let form = document.querySelector('.comment__form');
form.addEventListener("submit", handleFormSubmit);

// Initial render of comments
renderComments();

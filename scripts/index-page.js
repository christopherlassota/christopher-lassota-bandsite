// Import API class and initialize with API key
import { bandSiteApi } from "./band-site-api.js";
import { API_KEY } from "./band-site-api.js";
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
        const commentCard = document.createElement('article');
        commentCard.classList.add('comment__card')
        commentSection.appendChild(commentCard)

        // Create profile picture placeholder
        const commentPicture = document.createElement('div');
        commentPicture.classList.add('comment__profile-picture');
        commentCard.appendChild(commentPicture);

        // Create container for comment content (header & text)
        const commentContent = document.createElement('div');
        commentContent.classList.add('comment__content');
        commentCard.appendChild(commentContent);

        // Create comment header (name and date)
        const commentHeader = document.createElement('ul');
        commentHeader.classList.add('comment__header');
        commentContent.appendChild(commentHeader);

        // Add commenter's name
        const commentName = document.createElement('li');
        commentName.classList.add('comment__name');
        commentName.innerText = comment.name;
        commentHeader.appendChild(commentName);

        // Add date of comment
        const commentDate = document.createElement('li');
        commentDate.classList.add('comment__date');

        // Convert timestamp to local date
        const date = new Date(comment.timestamp);
        commentDate.innerText = date.toLocaleDateString(); // i.e. 11/19/2024
        commentHeader.appendChild(commentDate);

        // Add comment text
        const commentText = document.createElement('p');
        commentText.classList.add('comment__text');
        commentText.innerText = comment.comment;
        commentContent.appendChild(commentText);

        // Create container for like and delete buttons
        const commentFunctions = document.createElement('div');
        commentFunctions.classList.add('comment__functions');
        commentContent.appendChild(commentFunctions);
        
        // Create like button & assign unique ID
        const likeIcon = document.createElementNS('http://www.w3.org/2000/svg','svg');
        likeIcon.classList.add('comment__icon');
        likeIcon.setAttribute('id', commentData[i].id);
        likeIcon.setAttribute('width','19');
        likeIcon.setAttribute('height','17');
        likeIcon.setAttribute('viewBox','0 0 19 17');
        likeIcon.setAttribute('fill','none');
        likeIcon.setAttribute('xmlns','http://www.w3.org/2000/svg');
        commentFunctions.appendChild(likeIcon);
        likeIcon.addEventListener("click", handleLikeSubmit);

        // Add path to SVG
        const iconPath = document.createElementNS('http://www.w3.org/2000/svg','path');
        iconPath.classList.add('comment__path')
        iconPath.setAttribute(
            'd',
            'M10.4712 4.005L9.9725 6.53375C9.8675 7.05 10.0075 7.58375 10.34 7.98625C10.6725 8.38875 11.1625 8.625 11.6875 8.625H16.5V9.57L14.2513 14.75H7.1725C7.015 14.75 6.875 14.61 6.875 14.4525V7.5925L10.4712 4.005V4.005ZM11.25 0.75L5.64125 6.35875C5.30875 6.69125 5.125 7.1375 5.125 7.60125V14.4525C5.125 15.5812 6.04375 16.5 7.1725 16.5H14.26C14.8813 16.5 15.45 16.1763 15.765 15.6513L18.1012 10.27C18.1975 10.0513 18.25 9.815 18.25 9.57V8.625C18.25 7.6625 17.4625 6.875 16.5 6.875H11.6875L12.4925 2.80625C12.5363 2.61375 12.51 2.40375 12.4225 2.22875C12.2213 1.835 11.9675 1.47625 11.6525 1.16125L11.25 0.75ZM2.5 6.875H0.75V16.5H2.5C2.98125 16.5 3.375 16.1063 3.375 15.625V7.75C3.375 7.26875 2.98125 6.875 2.5 6.875Z'
        );
        iconPath.setAttribute('fill','#323232');
        likeIcon.appendChild(iconPath);

        // Create delete button & assign unique ID
        const deleteButton = document.createElement('div');
        deleteButton.classList.add('comment__delete');
        deleteButton.setAttribute('id', commentData[i].id);
        deleteButton.innerHTML = 'DELETE';
        commentFunctions.appendChild(deleteButton);
        deleteButton.addEventListener("click", handleDeleteSubmit);
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
    renderComments();

    // Resets form fields
    event.target.reset();
}

// Attach form submission handler to form
let form = document.querySelector('.comment__form');
form.addEventListener("submit", handleFormSubmit);

/**Event handler for like button
 * gets specific comment ID
 * refetces comments then re-renders comment section
 */
let handleLikeSubmit = async (event) => {
    try {
        // Set target and get comment ID
        const likeButton = event.target;
        const commentId = likeButton.id;
        console.log(`Like button pressed for ${commentId}`);
        
        // Put like sent to API
        await api.putLike(commentId);
        await api.getComments();
        
        // Re-render comments
        renderComments();
    } catch(error) {
        console.log("Error liking comment:", error);
    }
}

/**Event handler for delete button
 * gets specific comment ID
 * refetces comments then re-renders comment section
 */
let handleDeleteSubmit = async (event) => {
    try {
        // Set target and get comment ID
        const deleteButton = event.currentTarget;
        const commentId = deleteButton.id;
        console.log(`Delete button pressed for ${commentId}`);

        // Delete comment sent to API
        await api.deleteComment(commentId);
        await api.getComments();

        // Re-render comments
        renderComments();
    } catch(error) {
        console.log("Error deleting comment:", error);
    }
}

// Initial render of comments
renderComments();

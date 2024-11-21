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
        const date = new Date(comment.timestamp)
        commentDate.innerText = date.toLocaleDateString(); // i.e. 11/19/2024
        commentHeader.appendChild(commentDate);

        // Add comment text
        const commentText = document.createElement('p');
        commentText.classList.add('comment__text');
        commentText.innerText = comment.comment;
        commentContent.appendChild(commentText)

        // Create container for like and delete buttons
        const commentFunctions = document.createElement('div');
        commentFunctions.classList.add('comment__functions');
        commentContent.appendChild(commentFunctions);
        
        // Create like button & assign unique ID
        const likeIcon = document.createElement('img');
        likeIcon.classList.add('comment__icon');
        likeIcon.setAttribute('id', commentData[i].id)
        likeIcon.setAttribute(
            'src',
            '../assets/icons/icon-like.svg'
        );
        commentFunctions.appendChild(likeIcon);
        likeIcon.addEventListener("click", handleLikeSubmit)

        // Create delete button & assign unique ID
        const deleteButton = document.createElement('div');
        deleteButton.classList.add('comment__delete');
        deleteButton.setAttribute('id', commentData[i].id)
        deleteButton.innerHTML = 'DELETE'
        commentFunctions.appendChild(deleteButton);
        deleteButton.addEventListener("click", handleDeleteSubmit)
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

/**Event handler for like button
 * gets specific comment ID
 * refetces comments then re-renders comment section
 */
let handleLikeSubmit = async (event) => {
    try {
        // Set target and get comment ID
        const likeButton = event.target;
        const commentId = likeButton.id
        console.log(`Like button pressed for ${commentId}`)
        
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
        const deleteButton = event.currentTarget
        const commentId = deleteButton.id
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

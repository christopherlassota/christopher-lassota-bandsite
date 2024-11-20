import { bandSiteApi } from "./band-site-api.js";
const API_KEY = `78283900-cd8f-44d2-bda7-25ec1cba590c`
const api = new bandSiteApi(API_KEY);

let commentData = await api.getComments();

let commentSection = document.querySelector('.comment__gallery');

let renderComments = () => {

    commentSection.innerHTML = '';

    for (let i = 0; i < commentData.length; i++) {
        let comment = commentData[i];

        let commentCard = document.createElement('article');
        commentCard.classList.add('comment__card')
        commentSection.appendChild(commentCard)

        let commentPicture = document.createElement('div');
        commentPicture.classList.add('comment__profile-picture');
        commentCard.appendChild(commentPicture);

        let commentContent = document.createElement('div');
        commentContent.classList.add('comment__content');
        commentCard.appendChild(commentContent);

        let commentHeader = document.createElement('ul');
        commentHeader.classList.add('comment__header');
        commentContent.appendChild(commentHeader);

        let commentName = document.createElement('li');
        commentName.classList.add('comment__name');
        commentName.innerText = comment.name;
        commentHeader.appendChild(commentName);
        
        let commentDate = document.createElement('li');
        commentDate.classList.add('comment__date');
        const date = new Date(comment.timestamp)
        commentDate.innerText = date.toLocaleDateString();
        commentHeader.appendChild(commentDate);

        let commentText = document.createElement('p');
        commentText.classList.add('comment__text');
        commentText.innerText = comment.comment;
        commentContent.appendChild(commentText)
    }
}

let handleFormSubmit = async (event) => {
    event.preventDefault();

    const nameInput = event.target.name.value;
    const commentInput = event.target.comment.value;

    const newComment = {
        name: nameInput,
        comment: commentInput,
    }

    await api.postComment(newComment);
    await api.getComments();
    renderComments()
    event.target.reset();
}

let form = document.querySelector('.comment__form');
form.addEventListener("submit", handleFormSubmit);

renderComments();

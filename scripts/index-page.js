let commentData = [
    {
        name: "Victor Pinto",
        date: "11/02/2023",
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.",
    },
    {
        name: "Christina Cabrera",
        date: "10/28/2023",
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.",
    },
    {
        name: "Isaac Tadesse",
        date: "10/20/2023",
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
    },
]

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
        commentDate.innerText = comment.date;
        commentHeader.appendChild(commentDate);

        let commentText = document.createElement('p');
        commentText.classList.add('comment__text');
        commentText.innerText = comment.comment;
        commentContent.appendChild(commentText)
    }
}

let handleFormSubmit = (event) => {
    event.preventDefault();

    const nameInput = event.target.name.value;
    const commentInput = event.target.comment.value;
    let today = new Date().toLocaleDateString();

    const newComment = {
        name: nameInput,
        date: today,
        comment: commentInput,
    }

    commentData.unshift(newComment);
    renderComments()
    event.target.reset();
}

let form = document.querySelector('.comment__form');
form.addEventListener("submit", handleFormSubmit);

renderComments();

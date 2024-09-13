document.addEventListener('DOMContentLoaded', () => {
    const incrementButton = document.getElementById('incrementButton');
    const scoreDisplay = document.getElementById('score');
    const postsContainer = document.getElementById('posts');
    const postForm = document.getElementById('postForm');
    let score = 0;

    incrementButton.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    });

    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const body = document.getElementById('body').value;

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1,
            }),
        })
        .then(response => response.json())
        .then(data => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `
                <h2 class="text-xl font-semibold">${data.title}</h2>
                <p class="text-gray-700">${data.body}</p>
            `;
            postsContainer.appendChild(postElement);
            postForm.reset();
        })
        .catch(error => console.error('erreur ajout du post', error));
    });

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.innerHTML = `
                    <h2 class="text-xl font-semibold">${post.title}</h2>
                    <p class="text-gray-700">${post.body}</p>
                `;
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('erreur récupération des posts:', error));
});

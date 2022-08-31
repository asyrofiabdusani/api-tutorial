const txtError = document.querySelector('.error-connection');
const movieBox = document.querySelector('.movie-box');

fetch('http://www.omdbapi.com/?apikey=a0861315&s=avengers')
    .then((response) => response.json())
    .then((data) => showFilmList(data.Search))
    .catch(() => showFilmList(false));

function showFilmList(data) {
    if (!data) {
        txtError.innerHTML = 'Error connection, please try again . . .';
    } else {
        let card = '';

        data.forEach(e => {
            fetch(`http://www.omdbapi.com/?apikey=a0861315&i=${e.imdbID}`)
                .then((response) => response.json())
                .then((detail) => {
                    card += cardList(detail.Poster, detail.Title, detail.Actors, detail.Plot);

                    movieBox.innerHTML = card;
                })
                .catch(() => showFilmList(false));
        });

    }
}
function cardList(poster, title, actors, plot) {
    return `
        <div class="card m-2 shadow-sm" data-bs-toggle="modal"
        data-bs-target="#movieModal" style="width: 18rem">
            <img src="${poster}" class="card-img-top img-thumbnail" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-subtitle mb-2 text-muted">${actors}</p>
                <p class="card-text mt-4">
                    ${plot}
                </p>
            </div>
        </div>`;
}
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
            card += `
                <div class="card m-2" style="width: 18rem">
                    <img src="${e.Poster}" class="card-img-top img-thumbnail" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">${e.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${e.Year}</h6>
                        <p class="card-text">
                            Sinopsis
                        </p>
                    </div>
                </div>`;

        });
        movieBox.innerHTML = card;
    }
}
const txtError = document.querySelector('.error-connection');
const movieBox = document.querySelector('.movie-box');

movies();

function movies() {
    fetch('http://www.omdbapi.com/?apikey=a0861315&s=avengers')
        .then((response) => response.json())
        .then((data) => showFilmList(data.Search))
        .catch(() => showFilmList(false));
}

function showFilmList(data) {
    if (!data) {
        txtError.innerHTML = 'Error connection, please wait . . .';
        movies();
    } else {
        let card = '';
        data.forEach(e => {
            fetch(`http://www.omdbapi.com/?apikey=a0861315&i=${e.imdbID}`)
                .then((response) => response.json())
                .then((movie) => {
                    card += cardList(movie.Poster, movie.Title, movie.Actors, movie.Plot, movie.imdbID);
                    movieBox.innerHTML = card;

                    const detailMv = document.querySelectorAll('#detail-movie');
                    detailMv.forEach(e => {
                        e.addEventListener('click', () => {
                            fetch(`http://www.omdbapi.com/?apikey=a0861315&i=${e.classList[0]}`)
                                .then((response) => response.json())
                                .then((detail) => {
                                    modalContent(detail);
                                })
                                .catch(() => showFilmList(false));
                        });
                    });
                })
                .catch(() => showFilmList(false));
        });

    }
}
function cardList(poster, title, actors, plot, imdb) {
    return `
        <div class=" ${imdb} card m-2 shadow-sm" id="detail-movie" data-bs-toggle="modal"
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

function modalContent(detail) {
    const title = document.querySelector('.modal-title');
    const actors = document.querySelector('.modal-actors');
    const director = document.querySelector('.modal-director');
    const year = document.querySelector('.modal-year');
    const rating = document.querySelector('.modal-rating');
    const genre = document.querySelector('.modal-genre');
    const duration = document.querySelector('.modal-duration');
    const plot = document.querySelector('.modal-plot');

    title.innerHTML = detail.Title;
    actors.innerHTML = detail.Actors;
    director.innerHTML = detail.Director;
    year.innerHTML = detail.Year;
    rating.innerHTML = detail.Rating;
    rating.innerHTML = detail.Rating;
    genre.innerHTML = detail.Genre;
    duration.innerHTML = detail.Runtime;
    plot.innerHTML = detail.Plot;
}
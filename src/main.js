import { API_KEY } from "./key.js";
import * as module from "./node.js"


// conexiones a la API
const API = 'https://api.themoviedb.org/3/'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_KEY,
    }
};

// Utils
function createMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('card__movies');
        // movieContainer.addEventListener('click', () => {
        //     location.hash = '#movie=' + movie.id;
        // });

        const movieImg = document.createElement('img');
        // movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300' + movie.backdrop_path,
        );
        const titleMovie = document.createElement('p');
        titleMovie.classList.add('trending__TitleMovie')
        titleMovie.textContent = movie.original_title || movie.name;

        const content_vote = document.createElement('div');
        content_vote.classList.add('content_vote');


        const iconStar = document.createElement('img');
        iconStar.src = '../icons/star_icon.svg';

        const vote = document.createElement('span');
        vote.textContent = `${movie.vote_average}/10`;
        vote.classList.add('spanVote')

        content_vote.append(vote, iconStar)

        movieContainer.append(movieImg, titleMovie, content_vote);
        container.append(movieContainer);
    });
}

// Tendencias
export async function getTrendingMoviesPreview() {

    const response = await fetch(`${API}trending/movie/day?language=en-US`, options);
    const data = await response.json();
    const movies = data.results;

    createMovies(movies, module.trendingMovies);
}

// Generos

export async function getGenresMovies() {

    const response = await fetch(`${API}genre/movie/list?language=en`, options);
    const data = await response.json();
    module.submenu.innerHTML = '';
    data.genres.forEach(genre => {

        const li = document.createElement('li');

        const a = document.createElement('p');
        a.textContent = genre.name;
        a.style.color = '#61788C'
        a.addEventListener('click', () => {
            location.hash = `#category=${genre.id}-${genre.name}`
        });

        li.append(a);
        module.submenu.appendChild(li);

    });
}

// filtrado por generos
export async function getMoviesByCategory(id) {
    const response = await fetch(`${API}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`, options);
    const data = await response.json();
    const movies = data.results;
    createMovies(movies, module.listCategory);
}

//Series

export async function getSeriesPreview() {
    const response = await fetch(`${API}tv/top_rated?language=en-US&page=1`, options);
    const data = await response.json();
    const movies = data.results;
    createMovies(movies, module.listSerie);
}


// Cambios de los elementos HTML en el DOM

document.addEventListener('DOMContentLoaded', function () {
    module.contentMenu.classList.add('inactive');
    module.submenu.classList.add('inactive');
});

module.menu.addEventListener('click', function () {
    module.contentMenu.classList.toggle('inactive');
});

module.menuClose.addEventListener('click', function () {
    module.contentMenu.classList.add('inactive');
});

module.menuGenre.addEventListener('click', function () {
    module.submenu.classList.toggle('inactive');
});
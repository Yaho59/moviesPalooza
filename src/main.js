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
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

        // movieContainer.addEventListener('click', () => {
        //     if (movie.media_type === 'movie') {
        //         location.hash = '#movie=' + movie.id;
        //     }
        //     else {
        //         location.hash = '#serie=' + movie.id;
        //     }
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
        content_vote.classList.add('flex')


        const iconStar = document.createElement('img');
        iconStar.src = '../icons/star_icon.svg';

        const vote = document.createElement('span');
        vote.textContent = `${movie.vote_average.toFixed(1)}/10`;
        vote.classList.add('spanVote');

        content_vote.append(vote, iconStar)

        movieContainer.append(movieImg, titleMovie, content_vote);
        container.append(movieContainer);
    });
}

function recommendations(movie, container) {
    module.recomendationMovie.innerHTML = '';

    movie.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('movie-container');

        const img = document.createElement('img');
        img.classList.add('movie-img')
        img.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;

        div.append(img);
        container.append(div);
    });
}

function createGenres(movies, container) {
    container.innerHTML = '';
    movies.forEach(genre => {

        const li = document.createElement('li');

        const a = document.createElement('p');
        a.textContent = genre.name;
        a.style.color = '#61788C'
        a.addEventListener('click', () => {
            location.hash = `#category=${genre.id}-${genre.name}`
        });

        li.append(a);
        container.append(li);

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
    const movie = data.genres;

    createGenres(movie, module.subMenuDesktop);
    createGenres(movie, module.submenu);
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
    const series = data.results;

    module.listSerie.innerHTML = ""

    series.forEach(serie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('card__movies');
        movieContainer.addEventListener('click', () => {
            location.hash = '#serie=' + serie.id;
        });

        const movieImg = document.createElement('img');
        movieImg.setAttribute('alt', serie.title);
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300' + serie.backdrop_path,
        );
        const titleMovie = document.createElement('p');
        titleMovie.classList.add('trending__TitleMovie')
        titleMovie.textContent =  serie.name;

        const content_vote = document.createElement('div');
        content_vote.classList.add('content_vote');
        content_vote.classList.add('flex')


        const iconStar = document.createElement('img');
        iconStar.src = '../icons/star_icon.svg';

        const vote = document.createElement('span');
        vote.textContent = `${serie.vote_average.toFixed(1)}/10`;
        vote.classList.add('spanVote');

        content_vote.append(vote, iconStar)

        movieContainer.append(movieImg, titleMovie, content_vote);
        module.listSerie.append(movieContainer);

    });
}

// Peliculas por busqueda
export async function getMoviesBySearch(query) {
    const response = await fetch(`${API}search/movie?query=${query}&include_adult=true&language=en-US&page=1`, options);
    const data = await response.json();
    const movies = data.results;

    createMovies(movies, module.listCategory);
}

// Detalles de una pelicula
export async function getMovieDetail(movieId) {
    const response = await fetch(`${API}movie/${movieId}?language=en-US`, options);
    const data = await response.json();
    const movie = data;

    module.movieDetailCategoriesList.innerHTML = '';

    const url = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    module.imgDetail.src = url;
    module.poster.src = url;

    module.detailTitle.textContent = movie.original_title;
    module.movieDetailDescrip.textContent = movie.overview;
    module.movieDetailScore.textContent = movie.vote_average.toFixed(1);

    movie.genres.forEach(genre => {

        const nameCategory = document.createElement('span');
        nameCategory.textContent = genre.name

        module.movieDetailCategoriesList.append(nameCategory);
    });

    getRecommendationsMovies(movieId);
}


// Peliculas relacionadas
export async function getRecommendationsMovies(movieId) {
    const response = await fetch(`${API}movie/${movieId}/recommendations?language=en-US&page=1`, options);
    const data = await response.json();
    const movies = data.results;

    recommendations(movies, module.recomendationMovie);
}

//Detalles de serie
export async function getSerieDetail(serieId) {
    const response = await fetch(`${API}tv/${serieId}?language=en-US`, options);
    const data = await response.json();
    const serie = data;

    module.movieDetailCategoriesList.innerHTML = '';

    const url = `https://image.tmdb.org/t/p/w1280${serie.poster_path}`;
    module.imgDetail.src = url;
    module.poster.src = url;

    module.detailTitle.textContent = serie.original_name;
    module.movieDetailDescrip.textContent = serie.overview;
    module.movieDetailScore.textContent = serie.vote_average;

    serie.genres.forEach(genre => {

        const nameCategory = document.createElement('span');
        nameCategory.textContent = genre.name

        module.movieDetailCategoriesList.append(nameCategory);
    });

    getRecommendationsSeries(serieId);
}

// Serie Relacionadas
export async function getRecommendationsSeries(serieId) {
    const response = await fetch(`${API}tv/${serieId}/recommendations?language=en-US&page=1`, options);
    const data = await response.json();
    const movies = data.results;

    recommendations(movies, module.recomendationMovie);
}

// Cambios de los elementos HTML en el DOM

document.addEventListener('DOMContentLoaded', function () {
    module.contentMenu.classList.add('inactive');
    module.submenu.classList.add('inactive');
    module.searchFormFind.classList.add('inactive');
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

module.iconGlass.addEventListener('click', function () {
    module.searchFormFind.classList.toggle('inactive');
});

module.searchClose.addEventListener('click', function () {
    module.searchFormFind.classList.add('inactive');
})
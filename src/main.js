import { API_KEY } from "./key.js";


// conexiones a la API
const API ='https://api.themoviedb.org/3/'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + API_KEY,
    }
};

// Tendencias
async function getTrendingMoviesPreview() {
    const trendingMovies = document.querySelector('.container__movies');
    
    const response = await fetch(`${API}trending/movie/day?language=en-US`, options);
    const data = await response.json();

    data.results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('card__movies');

        const movieImg = document.createElement('img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.src = 'https://image.tmdb.org/t/p/w300/' + movie.backdrop_path;

        const titleMovie = document.createElement('p');
        titleMovie.classList.add('trending__TitleMovie')
        titleMovie.textContent = movie.original_title;

        movieCard.append(movieImg, titleMovie);
        trendingMovies.append(movieCard);
    });
}
getTrendingMoviesPreview();

// Generos
const submenu = document.querySelector('.submenu');
async function getGenresMovies() {

    const response = await fetch(`${API}genre/movie/list?language=en`, options);
    const data = await response.json();

    data.genres.forEach(genre => {

        const li = document.createElement('li');

        const a = document.createElement('a');
        a.textContent = genre.name;

        li.append(a);
        submenu.appendChild(li);


    });
}
getGenresMovies()




// Cambios de los elementos HTML en el DOM
const menu = document.querySelector('#icon-menu');
const contentMenu = document.querySelector('.menu__links');
const menuClose = document.querySelector('#icon-menuClose');
const menuGenre = document.querySelector('#menugenre');

document.addEventListener('DOMContentLoaded', function() {
    contentMenu.classList.add('inactive');
    submenu.classList.add('inactive');
 });

menu.addEventListener('click', function () {
    contentMenu.classList.toggle('inactive');
});

menuClose.addEventListener('click', function () {
    contentMenu.classList.add('inactive');
});

menuGenre.addEventListener('click', function() {
    submenu.classList.toggle('inactive');
});
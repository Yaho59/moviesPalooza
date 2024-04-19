import { API_KEY } from "./key.js";
import * as module from "./node.js"


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
export async function getTrendingMoviesPreview() {
    
    const response = await fetch(`${API}trending/movie/day?language=en-US`, options);
    const data = await response.json();

    module.trendingMovies.innerHTML = '';

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
        module.trendingMovies.append(movieCard);
    });
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
        a.addEventListener('click', ()=>{
            location.hash =`#category=${genre.id}-${genre.name}`
        });

        li.append(a);
        module.submenu.appendChild(li);

    });
}


// Cambios de los elementos HTML en el DOM

document.addEventListener('DOMContentLoaded', function() {
    module.contentMenu.classList.add('inactive');
    module.submenu.classList.add('inactive');
 });

module.menu.addEventListener('click', function () {
    module.contentMenu.classList.toggle('inactive');
});

module.menuClose.addEventListener('click', function () {
    module.contentMenu.classList.add('inactive');
});

module.menuGenre.addEventListener('click', function() {
    module.submenu.classList.toggle('inactive');
});
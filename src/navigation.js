import * as module from "./node.js"
import * as main from "./main.js";

module.iconGlass.addEventListener('click', function() {
   location.hash = '#search='; 
});




window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }
}


function homePage() {
    module.searchFormFind.classList.add('inactive');
    module.contentTrendingmovies.classList.remove('inactive')
    main.getTrendingMoviesPreview();
    main.getGenresMovies();
}

function categoriesPage() {
    console.log('categories!!');
}

function movieDetailsPage() {
    console.log('Movie!!');
}

function searchPage() {
    module.menuMovil.classList.add('inactive');
    module.searchFormFind.classList.remove('inactive');
    module.contentTrendingmovies.classList.add('inactive');
}

function trendsPage() {
    console.log('TRENDS!!');
}

module.iconClose.addEventListener('click', function () {
   location.hash = '';
// history.back();
})

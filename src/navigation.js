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
    module.contentTrendingmovies.classList.remove('inactive');
    module.contentCategorymovies.classList.add('inactive');
    module.contentListCategory.classList.add('inactive');
    module.menuMovil.classList.remove('inactive');
    module.contentSerie.classList.remove('inactive');
    main.getTrendingMoviesPreview();
    main.getGenresMovies();
    main.getSeriesPreview();
}

function categoriesPage() {
    console.log('categories!!');

    module.menuMovil.classList.add('inactive');
    module.contentTrendingmovies.classList.add('inactive');
    module.searchFormFind.classList.add('inactive');
    module.contentCategorymovies.classList.remove('inactive');
    module.contentListCategory.classList.remove('inactive');
    module.contentMenu.classList.add('inactive');
    module.contentSerie.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    main.getMoviesByCategory(categoryId);
    module.titleCategoryMovie.textContent = categoryName;
}

function movieDetailsPage() {
    console.log('Movie!!');
}

function searchPage() {
    module.menuMovil.classList.add('inactive');
    module.searchFormFind.classList.remove('inactive');
    module.contentTrendingmovies.classList.add('inactive');
    module.contentSerie.classList.add('inactive');
}

function trendsPage() {
    console.log('TRENDS!!');
}

module.iconClose.addEventListener('click', function () {
   location.hash = '#home';
})

module.iconBack.addEventListener('click', ()=>{
    location.hash = '#home';
})

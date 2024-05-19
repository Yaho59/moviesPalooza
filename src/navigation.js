import * as module from "./node.js"
import * as main from "./main.js";

module.iconSearch.addEventListener('click', search);
module.iconSearchDesktop.addEventListener('click', search);

module.iconClose.addEventListener('click', function () {
    location.hash = '#home';
    // location.hash = window.history.back()
}); 

module.iconBack.addEventListener('click', () => {
    location.hash = '#home';
});

module.backDetail.addEventListener('click', () => {
    // location.hash = '#home';
    location.hash = window.history.back()
});

function search (e) {
    // location.hash = '#search=' + module.input.value.split(" ").join('');
    const inputValueTrim = module.input.value.replaceAll(" ",""); //elimnar espacios
    location.hash = "#search="+inputValueTrim; //para buscar según el valor del input
    e.preventDefault();
    location.reload();
}


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {

    if (location.hash.startsWith('#serie=')) {
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
    module.contentTrendingmovies.classList.remove('inactive');
    module.contentCategorymovies.classList.add('inactive');
    module.contentListCategory.classList.add('inactive');
    module.menuMovil.classList.remove('inactive');
    module.contentSerie.classList.remove('inactive');
    module.listMoviesSearch.classList.add('inactive');
    module.contentMovieDetail.classList.add('inactive');
    module.footer.classList.remove('inactive');
    module.contentMenuDesktop.classList.remove('inactive');
    module.header.classList.remove('inactive');
    main.getTrendingMoviesPreview();
    main. getGenresMovies();
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
    module.listMoviesSearch.classList.add('inactive');
    module.contentMovieDetail.classList.add('inactive');
    module.contentMenuDesktop.classList.add('inactive');
    module.header.classList.add('inactive');

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    main.getMoviesByCategory(categoryId);
    module.titleCategoryMovie.textContent = categoryName;
}

function movieDetailsPage() {
    console.log('Movie!!');

    module.contentTrendingmovies.classList.add('inactive');
    module.contentSerie.classList.add('inactive');
    module.menuMovil.classList.add('inactive');
    module.contentCategorymovies.classList.add('inactive');
    module.contentListCategory.classList.add('inactive');
    module.contentMovieDetail.classList.remove('inactive');
    module.searchFormFind.classList.add('inactive');
    module.footer.classList.add('inactive');
    module.contentMenuDesktop.classList.add('inactive');
    module.header.classList.add('inactive');

    const [_, movieId] = location.hash.split('=');
    main.getMovieDetail(movieId);
}

function searchPage() {
    module.menuMovil.classList.add('inactive');
    module.searchFormFind.classList.remove('inactive');
    module.contentTrendingmovies.classList.add('inactive');
    module.contentSerie.classList.add('inactive');
    module.contentCategorymovies.classList.add('inactive');
    module.listMoviesSearch.classList.remove('inactive');
    module.contentMovieDetail.classList.add('inactive');
    module.footer.classList.add('inactive');
    module.contentMenuDesktop.classList.add('inactive');
    module.header.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    main.getMoviesBySearch(query);
}

function trendsPage() {
    console.log('TRENDS!!');
    module.contentTrendingmovies.classList.add('inactive');
    module.contentSerie.classList.add('inactive');
    module.menuMovil.classList.add('inactive');
    module.contentCategorymovies.classList.add('inactive');
    module.contentListCategory.classList.add('inactive');
    module.contentMovieDetail.classList.remove('inactive');
    module.searchFormFind.classList.add('inactive');
    module.footer.classList.add('inactive');
    module.contentMenuDesktop.classList.add('inactive');
    module.header.classList.add('inactive');

    const [_, serieId] = location.hash.split('=');
    main.getSerieDetail(serieId);
}
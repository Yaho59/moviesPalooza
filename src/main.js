import { API_KEY } from "./key.js";

const menu = document.querySelector('#icon-menu');
const contentMenu = document.querySelector('.menu__links');
const menuClose = document.querySelector('#icon-menuClose');

menu.addEventListener('click', function () {
    
    contentMenu.classList.toggle('inactive');
    // contentMenu.classList.add('inactive');
})

menuClose.addEventListener('click', function () {
    contentMenu.classList.add('inactive');
})


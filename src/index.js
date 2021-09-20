import galleryTemplates from './templates/gallery';
console.log(galleryTemplates);

import cardTemplates from './templates/card';
console.log(cardTemplates);

import ApiService from './js/apiService';
console.log(ApiService);

import debounce from 'lodash.debounce';

//Импортируем плагин уведомлений pnotify
import { alert, defaultModules } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';

//импортируем плагин модального окна
// import * as basicLightbox from 'basiclightbox';

const newApiService = new ApiService;
console.log(newApiService.fetchImg());

const refs = {
    getInput: document.querySelector('.search-input'),
    getGalleryList: document.querySelector('.gallery-list'),
    getGalleryListItem: document.querySelector('.gallery-item'),
    getCard: document.querySelector('.photo-cardist'),
    getImg: document.querySelector('.img'),
    getBtn: document.querySelector('.btn'), 
}
console.log(refs.getInput);

refs.getInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
    event.preventDefault();
    
    newApiService.query = refs.getInput.value;
    console.log(newApiService.query);

    if (newApiService.query.trim() === '') {
        return;
    }

    newApiService.resetPage();
    clearGalleryList();
    fetchImgList();  
}

function fetchImgList() {
     newApiService.fetchImg().then(gallery => {
        console.log(gallery);
        renderGalleryList(gallery);
        loadMoreBtn();
    
        if ([...gallery].length === 0) {
            renderNotify();
        }

        if ([...gallery].length < 12) {
            refs.getBtn.setAttribute('hidden', 'true');
        }
     })
}

function renderGalleryList(gallery) {
    const markUp = galleryTemplates(gallery);
    refs.getGalleryList.insertAdjacentHTML('beforeend', markUp);
}

function clearGalleryList() {
  refs.getGalleryList.innerHTML = '';
}


function scroll() {
    const element = document.getElementById('my-element-selector');

    element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
    });
}


function loadMoreBtn() {
    refs.getBtn.removeAttribute('hidden');
    refs.getBtn.addEventListener('click', fetchImgList);

    newApiService.incrementPage();
    scroll();
}

function renderNotify() {
    defaultModules.set(PNotifyMobile, {});

    alert({
    text: 'Sorry, we didn`t find anything!'
    });
}
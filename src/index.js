import './css/styles.css';

import NewsApiService from './js/news-service';
import LoadMoreBtn from './js/load-more-btn';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    submitBtn: document.querySelector('.submit'),
    //loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const newsApiService = new NewsApiService();
console.log(loadMoreBtn);
loadMoreBtn.show();
loadMoreBtn.disable();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch (e) {
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    newsApiService.resetPage();
        clearCardContainer();
        if (newsApiService.query === '') {
            return Notiflix.Notify.failure(
                'Please enter text in the search bar!'
            );
        };
    
    newsApiService.fetchArticles().then (data => {
        
        appendMarkupCards(data);
    });
}


function onLoadMore () {
    newsApiService.fetchArticles().then (hits => {
        console.log(hits);
    });
}

function clearCardContainer() {
    refs.gallery.innerHTML = '';
}

function appendMarkupCards(cards) {
    refs.gallery.insertAdjacentHTML('beforeend', markupCards(cards));
}





function markupCards(hits) {

    return hits.map(({ webformatURL,
        largeImageURL,
        views,
        likes,
        comments,
        downloads }) => {
            return `
            <div class="gallery__item">
                <a class="gallery__link" href="${largeImageURL}">
                    <img class="gallery__image" src="${webformatURL}" alt="" loading="lazy"/>
                </a>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b>${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b>${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>${downloads}
                    </p>
                </div>
            </div>
            `;
        })
        .join('');
}

var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250,
    animationSpeed: 250,
});
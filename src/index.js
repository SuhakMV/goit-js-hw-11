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

let sumHits = 0;

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const newsApiService = new NewsApiService();
console.log(loadMoreBtn);

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch (e) {
    e.preventDefault();
    
        newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
        newsApiService.resetPage();
        
        if (newsApiService.query === '') {
            return Notiflix.Notify.failure(
                'Please enter text in the search bar!'
            );
        }
        renderCards();
}

function renderCards () {
    loadMoreBtn.disable();
    clearCardContainer();
        newsApiService.fetchArticles().then (data =>{
            if(data.totalHits === 0){
                Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.")
                return;
            }
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images!`);
            appendMarkupCards(data);
            sumHits = data.hits.length;
            loadMoreBtn.show();
            loadMoreBtn.enable();
            lightbox.refresh();
        });         
}

async function onLoadMore() {
    loadMoreBtn.disable();
        newsApiService.fetchArticles().then (data =>{
            sumHits += data.hits.length;
            appendMarkupCards(data);
            loadMoreBtn.show();
            loadMoreBtn.enable();
            lightbox.refresh();
            if(sumHits === data.totalHits + data.totalHits % data.hits.length) {
                loadMoreBtn.hide();
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
            return;
            }
            console.log(sumHits);
        });
}

/**Clear container */
function clearCardContainer() {
    refs.gallery.innerHTML = '';
}
/**Add markup to HTML */
function appendMarkupCards(cards) {
    refs.gallery.insertAdjacentHTML('beforeend', markupCards(cards));
}

/**Create crads markup */
function markupCards(data) {
    
    return data.hits.map(({ webformatURL,
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

/**Lightbox */
var lightbox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250,
    animationSpeed: 250,
});
import NewsApiService from './js/news-service';

const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    submitBtn: document.querySelector('.submit'),
    loadMoreBtn: document.querySelector('.load-more')
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch (e) {
    e.preventDefault();

    clearCardContainer();
    newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    newsApiService.resetPage();
    newsApiService.fetchArticles().then (appendMarkupCards);
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
            <div class="photo-card">
                <a class="photo-card__link" href="${largeImageURL}">
                    <img class="photo-card__img" src="${webformatURL}" alt="" loading="lazy"/>
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
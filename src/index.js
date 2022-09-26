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

    newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    newsApiService.resetPage();
    newsApiService.fetchArticles().then (hits => {
        console.log(hits);
    });
}


function onLoadMore () {
    newsApiService.fetchArticles().then (hits => {
        console.log(hits);
    });
}


const refs = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    submitBtn: document.querySelector('.submit'),
    loadMoreBtn: document.querySelector('.load-more')
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch (e) {
    e.preventDefault();
}


function onLoadMore () {
    
}
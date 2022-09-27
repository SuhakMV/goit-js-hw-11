const axios = require('axios');

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        
    }

    async fetchArticles(searchQuery) {
        console.log(this);
        const options = {
            url: 'https://pixabay.com/api/',
            params: {
                key: '30112757-abf194c84cfc9ccef9cde8e0f',
                q: `${this.searchQuery}`,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                per_page: '40',
                page: `${this.page}`,
            },
        };

        try {
            const response = await axios(options);
            const data = response.data;
            console.log(data);
            this.incrementPage();
            return data.hits;
        }

        catch (error) {
            console.error(error);
        }
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
}
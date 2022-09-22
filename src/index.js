/**Import */
import './css/styles.css';
//import axios from 'axios';
//import Notiflix from 'notiflix';
//import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
//import "simplelightbox/dist/simple-lightbox.min.css";
//import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

/**Input */
searchBox.addEventListener('input', debounce(onBoxInput, DEBOUNCE_DELAY));

function onBoxInput() {
    const searchText = String(searchBox.value);
    clearCountryContainer();

        if (searchText.trim()) {
            fetchCountries(searchText)
                .then(countries => {
                    if (countries.length > 10) {
                        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
                    }
                        else if (countries.length >= 2 && countries.length < 10) {
                           searchListResults(countries); 
                        }
                        else {searchResult(countries); 
                        }
                })
                .catch(error => {
                    Notiflix.Notify.failure('Oops, there is no country with that name');
                });
        }
}

function clearCountryContainer() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}

/**Search result */
function searchListResults(countries = []) {
    clearCountryContainer();
    const searchList = countries.map(country => {
        return `
        <li class="country-list__item">
            <img class="country-list__icon" 
            src="${country.flags.svg}" 
            alt="${country.name.official}" 
            width = "25px"></img>
            <span>
                ${country.name.official}
                </span>
        </li>
        `;
    })
    .join('');
    countryList.innerHTML = searchList;
}

function searchResult(countries = []) {
    clearCountryContainer();
        const searchCountry = countries.map(country => {
            return `
            <div class="country-info__name">
                <img class="country-info__icon" 
                src="${country.flags.svg}" 
                alt="${country.name.official}" 
                width = "25px"></img>
                <h2>${country.name.official}</h2>
            </div>
            <div class="country-info__description">
                <p class="country-info__item">Capital:<span class="country-info__text">${country.capital}</span></p>
                <p class="country-info__item">Population:<span class="country-info__text">${country.population}</span></p>
                <p class="country-info__item">Languahes:<span class="country-info__text">${Object.values(country.languages).join(',')}</span></p>
            </div>
            `;
        })
        .join('');
    countryInfo.innerHTML = searchCountry;
}
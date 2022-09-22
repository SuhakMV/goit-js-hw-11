const filterOptions = '?fields=name,capital,population,flags,languages';

async function fetchCountries(text) {
  const url = `https://restcountries.com/v3.1/name/${text}`;

  const response = await fetch(url + filterOptions);
  if (!response.ok) {
    throw new Error(response.status);
  }
  const countries = await response.json();
  return countries;
}

export { fetchCountries };
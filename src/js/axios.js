/**Import */
import axios from 'axios';

const userRequest = document.querySelector('input');

async function getGalleryCards(userRequest, page) {
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: '30112757-abf194c84cfc9ccef9cde8e0f',
            q: `${userRequest}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: '40',
            page: `${page}`,
        }
      });
      console.log(response);
      const data = response.data;
      return data;
      console.log(data);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

  export { getGalleryCards };
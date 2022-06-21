import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28157961-50aacf6d1ff0efe2e77cab6d2';

const options = {
  params: {
    key: API_KEY,
    q: null,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
  },
};

const imagesPerPage = options.params.per_page;

async function fetchPictures() {
  const response = await axios.get(BASE_URL, options);
  return response.data;
}

function newFetch(teg) {
  options.params.q = teg;
  options.params.page = 1;

  return fetchPictures();
}

function fetchLoadMoreBtnClick() {
  options.params.page += 1;

  return fetchPictures();
}

export { newFetch, fetchLoadMoreBtnClick, imagesPerPage };

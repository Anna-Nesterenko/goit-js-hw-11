import './css/style.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { newFetch, fetchLoadMoreBtnClick, imagesPerPage } from './js/api';
import galleryCardsMarkup from './js/card';
import {
  getEmptySearchMessage,
  getFoundImegesMessage,
  getEndGellaryMessage,
} from './js/notify_message';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  fadeSpeed: 500,
});

let page = 1;

refs.form.addEventListener('submit', onSearchPictures);
refs.loadMoreBtn.addEventListener('click', onLoadMorePictures);

async function onSearchPictures(e) {
  try {
    e.preventDefault();
    const searchTeg = e.currentTarget.elements.searchQuery.value.trim();

    if (!searchTeg) {
      getEmptySearchMessage();
      return;
    }
    const imegesGallery = await newFetch(searchTeg);
    const foundPictures = imegesGallery.totalHits;

    renderGalleryCards(imegesGallery);

    if (foundPictures < 1) {
      getEmptySearchMessage();
      // refs.loadMoreBtn.classList.add('is-hidden');
      return;
    }

    if (
      refs.loadMoreBtn.classList.contains('is-hidden') &&
      foundPictures > imagesPerPage
    ) {
      refs.loadMoreBtn.classList.toggle('is-hidden');
    }
    getFoundImegesMessage(imegesGallery);
    e.target.reset();
  } catch {
    err => console.log(err);
  }
}

async function onLoadMorePictures() {
  try {
    refs.loadMoreBtn.classList.toggle('is-hidden');

    const morePictures = await fetchLoadMoreBtnClick();
    const foundPictures = morePictures.totalHits;

    refs.loadMoreBtn.classList.toggle('is-hidden');
    addGalleryCards(morePictures);
    flowingScroll();
    page += 1;

    if (page >= Math.ceil(foundPictures / imagesPerPage)) {
      refs.loadMoreBtn.classList.toggle('is-hidden');
      getEndGellaryMessage();
    }
  } catch {
    err => console.log(err);
  }
}

function renderGalleryCards(arrayImages) {
  refs.gallery.innerHTML = galleryCardsMarkup(arrayImages.hits);
  gallery.refresh();
}

function addGalleryCards(arrayImages) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    galleryCardsMarkup(arrayImages.hits)
  );

  gallery.refresh();
}

function flowingScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

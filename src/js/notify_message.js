import { Notify } from 'notiflix/build/notiflix-notify-aio';

function getEmptySearchMessage() {
  Notify.failure(
    '"Sorry, there are no images matching your search query. Please try again."'
  );
}

function getFoundImegesMessage({ totalHits }) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}

function getEndGellaryMessage() {
  Notify.info("We're sorry, but you've reached the end of search results.");
}

export { getEmptySearchMessage, getFoundImegesMessage, getEndGellaryMessage };

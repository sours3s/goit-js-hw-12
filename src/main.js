import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

function showMessage(type, message) {
  iziToast[type]({ message, position: 'topRight' });
}

function checkEndOfCollection() {
  if (page * PER_PAGE >= totalHits) {
    hideLoadMoreButton();
    showMessage(
      'info',
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    showLoadMoreButton();
  }
}

function scrollGallery() {
  const card = document.querySelector('.gallery-item');
  const { height } = card.getBoundingClientRect();

  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  const value = form.elements['search-text'].value.trim();

  if (!value) {
    showMessage('warning', 'Please enter a search query.');
    return;
  }

  query = value;
  page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      showMessage(
        'error',
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);
    checkEndOfCollection();
  } catch {
    showMessage('error', 'Something went wrong. Please try again later.');
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener('click', async () => {
  page += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);
    scrollGallery();
    checkEndOfCollection();
  } catch {
    page -= 1;
    showLoadMoreButton();
    showMessage('error', 'Something went wrong. Please try again later.');
  } finally {
    hideLoader();
  }
});

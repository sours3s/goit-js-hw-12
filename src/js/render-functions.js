import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'pure-css-loader/dist/css-loader.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
  </a>
  <ul class="info">
    <li class="info-item"><b>Likes</b><span>${likes}</span></li>
    <li class="info-item"><b>Views</b><span>${views}</span></li>
    <li class="info-item"><b>Comments</b><span>${comments}</span></li>
    <li class="info-item"><b>Downloads</b><span>${downloads}</span></li>
  </ul>
</li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('is-active');
}

export function hideLoader() {
  loader.classList.remove('is-active');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.add('is-visible');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.remove('is-visible');
}

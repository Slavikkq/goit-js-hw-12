import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const gallery = document.getElementById('gallery');
  const loader = document.getElementById('loader');
  const apiKey = '41927484-8453b2dd3e18520885b5ece2f';
  const apiUrl = 'https://pixabay.com/api/';
  let page = 1;
  const lightbox = new SimpleLightbox('.gallery a');

  function renderGallery(images) {
    const fragment = document.createDocumentFragment();

    images.map(image => {
      const card = createCard(image);
      fragment.appendChild(card);
    });

    gallery.appendChild(fragment);
    lightbox.refresh();
    hideLoader();
  }

  function createCard(image) {
    const card = document.createElement('div');
    card.className = 'card';

    const link = document.createElement('a');
    link.href = image.largeImageURL;
    link.setAttribute('data-lightbox', 'gallery');
    link.setAttribute('data-title', image.tags);

    const img = document.createElement('img');
    img.src = image.largeImageURL;
    img.alt = image.tags;

    link.appendChild(img);
    card.appendChild(link);

    const info = document.createElement('div');
    info.className = 'image-info';
    info.innerHTML = `
      <p>Likes: ${image.likes}</p>
      <p>Views: ${image.views}</p>
      <p>Comments: ${image.comments}</p>
      <p>Downloads: ${image.downloads}</p>
    `;

    card.appendChild(info);

    return card;
  }

  function searchImages(query, page) {
    return new Promise(function (resolve, reject) {
      showLoader();
      fetch(
        `${apiUrl}?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
      )
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => resolve(data.hits))
        .catch(error => reject(error))
        .finally(() => hideLoader());
    });
  }

  function showLoader() {
    loader.style.display = 'block';
  }

  function hideLoader() {
    loader.style.display = 'none';
  }

  function showErrorMessage(message) {
    iziToast.error({
      title: 'Error',
      message: message,
    });
  }

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (query !== '') {
      gallery.innerHTML = '';
      searchImages(query, page)
        .then(function (images) {
          if (images.length === 0) {
            showErrorMessage(
              'Sorry, there are no images matching your search query. Please try again!'
            );
          } else {
            renderGallery(images);
          }
        })
        .catch(function (error) {
          console.error('Error fetching images:', error);
          showErrorMessage(
            'An error occurred while fetching images. Please try again later.'
          );
        });
    }
  });
});

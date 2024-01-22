import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const gallery = document.getElementById('gallery');
  const loader = document.getElementById('loader');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
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

    const hasMoreImages = images.length === 40;
    toggleLoadMoreBtn(hasMoreImages);
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

  async function searchImages(query, page) {
    try {
      showLoader();
      const response = await axios.get(apiUrl, {
        params: {
          key: apiKey,
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: page,
          per_page: 40,
        },
      });

      return response.data.hits;
    } catch (error) {
      console.error('Error fetching images:', error);
      showErrorMessage(
        'An error occurred while fetching images. Please try again later.'
      );
      throw error;
    } finally {
      hideLoader();
    }
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

  function toggleLoadMoreBtn(show) {
    loadMoreBtn.style.display = show ? 'block' : 'none';
  }

  searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (query !== '') {
      gallery.innerHTML = '';
      page = 1;
      try {
        const images = await searchImages(query, page);

        if (images.length === 0) {
          showErrorMessage(
            'Sorry, there are no images matching your search query. Please try again!'
          );
        } else {
          renderGallery(images);
        }
      } catch (error) {}
    }
  });

  loadMoreBtn.addEventListener('click', async function () {
    page++;
    const query = searchInput.value.trim();

    try {
      const images = await searchImages(query, page);

      if (images.length > 0) {
        renderGallery(images);
      } else {
        toggleLoadMoreBtn(false);
      }
    } catch (error) {}
  });
});

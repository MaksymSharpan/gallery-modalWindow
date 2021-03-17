import items from './gallery-items.js';

// получаем ссылки на элементы
const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.lightbox'),
  buttonClose: document.querySelector('.lightbox__button'),
  image: document.querySelector('.lightbox__image'),
  overlay: document.querySelector('.lightbox__overlay'),
};

// получаем базовую разметку
const galleryList = items.map(item => {
  const itemEl = document.createElement('li');
  const imageEl = document.createElement('img');
  const linkEl = document.createElement('a');

  itemEl.classList.add('gallery__item');
  imageEl.classList.add('gallery__image');
  linkEl.classList.add('gallery__link');

  imageEl.src = item.preview;
  imageEl.dataset.original = item.original;

  linkEl.append(imageEl);
  itemEl.append(linkEl);
  refs.gallery.append(itemEl);
});
// console.log(refs.modal);

refs.gallery.addEventListener('click', showOriginalImg);
refs.buttonClose.addEventListener('click', closeModal);

//-----------------------------------------------------------------------
// открытие модального окна

function showOriginalImg(evt) {
  if (evt.target !== evt.currentTarget) {
    const { original } = evt.target.dataset;
    openModal(original);
  }
}
function openModal(src) {
  refs.modal.classList.add('is-open');
  refs.image.src = src;
  // закрытие по ESС (прослушивается только если модалка открыта)
  document.addEventListener('keydown', keydownESC);
}
//-----------------------------------------------------------------------
//
//закрытие модального окна по button
function closeModal() {
  refs.modal.classList.remove('is-open');
  document.removeEventListener('keydown', keydownESC);
  refs.image.src = '';
}

// функция закрытия по ESC
function keydownESC(evt) {
  console.log(evt);
  if (evt.code === 'Escape') {
    closeModal();
  }
}
//закрытие кликом по оверлэй
refs.overlay.addEventListener('click', closeModal);

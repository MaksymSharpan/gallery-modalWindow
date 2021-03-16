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

  imageEl.src = item.preview; // маленькое изображение

  itemEl.append(imageEl);
  refs.gallery.append(itemEl);
});

// открытие молального окна
// console.log(refs.modal);

refs.gallery.addEventListener('click', openModal);
refs.buttonClose.addEventListener('click', closeModal);

function openModal(evt) {
  if (evt.target !== evt.currentTarget) {
    refs.modal.classList.add('is-open');
    // console.log(evt.target.src);
    // items.map((item, index) => {
    //   console.log(index);
    //   refs.image.src = item.original;
    // });
  }
  // закрытие по ESС (прослушивается только если модалка открыта)
  document.addEventListener('keydown', keydownESC);
}

//закрытие модального окна по button
function closeModal() {
  refs.modal.classList.remove('is-open');
  document.removeEventListener('keydown', keydownESC);
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
import items from './gallery-items.js';

// получаем ссылки на элементы
const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.lightbox'),
  buttonClose: document.querySelector('.lightbox__button'),
  image: document.querySelector('.lightbox__image'),
  overlay: document.querySelector('.lightbox__overlay'),
};
let currentShowImgindex = null; //------------------------------<<< переменная, которая хранит значие открытого элемента
// получаем базовую разметку
const galleryList = items.map((item, index) => {
  // <<<-------------<<< индекс получил с помощью map
  const itemEl = document.createElement('li');
  const imageEl = document.createElement('img');
  const linkEl = document.createElement('a');

  itemEl.classList.add('gallery__item');
  imageEl.classList.add('gallery__image');
  linkEl.classList.add('gallery__link');

  imageEl.src = item.preview;
  imageEl.dataset.original = item.original;
  imageEl.dataset.index = index; // <<<<------------------------------ добавил атрибут, который будет хранить индекс элемента

  linkEl.append(imageEl);
  itemEl.append(linkEl);
  return linkEl;
});
refs.gallery.append(...galleryList);
// console.log(refs.modal);

refs.gallery.addEventListener('click', showOriginalImg);
refs.buttonClose.addEventListener('click', closeModal);

//-----------------------------------------------------------------------
// открытие модального окна

function showOriginalImg(evt) {
  if (evt.target !== evt.currentTarget) {
    const url = evt.target.dataset.original;
    currentShowImgindex = +evt.target.dataset.index; // <<<------------------------------------<<< при открытии модалки переменная перезаписывается
    openModal(url);
  }
}
function openModal(url) {
  refs.modal.classList.add('is-open');
  refs.image.src = url;
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
  if (evt.code === 'ArrowRight') {
    // console.log(items[1]);
    // console.log('нажал вправо');
    currentShowImgindex = currentShowImgindex + 1;
    refs.image.src = items[currentShowImgindex].original;
  }
  if (evt.code === 'ArrowLeft') {
    // console.log('нажал влево');
    currentShowImgindex = currentShowImgindex - 1;
    refs.image.src = items[currentShowImgindex].original;
  }
}
//закрытие кликом по оверлэй
refs.overlay.addEventListener('click', closeModal);

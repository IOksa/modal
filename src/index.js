import API from '../fetchTopBooks';
import AP from '../fetchById';

const refs={
    ul: document.querySelector('.js-books-list'),
    closeModalBtn: document.querySelector('[data-action="close-modal"]'),
    backdrop: document.querySelector('.js-backdrop'),
    bookCard: document.querySelector('.js-book-card'),
    shoppingListBtn: document.querySelector('[data-action="shopping-list-modal"]'),
    text: document.querySelector('.js-modal-text'),
}

const STORAGE_KEY = 'bookId';
let idBook=0;
// console.log(refs.closeModalBtn);
// console.log(refs.backdrop);

refs.ul.addEventListener('click',onItemGalleryBooksClick);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);
refs.shoppingListBtn.addEventListener('click', onShoppingListBtnClick);

///////////////////////////////////////////////////////////////////////////////////////
API.fetchTopBooks().then(createMarkupGalleryBooks);
//.catch(err=>console.log('Ooops! Something went wrong!'));

function createMarkupGalleryBooks(arr) {
    // console.log('createMarkupGalleryBooks',arr);
    // console.log(arr[0].books[0]);
    const markup=arr[0].books.map(
        ({
        _id,
        book_image,
        book_image_width,
        book_image_height,
        }) =>
        `<li ><div class="thumb"><img class="gallery__image" src="${book_image}" alt="" width="${book_image_width}px" height="${book_image_height}px" data-source="${_id}"/><div></li>`
      )
      .join("");
      // console.log(markup);
      refs.ul.innerHTML=markup;
 }
// ////////////////////////////////////////////////////////////////////////////////////
function onItemGalleryBooksClick(event){
    event.preventDefault();

    const isImageGalleryEl=event.target.classList.contains('gallery__image');
    if(!isImageGalleryEl){
        return;
    }

    console.log(event.target.dataset.source);
    idBook=event.target.dataset.source;

    const isBookInLocalStorage=isInLocalStorage();

    console.log('isBookInLocalStorage=',isBookInLocalStorage);

    if(isBookInLocalStorage===idBook){
      refs.shoppingListBtn.textContent='remove from the shopping list';
      refs.shoppingListBtn.classList.add('modal__button-shopping-list--remove');
      refs.text.classList.remove('visually-hidden');
    }
    else{
      refs.shoppingListBtn.textContent='add to shopping list';
      refs.text.classList.add('visually-hidden');
      refs.shoppingListBtn.classList.remove('modal__button-shopping-list--remove');
    }
    refs.bookCard.innerHTML='';

    AP.fetchBookById(idBook)
    .then(createMarkupBookModal);
    //.catch(err=>console.log('Ooops! Something went wrong!'));

    onOpenModal();
    
}




function onOpenModal() {
    window.addEventListener('keydown', onEscKeyPress);
    document.body.classList.add('show-modal');

    //console.log('onOpenModal');


}
  
  function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    document.body.classList.remove('show-modal');

  }
  
  function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
      //console.log('Кликнули именно в бекдроп!!!!');
      onCloseModal();
    }
  }
  
  function onEscKeyPress(event) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = event.code === ESC_KEY_CODE;
    if (isEscKey) {
      onCloseModal();
    }
  }

  // function renderMarkupBookModal(arrayInfoBook){
  //   createMarkupBookModal(arrayInfoBook);
  // }

  function createMarkupBookModal(arrayInfoBook){
    //console.log('createMarkupBookModal: ', arrayInfoBook);

    const {book_image, author, title, description,buy_links, _id}=arrayInfoBook;
    
    const markup=
    `<div class="img-thumb"><img class="book-image"" src="${book_image}" alt="${title}" loading="lazy" data-source="${_id}"/>
    </div>
    <div class="book-description-thumb">
    <p class="book-title">${title}</p>
    <p class="book-author">${author}</p>
    <p class="book-description">${description}</p>
    <div class="book-links">
    <a href="${buy_links[0].url}" target="_blank" rel="noreferrer noopener">
    <img src="./images/amazon.jpg" width="62px" height="19px"/>
    </a>
    <a href="${buy_links[1].url}" target="_blank" rel="noreferrer noopener">
    <img src="./images/image1.jpg" width="33px" height="32px"/>
    </a>
    <a href="${buy_links[4].url}" target="_blank" rel="noreferrer noopener">
    <img src="./images/bookshop.jpg" width="38px" height="36px"/>
    </a>
    </div>
    </div>`;

    
    //console.log(markup);
    refs.bookCard.innerHTML=markup;
  }


  function onShoppingListBtnClick(event){
    //const idBook=event.target.dataset.source;
    const isBookInLocalStorage=isInLocalStorage();
    if(isBookInLocalStorage===idBook){
      localStorage.removeItem(STORAGE_KEY, idBook);
    }
    else{
      localStorage.setItem(STORAGE_KEY, idBook);
    }   
    onCloseModal();
  }

  function isInLocalStorage(){
    return localStorage.getItem(STORAGE_KEY, idBook);
  }
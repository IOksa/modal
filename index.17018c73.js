var o={fetchTopBooks:async function(){return await fetch("https://books-backend.p.goit.global/books/top-books").then((o=>{if(!o.ok)throw new Error(o.statusText);return o.json()}))}};var t={fetchBookById:async function(o){return await fetch(`https://books-backend.p.goit.global/books//${o}`).then((o=>{if(!o.ok)throw new Error(o.statusText);return o.json()}))}};const e={ul:document.querySelector(".js-books-list"),closeModalBtn:document.querySelector('[data-action="close-modal"]'),backdrop:document.querySelector(".js-backdrop"),bookCard:document.querySelector(".js-book-card"),shoppingListBtn:document.querySelector('[data-action="shopping-list-modal"]'),text:document.querySelector(".js-modal-text")};let n=0;const s=JSON.parse(localStorage.getItem("bookId"))||[];function i(){window.removeEventListener("keydown",a),document.body.classList.remove("show-modal")}function a(o){"Escape"===o.code&&i()}function r(o){const{book_image:t,author:n,title:s,description:i,buy_links:a,_id:r}=o,c=`<div class="img-thumb"><img class="book-image"" src="${t}" alt="${s}" loading="lazy" data-source="${r}"/>\n    </div>\n    <div class="book-description-thumb">\n    <p class="book-title">${s}</p>\n    <p class="book-author">${n}</p>\n    <p class="book-description">${i}</p>\n    <div class="book-links">\n    <a href="${a[0].url}" target="_blank" rel="noreferrer noopener">\n    <img src="./images/amazon.jpg" width="62px" height="19px"/>\n    </a>\n    <a href="${a[1].url}" target="_blank" rel="noreferrer noopener">\n    <img src="./images/image1.jpg" width="33px" height="32px"/>\n    </a>\n    <a href="${a[4].url}" target="_blank" rel="noreferrer noopener">\n    <img src="./images/bookshop.jpg" width="38px" height="36px"/>\n    </a>\n    </div>\n    </div>`;e.bookCard.innerHTML=c}e.ul.addEventListener("click",(function(o){o.preventDefault();if(!o.target.classList.contains("gallery__image"))return;console.log(o.target.dataset.source),n=o.target.dataset.source;const i=s.includes(n);console.log("isBookInLocalStorage=",i),i?(e.shoppingListBtn.textContent="remove from the shopping list",e.shoppingListBtn.classList.add("modal__button-shopping-list--remove"),e.text.classList.remove("visually-hidden")):(e.shoppingListBtn.textContent="add to shopping list",e.text.classList.add("visually-hidden"),e.shoppingListBtn.classList.remove("modal__button-shopping-list--remove"));e.bookCard.innerHTML="",t.fetchBookById(n).then(r),window.addEventListener("keydown",a),document.body.classList.add("show-modal")})),e.closeModalBtn.addEventListener("click",i),e.backdrop.addEventListener("click",(function(o){o.currentTarget===o.target&&i()})),e.shoppingListBtn.addEventListener("click",(function(o){const t=s.indexOf(n);-1!==t?(s.splice(t,t),localStorage.removeItem("bookId",JSON.stringify(s))):(s.push(n),localStorage.setItem("bookId",JSON.stringify(s)));i()})),o.fetchTopBooks().then((function(o){const t=o[0].books.map((({_id:o,book_image:t,book_image_width:e,book_image_height:n})=>`<li ><div class="thumb"><img class="gallery__image" src="${t}" alt="" width="${e}px" height="${n}px" data-source="${o}"/><div></li>`)).join("");e.ul.innerHTML=t}));
//# sourceMappingURL=index.17018c73.js.map

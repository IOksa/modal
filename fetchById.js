const BASE_URL='https://books-backend.p.goit.global/books/';

async function fetchBookById(idBook){
    return await fetch(`${BASE_URL}/${idBook}`)
    .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        } 
        return resp.json();
      });
}

export default {fetchBookById};
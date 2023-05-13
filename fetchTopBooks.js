const BASE_URL='https://books-backend.p.goit.global/books/top-books';

async function fetchTopBooks(){
    return await fetch(`${BASE_URL}`)
    .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        } 
        return resp.json();
      });
}

export default {fetchTopBooks};
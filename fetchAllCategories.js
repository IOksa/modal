const BASE_URL='https://books-backend.p.goit.global/books/category-list ';

async function fetchAllCategories(){
    return await fetch(`${BASE_URL}`)
    .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        } 
        return resp.json();
      });
}

export default {fetchAllCategories};
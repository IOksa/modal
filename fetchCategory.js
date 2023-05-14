const BASE_URL='https://books-backend.p.goit.global/books/category';

async function fetchCategory(selectedCategory){
    return await fetch(`${BASE_URL}?category=${selectedCategory}`)
    .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        } 
        return resp.json();
      });
}

export default {fetchCategory};
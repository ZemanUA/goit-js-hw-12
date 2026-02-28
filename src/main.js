import { getImagesByQuery, perPage } from "./js/pixabay-api";
import { showLoader, hideLoader, showLoadMoreButton, 
  hideLoadMoreButton, clearGallery, createGallery, showMessage } from "./js/render-functions";

const form = document.querySelector(".form");
const input = document.querySelector('[name="search-text"]');
const bntLoad = document.querySelector(".showLoad");

// Import first function


let search = "";
let page = 1;


form.addEventListener("submit", async (event) =>{
  event.preventDefault();
  search = input.value.trim();
  
  hideLoadMoreButton();
  if(search === ""){
    showMessage("error" ,"Невалидный ввод");
    return
  }
  clearGallery();
  page = 1;
  showLoader();
      try{
        
        const data = await getImagesByQuery(search, page);
        if(data.hits.length === 0){
          showMessage("error", 
          "Sorry, there are no images matching your search query. Please try again!");
          }else{
            const totalPages = Math.ceil(data.totalHits / perPage); 
            if( page > totalPages ){
                  showMessage("info", 
                "We're sorry, but you've reached the end of search results.")
            }else{

              createGallery(data.hits);
                showLoadMoreButton();
            if(totalPages === 1){
              hideLoadMoreButton();
              showMessage("info", 
                "We're sorry, but you've reached the end of search results.")
            }  
            }
        }
      }catch (error) {
        showMessage("error","Sorry, there are no images matching your search query. Please try again!");
      } finally{
        hideLoader();
      };
});
  
 bntLoad.addEventListener("click", async () => {
          page += 1;
          hideLoadMoreButton();
            showLoader();
            try{
              const data = await getImagesByQuery(search,page);
              const totalPages = Math.ceil(data.totalHits / perPage); 
            if(page > totalPages || page === totalPages){
              hideLoadMoreButton();
              showMessage("info", 
                "We're sorry, but you've reached the end of search results.")
                createGallery(data.hits);
                window.scrollBy({
              top: rect.height * 2,
              behavior: "smooth"
            });
            }else{
            createGallery(data.hits);
            const img = document.querySelector(".gallery-item");
            if(img){
               const rect = img.getBoundingClientRect();
            window.scrollBy({
              top: rect.height * 2,
              behavior: "smooth"
            });
            }
            showLoadMoreButton();
            }
            } catch(error) {
            showMessage("error" ,"We're sorry, щось трапилося")
          }finally{
          hideLoader();
        }
 });
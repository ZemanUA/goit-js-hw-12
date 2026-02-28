// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
// Описаний у документації
const gallery = document.querySelector(".gallery");
const span = document.querySelector(".loader");
const bntLoad = document.querySelector(".showLoad");

export const clearGallery = () => gallery.innerHTML = "";
export const showLoader = () => span.classList.add("show");
export const hideLoader = () => span.classList.remove('show');

export const showLoadMoreButton = () => bntLoad.classList.add("show");
export const hideLoadMoreButton = () => bntLoad.classList.remove("show");

export function createGallery(images){
    const li = images
                    .map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
                    `<li class ="gallery-item">
                    <a class = "gallery-link" href="${largeImageURL}">
                    <img
                        class = "gallery-image"    
                        src = "${webformatURL}"
                        alt ="${tags}"
                        />
                    </a>
                     <ul class="info">
            <li>Likes<p>${likes}</p></li>
            <li>Views<p>${views}</p></li>
            <li>Comments<p>${comments}</p></li>
            <li>Downloads<p>${downloads}</p></li>
            </ul>
                    </li>`
                )
                    .join("");
                gallery.insertAdjacentHTML("beforeend", li);

                let lightbox = new SimpleLightbox('.gallery-link',{
        captionDelay : 250,
        showCounter: false,
        captionsData: 'alt',
    });
        lightbox.refresh();
}
  
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
export const showMessage = (type, message)=>{
  iziToast[type]({
    title: type.charAt(0).toUpperCase() + type.slice(1),
    message: message,
    position: 'topRight',
  })
}

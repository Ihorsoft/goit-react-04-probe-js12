import "./css/styles.css"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImages } from "./js/pixabay-api";
import { createGallery } from "./js/render-functions";
import { onLoading } from "./js/render-functions";
import { offLoading } from "./js/render-functions";

const BASE_URL = "https://pixabay.com";
const END_POINT = "/api/";
const keyUser = '43441081-c9c9daac9af91d4227dda2db1';

let currentPageNumber = 1;
const formData = {
    keySearch: "",
};
const per_page = 15;

const form = document.querySelector(".feedback-form");
const galleryNew = document.querySelector(".list");
const loader = document.querySelector(".loader");
const loaderbtn = document.querySelector(".loaderbtn");
const loadermorebtn = document.querySelector(".loadermorebtn");
const moreBtn = document.querySelector("button[data-more]");
form.addEventListener("input", handleInput);
form.addEventListener("submit", handleSubmit);
moreBtn.addEventListener("click", fitchPage);

offLoading(loader);
offLoading(loaderbtn);
offLoading(loadermorebtn);



//++++++++++++++++++++++++++=======================
function handleSubmit(event) {
    currentPageNumber = 1;
    galleryNew.innerHTML = "";
   
    formData.keySearch = event.target.keySearch.value;

    // onLoading(loaderbtn);
    handleSubmitNew(event);
  }

//++++++++++++++++++++++++++++++=======================
function fitchPage(event) {
   
    onLoading(loaderbtn);
    currentPageNumber += 1;
  
      handleSubmitNew(event);

}

//++++++++++++++++++++++++++++++========================
 function handleInput(event) {
   
} 

//++++++++++++++++++++++++++++++++++++=====================
function handleSubmitNew(event) {
    event.preventDefault();
    
    if (currentPageNumber == 1) {
        
        galleryNew.innerHTML = "";
    };
      
           onLoading(loaderbtn);
  
            if (formData.keySearch.trim() == "") {
               offLoading(loaderbtn);
               return iziToast.error({
                   message: 'Sorry, there is no search request. You must enter a keyword.',
                   position: 'bottomRight',
                   messageColor: 'white',
                   backgroundColor: 'red',
                   progressBarColor: 'black',
                 });
             }
 
   //+++++++++++++++++=========================
   
    getImages(keyUser, formData.keySearch, currentPageNumber, per_page)
      .then(data => {
          offLoading(loaderbtn);
          onLoading(loadermorebtn);
         

         
          if (data.totalHits <= currentPageNumber * per_page && data.hits.length > 0) {
            
              offLoading(loadermorebtn);
             
              iziToast.error({
                   message: "We're sorry, but you've reached the end of search results.",
                   position: 'bottomRight',
                   messageColor: 'white',
                   backgroundColor: 'red',
                   progressBarColor: 'black',
                 });
           
          }

         
           if (data.hits.length === 0) {   
              offLoading(loader);
              offLoading(loadermorebtn);
                return iziToast.error({
                message: 'Sorry, there are no images matching your search query, or the search query is incorrect. Please try again!',
                position: 'bottomRight',
                messageColor: 'white',
                backgroundColor: 'red',
                progressBarColor: 'black',
                    });
                }  

           galleryNew.insertAdjacentHTML("beforeend", createGallery(data.hits));
          gallery.refresh();
          
          const kartaElement = document.querySelector(".gallery-item");
          const heightKarta = kartaElement.getBoundingClientRect()

            window.scrollBy({
              top: heightKarta.height * 2,
              behavior: "smooth",
                });

                
       })
      .catch(error => {
           offLoading(loader);
           iziToast.error({
                message: `${error}`,
           });
       })
      .finally(() => {
         
      });
        
    }  

//+++++++++++++++++++++++++++++===================================

let gallery = new SimpleLightbox('.list a',
    { 
        captionsData: "alt",
        captionClass: "text-center",
        captionDelay: 250,
        overlayOpacity: 0.8,
    });

gallery.on('show.simplelightbox', function () {
	
});

gallery.on('error.simplelightbox', function (e) {
	console.log(e); 
});


   
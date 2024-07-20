
import axios from "axios";
const BASE_URL = "https://pixabay.com";
const END_POINT = "/api/";

 export async function getImages(keyUser, keyImage, currentPageNumber, per_page) {
        const params = new URLSearchParams({
            key: keyUser,
            q: keyImage,
            image_type: "photo",
            orientation: 'horizontal',
          safesearch: 'true',
          page: `${currentPageNumber}`,
        //  per_page: 15,
           per_page: per_page,
        });
   
        const url = `${BASE_URL}${END_POINT}?${params}`;
    
        const res = await axios.get(url);
                    return res.data;
      
}

    



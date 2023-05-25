import {useState, useEffect} from 'react'
import axios from "axios";

function loadImages() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [api, setApi] = useState([]);
 // eslint-disable-next-line react-hooks/rules-of-hooks
 useEffect(() => {
axios
  .get("https://api.unsplash.com/photos?per_page=20&client_id=l5Vwomjo1s-5hsKfI28vbQlYaz2mJnI3fkSChp_Wx-Y")
  .then((logs) => {
    setApi(logs.data);
  });
 }, []); 

    return api;
}

function searchImages(query,page) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [api, setApi] = useState([]);
 // eslint-disable-next-line react-hooks/rules-of-hooks
 useEffect(() => {
axios
  .get("https://api.unsplash.com/search/photos?page="+page+"&per_page=20&query="+query+"&client_id=l5Vwomjo1s-5hsKfI28vbQlYaz2mJnI3fkSChp_Wx-Y")
  .then((logs) => {
    setApi(logs.data.results);
  });
 }, [query,page]); 

    return api;
}

export {loadImages, searchImages};

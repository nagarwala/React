import { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import Picture from './components/Picture';
import { Circles } from "react-loader-spinner";

function App() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const res = await axios.get("https://api.unsplash.com/photos?per_page=20&client_id=l5Vwomjo1s-5hsKfI28vbQlYaz2mJnI3fkSChp_Wx-Y");
      setNewImages(res.data);
      setLoading(false);
    }
    if(!searchQuery)
    fetchImages();
 }, [searchQuery]);

 useEffect(() => {
  const searchImages = async() => {
      setLoading(true);
    const res = await axios.get(
      "https://api.unsplash.com/search/photos?page="+currentPage+"&per_page=20&query="+searchQuery+"&client_id=l5Vwomjo1s-5hsKfI28vbQlYaz2mJnI3fkSChp_Wx-Y"
      );
      setNewImages(res.data.results);
      setLoading(false);
  }
  if(searchQuery)
  searchImages();
 }, [searchQuery, currentPage])

  const next = () => {
    setCurrentPage(currentPage+1);
  }

  const previous = () => {
    setCurrentPage(currentPage-1);
  }

  const clear = () => {
    setQuery("");
    setSearchQuery("");
    setCurrentPage(1);
  }

  const search = () => {
    setSearchQuery(query);
    setCurrentPage(1);
  }

  return (
    <div className="App">
      <div style={{ padding: "10px" }}>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          style={{ padding: "10px" }}
        />
        <button className="button" onClick={search}>
          Search
        </button>
        <button className="button" onClick={clear}>
          Clear
        </button>
      </div>
       {loading ? 
       <div className="loading">
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" wrapperClass="loading" visible={true}/>
        </div> : 
       <div className="flex-container">
            {newImages.map((img, key) => {
            return <Picture url={img.urls.small} key={key} />;
          })} 
       </div>
          }
      <div style={searchQuery ? { display: "inline-block" } : { display: "none" }} >
        <span style={{ fontSize: "20px" }}>Page: {currentPage} </span>
        <button className="button" onClick={next}>
          Next
        </button>
        <button className="button" onClick={previous}>
          Previous
        </button>
      </div>
    </div>
  );
}

export default App;

import { useParams } from "react-router-dom";
import { useEffect, useState, useReducer } from 'react';
import Header from './Header';
import NewsService from './utils/NewsService';
import NewsItem from './NewsItem';
import NewsReducer from './utils/NewsReducer';
import FavCountContext from "./utils/FavCountContext";

import './css/Category.css';

function Category() {
  const { categoryName } = useParams();
  const [loading, setLoading] = useState(false);
  const [news, dispatch] = useReducer(NewsReducer, []);
  //const [favCount, setFavCount] = useState(0);
  const favCount = news.filter(n => n.isFavourite).length

  useEffect(() => {
    dispatch({ type: 'init' });
    setLoading(true);
    NewsService.getNewsByCategory(categoryName).then(response => {
      dispatch({ type: 'load', data: response.data });
      setLoading(false);
    });

  }, [categoryName]);



  function handleToggleFavourite(newsItemId, isFavourite) {
    dispatch({
      type: 'setFavourite',
      itemId: newsItemId,
      isFavourite: isFavourite
    });
  }

  function clearFavourites() {
    dispatch({
      type: 'clearAllFavourites'
    });
  }

  return (
    <>
      <FavCountContext.Provider value={{ count: favCount, clear: clearFavourites }}>
        <Header />
        <h1>{categoryName} News</h1>
        <div className="news-container">
          {news.map(newsItem => {
            return (<div key={newsItem.id} className="app-news-item">
              <NewsItem newsItem={newsItem} onToggleFavourite={handleToggleFavourite} />
            </div>)
          })}
          {loading ? <div className="loading">Loading...</div> : ""}
        </div>
      </FavCountContext.Provider>
    </>
  );
}

export default Category;

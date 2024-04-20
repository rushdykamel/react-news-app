
function NewsReducer(newsList, action) {
  if (action.type === 'init') {
    return [];
  } else if (action.type === 'load') {
    return action.data;
  } else if (action.type === 'setFavourite') {
    return newsList.map(item => {
      if (item.id === action.itemId) {
        item.isFavourite = action.isFavourite;
      }
      return item;
    });
  } else if (action.type === 'clearAllFavourites') {
    return newsList.map(item => {
      return {...item, isFavourite: false};
    });
  } else return newsList
}

export default NewsReducer;
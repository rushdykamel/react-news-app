import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import FavCountContext from "./utils/FavCountContext";
import newsService from "./utils/NewsService";

function Header() {
  const categories = newsService.getHeaderCategories();
  const {count, clear } = useContext(FavCountContext);

  function handleClear(e) {
    e.preventDefault();
    clear();
  }

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          INSHORT NEWS
        </Link>
      </div>
      <ul>
        {categories.map(cat => {
          return (
            <li key={cat}><NavLink to={'/category/' + cat} className={({ isActive }) =>
            isActive ? "active-link" : ""
          }>{cat}</NavLink></li>
          )
        })}
      </ul>
      <div className="fav-count">★ ({count}) <a href="" onClick={handleClear}>x</a></div>
    </nav>
  );
}

export default Header;

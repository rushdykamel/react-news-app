import useTrimContent from './hooks/useTrimContent'; // custom hook
import './css/NewsItem.css';

function NewsItem({ newsItem, onToggleFavourite }) {
  const [content, setContent] = useTrimContent(newsItem.content);
  const isFavourite = newsItem.isFavourite || false;
  function toggleFavourite(e) {
    e.preventDefault();
    onToggleFavourite(newsItem.id, !isFavourite);
  }

  return (
    <>
      <article className={newsItem.isFavourite ? 'highlighted' : ''}>
        <h4>
          <a href={newsItem.url} target="_blank"> {newsItem.title}</a>
        </h4>
        <h5 data-testid="date">{newsItem.date} {newsItem.time}</h5>
        <a href={newsItem.url} target="_blank">
          <div className="image" style={{ backgroundImage: 'url(' + newsItem.imageUrl + ')' }} title={newsItem.title}></div>
        </a>
        <p data-testid="content">{content}</p>
        <h5 data-testid="author">By: {newsItem.author}</h5>
        {newsItem.readMoreUrl ? <a className="reference" href={newsItem.readMoreUrl} target="_blank">Sources</a> : ""}
        <a href="" onClick={toggleFavourite} className={'favourite ' + (isFavourite ? 'active' : '')}>★</a>
      </article>
    </>
  )
}

export default NewsItem;
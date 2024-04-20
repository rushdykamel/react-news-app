import { cleanup, render, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'

import NewsItem from "../NewsItem";

const newsItemData = {
  author: "Ankush Verma",
  content: `STEMI (ST-elevation myocardial infarction) or widowmaker is the most serious type of heart attack. "A widowmaker heart attack happens when a full blockage of the left anterior descending artery (LAD) occurs. The left anterior descending artery (LAD) supplies 50% of heart muscle blood," Dr Venkatesh TK of Apollo Hospitals said. Heart attacks have become increasingly rampant in recent years.`,
  date: "01 Mar 2023,Wednesday",
  id: "790bc66333e74b12bd663aed7f4bad63",
  imageUrl: "https://static.inshorts.com/inshorts/images/v1/variants/jpg/m/2023/03_mar/1_wed/img_1677650002524_202.jpg?",
  readMoreUrl: null,
  time: "11:49 am",
  title: "What is a widowmaker heart attack?",
  url: "https://www.inshorts.com/en/news/what-is-a-widowmaker-heart-attack-1677651571733"

}

afterEach(cleanup);
describe('News Item', () => {
  it('should show title, author and date', () => {
    const newsItem = render(<NewsItem newsItem={newsItemData} />);

    expect(newsItem.container.querySelector("h4 a")).toContainHTML(newsItemData.title);
    expect(newsItem.getByTestId("date")).toContainHTML(newsItemData.date);
    expect(newsItem.getByTestId("author")).toContainHTML(newsItemData.author);
    expect(newsItem.container.firstChild).not.toHaveClass('highlighted');
  });

  it('should be highlighted when favourite is true', () => {
    const newsItem = render(<NewsItem newsItem={{ ...newsItemData, isFavourite: true }} />);
    expect(newsItem.container.firstChild).toHaveClass('highlighted');
  });


  it('should show read more link when available', () => {
    const newsItem = render(<NewsItem newsItem={{ ...newsItemData, readMoreUrl: 'test-url' }} />);
    expect(newsItem.container.querySelector(".reference")).toBeInTheDocument();
  });

  it('should call toggleFavourtite callback when fav icon is clicked with a toggled value', () => {
    const toggleFavFn = jest.fn();
    let newsItem = render(<NewsItem newsItem={newsItemData}
      onToggleFavourite={toggleFavFn} />);
    fireEvent.click(newsItem.container.querySelector(".favourite"));
    expect(toggleFavFn).toBeCalledWith(newsItemData.id, true);

    newsItem = render(<NewsItem newsItem={{ ...newsItemData, isFavourite: true }}
      onToggleFavourite={toggleFavFn} />);
    fireEvent.click(newsItem.container.querySelector(".favourite"));
    expect(toggleFavFn).toBeCalledWith(newsItemData.id, false);
  });

  it('should show trimmed content when longer than 200 chars', () => {
    const newsItem = render(<NewsItem newsItem={{ ...newsItemData }} />);
    let content = newsItem.getByTestId("content").innerHTML;
    expect(content.length).toBe(203);
    expect(content.indexOf('...')).toBe(200); // add ... at the end
  });

  it('should should original content when less than 200 chars', () => {
    const fakeContent = 'hello world';
    const newsItem = render(<NewsItem newsItem={{ ...newsItemData, content: fakeContent }} />);
    let content = newsItem.getByTestId("content").innerHTML;
    expect(content.length).toBe(fakeContent.length);
    expect(content.indexOf('...')).toBe(-1); // no ... at the end
  });

})
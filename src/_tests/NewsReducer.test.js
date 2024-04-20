import NewsReducer from "../utils/NewsReducer";
import { cleanup } from "@testing-library/react";
import { useReducer } from 'react';

describe('NewsReducer', () => {
  afterEach(cleanup);
  it('should return empty array when init', () => {
    let result = NewsReducer(null, { type: 'init' });
    expect(result.length).toBe(0);
  });

  it('should return all data when loaded', () => {
    let result = NewsReducer([], { data: [{ id: 1 }, { id: 2 }], type: 'load' });
    expect(result.length).toBe(2);
  });

  it('should successfully toggle favourite of a specific item', () => {
    let result = NewsReducer([
      { id: 1, isFavourite: false },
      { id: 2, isFavourite: false }
    ], { itemId: 1, isFavourite: true, type: 'setFavourite' });
    expect(result[0].isFavourite).toBe(true);
    expect(result[1].isFavourite).toBe(false); // second item still unchanged
  });

  it('should successfully clear all favourites', () => {
    let result = NewsReducer([
      { id: 1, isFavourite: true },
      { id: 2, isFavourite: true }
    ], { type: 'clearAllFavourites' });
    expect(result[0].isFavourite).toBe(false);
    expect(result[1].isFavourite).toBe(false);
  });
});
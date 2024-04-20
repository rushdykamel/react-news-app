import { createContext } from 'react'
const FavCountContext = createContext({
  count: 0,
  clear: () => {}
});

export default FavCountContext;
import React from 'react';
import ReactDOM from 'react-dom/client';
import Category from './Category';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import './css/index.css';
import './css/App.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Navigate replace to="/category/all" />
    ),
  },
  {
    path: "/category/:categoryName",
    element: (
      <Category />
    ),
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

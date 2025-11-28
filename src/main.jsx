// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import BestSellerPage from "./pages/BestSellerPage.jsx";
import NewBooksPage from "./pages/NewBooksPage.jsx";
import RecommendPage from "./pages/RecommendPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/bestseller", element: <BestSellerPage /> },
  { path: "/new", element: <NewBooksPage /> },
  { path: "/recommendation", element: <RecommendPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

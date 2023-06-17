import { Routes, Route, Navigate } from "react-router-dom";

import { MainPage } from "./pages/MainPage";
import { FeedPage } from "./pages/FeedPage";

import "./App.css";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

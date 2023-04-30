import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate replace to='/home' />} />
        <Route path="index.html" element={<Navigate replace to='/home' />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="search" element={<SearchBooksPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

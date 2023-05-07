import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";
import { BookCheckoutPage } from "./layouts/BookCheckoutPage/BookCheckoutPage";
import { SpinnerLoading } from "./layouts/Utils/SpinnerLoading";
import { Security, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import oktaConfig from "./configs/oktaConfig";
import LoginWidget from "./auth/LoginWidget";

const oktaAuth = new OktaAuth(oktaConfig.oidc);

export const App: React.FC = () => {
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth: OktaAuth, originalUri: string) => {
    navigate(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="index.html" element={<Navigate replace to="/home" />} />
            <Route path="home" element={<HomePage />} />
            <Route path="search" element={<SearchBooksPage />} />
            <Route path="search/page/:num" element={<SearchBooksPage />} />
            <Route path="search/query/:query" element={<SearchBooksPage />} />
            <Route path="search/query/:query/page/:num" element={<SearchBooksPage />} />
            <Route path="checkout/book/:isbn" element={<BookCheckoutPage />} />
          </Routes>
        </div>
        <Footer />
      </Security>
    </div>
  );
};

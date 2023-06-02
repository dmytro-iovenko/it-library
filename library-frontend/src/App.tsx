import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Navbar } from "./layouts/NavbarAndFooter/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { BookCheckoutPage } from "./layouts/BookCheckoutPage/BookCheckoutPage";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";
import { ReviewListPage } from "./layouts/Utils/ReviewListPage";
import { SpinnerLoading } from "./layouts/Utils/SpinnerLoading";
import { SecureRoutes } from "./layouts/Utils/SecureRoutes";
import { ShelfPage } from "./layouts/ShelfPage/ShelfPage";
import { MessagesPage } from "./layouts/MessagesPage/MessagesPage";
import { AdminPage } from "./layouts/AdminPage/AdminPage";
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
            <Route path="reviewlist/book/:isbn" element={<ReviewListPage />} />
            <Route path="reviewlist/book/:isbn/page/:num" element={<ReviewListPage />} />
            <Route path="checkout/book/:isbn" element={<BookCheckoutPage />} />
            <Route path="login" element={<LoginWidget config={oktaConfig.oidc} />} />
            <Route path="login/callback" element={<LoginCallback loadingElement={<SpinnerLoading />} />} />
            <Route element={<SecureRoutes />}>
              <Route path="shelf" element={<ShelfPage />} />
              <Route path="messages" element={<MessagesPage />} />
              <Route path="messages/page/:num" element={<MessagesPage />} />
              <Route path="admin" element={<Navigate replace to="/admin/messages" />} />
              <Route path="admin/messages" element={<AdminPage />} />
              <Route path="admin/messages/page/:num" element={<AdminPage />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </Security>
    </div>
  );
};

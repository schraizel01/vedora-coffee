const _jsxFileName = "src\\App.tsx";import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from './components/ui';

// Customer Pages (12)
import { HomePage } from './pages/customer/HomePage';
import { MenuPage } from './pages/customer/MenuPage';
import { MenuDetailPage } from './pages/customer/MenuDetailPage';
import { CatsPage } from './pages/customer/CatsPage';
import { CatDetailPage } from './pages/customer/CatDetailPage';
import { PromoPage } from './pages/customer/PromoPage';
import { PromoDetailPage } from './pages/customer/PromoDetailPage';
import { AboutPage } from './pages/customer/AboutPage';
import { ReservationPage } from './pages/customer/ReservationPage';
import { LoginPage, RegisterPage } from './pages/customer/AuthPages';
import { AccountPage } from './pages/customer/AccountPage';

// Admin Pages (7)
import { DashboardPage } from './pages/admin/DashboardPage';
import { AdminMenuPage } from './pages/admin/AdminMenuPage';
import { AdminCatsPage } from './pages/admin/AdminCatsPage';
import { AdminPromoPage } from './pages/admin/AdminPromoPage';
import { AdminReservationsPage } from './pages/admin/AdminReservationsPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

// Status Pages
import { NotFoundPage } from './pages/StatusPages';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    React.createElement(AppProvider, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 41}}
      , React.createElement(BrowserRouter, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 42}}
        , React.createElement(ScrollToTop, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 43}} )
        , React.createElement(Routes, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 44}}
          /* Customer Routes */
          , React.createElement(Route, { path: "/", element: React.createElement(HomePage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 46}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 46}} )
          , React.createElement(Route, { path: "/menu", element: React.createElement(MenuPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 47}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 47}} )
          , React.createElement(Route, { path: "/menu/:slug", element: React.createElement(MenuDetailPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 48}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 48}} )
          , React.createElement(Route, { path: "/kucing", element: React.createElement(CatsPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 49}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 49}} )
          , React.createElement(Route, { path: "/kucing/:slug", element: React.createElement(CatDetailPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 50}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 50}} )
          , React.createElement(Route, { path: "/promo", element: React.createElement(PromoPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 51}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 51}} )
          , React.createElement(Route, { path: "/promo/:slug", element: React.createElement(PromoDetailPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 52}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 52}} )
          , React.createElement(Route, { path: "/tentang", element: React.createElement(AboutPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 53}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 53}} )
          , React.createElement(Route, { path: "/reservasi", element: React.createElement(ReservationPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 54}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 54}} )
          , React.createElement(Route, { path: "/masuk", element: React.createElement(LoginPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 55}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 55}} )
          , React.createElement(Route, { path: "/daftar", element: React.createElement(RegisterPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 56}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 56}} )
          , React.createElement(Route, { path: "/akun", element: React.createElement(AccountPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 57}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 57}} )

          /* Admin Routes */
          , React.createElement(Route, { path: "/admin", element: React.createElement(DashboardPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 60}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 60}} )
          , React.createElement(Route, { path: "/admin/menu", element: React.createElement(AdminMenuPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 61}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 61}} )
          , React.createElement(Route, { path: "/admin/kucing", element: React.createElement(AdminCatsPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 62}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 62}} )
          , React.createElement(Route, { path: "/admin/promo", element: React.createElement(AdminPromoPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 63}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 63}} )
          , React.createElement(Route, { path: "/admin/reservasi", element: React.createElement(AdminReservationsPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 64}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 64}} )
          , React.createElement(Route, { path: "/admin/ulasan", element: React.createElement(AdminReviewsPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 65}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 65}} )
          , React.createElement(Route, { path: "/admin/pengaturan", element: React.createElement(AdminSettingsPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 66}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 66}} )

          /* Fallback 404 */
          , React.createElement(Route, { path: "*", element: React.createElement(NotFoundPage, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 69}} ), __self: this, __source: {fileName: _jsxFileName, lineNumber: 69}} )
        )
        , React.createElement(ToastContainer, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 71}} )
      )
    )
  );
}

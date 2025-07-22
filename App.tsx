import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import ProductFormPage from './pages/ProductFormPage';
import AboutPage from './pages/AboutPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen font-sans bg-brand-background text-brand-primary">
      {!isAdminRoute && <Header />}
      <main className={`flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Admin routes are rendered without the main layout's header/footer */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/product/:id" element={<ProductFormPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
      {/* Spacer div for the fixed bottom nav. h-24 = 6rem, matches original pb-24 for layout consistency. */}
      {!isAdminRoute && <div className="h-24" />}
      {!isAdminRoute && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
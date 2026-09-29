import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderCustomizerModal } from './components/OrderCustomizerModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ReservationModal } from './components/ReservationModal';
import { BrandNameModal } from './components/BrandNameModal';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { StoryPage } from './pages/StoryPage';
import { MenuPage } from './pages/MenuPage';
import { CoffeeCollectionPage } from './pages/CoffeeCollectionPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';
import { OrderPage } from './pages/OrderPage';

const MainContent: React.FC = () => {
  const { activePage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'story':
        return <StoryPage />;
      case 'menu':
        return <MenuPage />;
      case 'coffee':
        return <CoffeeCollectionPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'contact':
        return <ContactPage />;
      case 'order':
        return <OrderPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#3D2B1F] font-sans antialiased selection:bg-[#C68E5C]/30 selection:text-[#3D2B1F]">
      <Navbar />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <OrderCustomizerModal />
      <CheckoutModal />
      <ReservationModal />
      <BrandNameModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

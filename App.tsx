import React, { useState, useEffect } from 'react';
import Home from './components/HomePage';
import { Header } from './components/Header';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import { Footer } from './components/Footer';
import { products } from './data/products';
import { CartProvider } from './context/CartContext';

// New Pages
// import { About } from './pages/About';
import Technology from './pages/Technology';
// import { Contact } from './pages/Contact';
// import { Checkout } from './pages/Checkout';
// import { Careers } from './pages/Careers';
// import { Press } from './pages/Press';
// import { FAQ } from './pages/FAQ';
// import { Downloads } from './pages/Downloads';
// import { Privacy } from './pages/Privacy';
// import { Terms } from './pages/Terms';
// import { Patents } from './pages/Patents';

function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0); // Scroll to top on page change
    };

    window.addEventListener('hashchange', handleHashChange);
    // Set initial route
    handleHashChange();
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    if (route.startsWith('#shop/')) {
      const productId = route.split('/')[1];
      const product = products.find(p => p.id === productId);
      return product ? <ProductDetail product={product} /> : <Shop />;
    }

    switch (route) {
      case '#shop':
        return <Shop />;
      case '#cart':
        return <Cart />;
      // case '#about':
      //   return <About />;
      case '#technology':
        return <Technology />;
      // case '#careers':
      //   return <Careers />;
      // case '#contact':
      //   return <Contact />;
      // case '#checkout':
      //   return <Checkout />;
      // case '#press':
      //   return <Press />;
      // case '#faq':
      //   return <FAQ />;
      // case '#downloads':
      //   return <Downloads />;
      // case '#privacy':
      //   return <Privacy />;
      // case '#terms':
      //   return <Terms />;
      // case '#patents':
      //   return <Patents />;
      case '#/':
      case '':
        return <Home />;
      default:
        // Redirect to home for unknown routes
        window.location.hash = '#/';
        return <Home />;
    }
  };
  
  return (
    <CartProvider>
      <div className="w-full min-h-screen flex flex-col bg-sky-dark selection:bg-sky-blue selection:text-sky-dark">
        <Header />
        <main className="flex-grow w-full">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;

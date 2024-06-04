import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ProductList } from './components/productList';
import Cart from './components/cart';
import '../src/index.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      setCartItems(cartItems.map((item) =>
        item.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id) => {
    const exist = cartItems.find((item) => item.id === id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems(cartItems.map((item) =>
        item.id === id ? { ...exist, quantity: exist.quantity - 1 } : item
      ));
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Router>
      <div className='App'>
        <nav className='navbar'>
          <div className='nav-links'>
            <Link className='home' to="/">Home</Link>
            <Link className='carrito' to="/cart">Carrito ({cartItems.length})</Link>
          </div>
         
        </nav>
        
        <h1 className='title'>Shop</h1>
       
        <Routes>
          <Route exact path="/" element={<ProductList onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import '../index.css';
import '../App.css';

const Cart = ({ cartItems, onRemoveFromCart }) => {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <div className='container-products'> 
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio: ${item.price}</p>
                <button onClick={() => onRemoveFromCart(item.id)}>Eliminar</button>
              </div>
            ))}
          </div>
          <div className="total">
            <strong>Total: ${totalAmount.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
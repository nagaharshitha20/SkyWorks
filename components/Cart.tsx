import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      // The price is a string like '$2,499', we need to parse it to a number.
      const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
      return total + (numericPrice * item.quantity);
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8 text-sky-light animate-fade-in max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-white drop-shadow-md">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="bg-sky-surface p-6 rounded-xl flex flex-col items-center justify-center border border-white/5">
           <ion-icon name="cart-outline" class="text-5xl text-sky-gray mb-3"></ion-icon>
           <p className="text-base text-sky-gray">Your cart is currently empty.</p>
           <a href="#shop" className="mt-4 px-6 py-2 bg-sky-blue text-sky-dark rounded-full text-sm font-bold hover:bg-white hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all">
             Continue Shopping
           </a>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart Items List */}
          <div className="md:w-2/3 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-sky-surface p-4 rounded-xl border border-transparent hover:border-sky-gray transition-colors duration-300">
                <img src={item.imgSrc} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                
                <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                  <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-sky-blue font-medium text-sm">{item.price}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white text-sm"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 sm:mt-0 p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors flex items-center justify-center"
                >
                  <ion-icon name="trash-outline" class="text-lg"></ion-icon>
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="md:w-1/3">
            <div className="bg-sky-surface p-6 rounded-xl border border-white/5 sticky top-24 shadow-lg text-sm">
              <h2 className="text-lg font-bold mb-4 text-white border-b border-white/10 pb-3">Order Summary</h2>
              
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sky-gray">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${calculateTotal().toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-sky-gray">
                  <span>Shipping</span>
                  <span className="text-sky-blue">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t border-sky-gray/20 pt-4 mb-6 flex justify-between items-center">
                <span className="text-base font-bold text-white">Total</span>
                <span className="text-xl font-bold text-sky-blue">
                  ${calculateTotal().toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
              </div>
              
              <button className="w-full py-2.5 bg-sky-blue text-sky-dark rounded-full font-bold text-sm uppercase tracking-wide hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all mb-3">
                Proceed to Checkout
              </button>
              
              <button 
                onClick={clearCart}
                className="w-full py-2 bg-transparent text-sky-gray hover:text-white transition-colors uppercase tracking-wider text-xs font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

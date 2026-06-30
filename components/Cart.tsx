import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g,""));
      return total + (numericPrice * item.quantity);
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-24 text-gray-mid max-w-4xl min-h-[70vh] flex flex-col flex-grow">
      <h1 className="text-3xl font-condensed font-extrabold mb-8 text-black uppercase">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-[4px] border border-gray-border flex flex-col items-center justify-center shadow-sm">
           <ion-icon name="cart-outline" class="text-5xl text-gray-400 mb-4"></ion-icon>
           <p className="text-base text-gray-mid mb-6">Your cart is currently empty.</p>
           <a href="#shop" className="btn-primary cursor-pointer text-center">
             Continue Shopping
           </a>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart Items List */}
          <div className="md:w-2/3 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-[4px] border border-gray-border shadow-sm">
                <img src={item.imgSrc} alt={item.name} className="w-20 h-20 object-cover rounded shadow" />
                
                <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                  <h3 className="text-lg font-bold text-black mb-1">{item.name}</h3>
                  <p className="text-yellow font-semibold text-sm">{item.price}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-border bg-white hover:border-yellow flex items-center justify-center text-black text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-border bg-white hover:border-yellow flex items-center justify-center text-black text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 sm:mt-0 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center cursor-pointer border-none bg-transparent"
                >
                  <ion-icon name="trash-outline" class="text-lg"></ion-icon>
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="md:w-1/3">
            <div className="bg-white p-6 rounded-[4px] border border-gray-border sticky top-24 shadow-sm text-sm">
              <h2 className="text-lg font-bold mb-4 text-black border-b border-gray-border pb-3">Order Summary</h2>
              
              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-gray-mid">
                  <span>Subtotal</span>
                  <span className="text-black font-semibold">${calculateTotal().toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between text-gray-mid">
                  <span>Shipping</span>
                  <span className="text-yellow font-semibold">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t border-gray-border pt-4 mb-6 flex justify-between items-center">
                <span className="text-base font-bold text-black">Total</span>
                <span className="text-xl font-condensed font-extrabold text-black">
                  ${calculateTotal().toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
              </div>
              
              <button className="btn-primary w-full text-center cursor-pointer mb-3">
                Proceed to Checkout
              </button>
              
              <button 
                onClick={clearCart}
                className="btn-ghost w-full text-center cursor-pointer"
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

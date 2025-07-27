import { ShoppingBag, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const CartPage = () => {
  const [items, setItems] = useState([{
      id: 1,
      category: 'WOMEN',
      name: 'Floral Print Wrap Dress',
      color: 'Blue',
      size: '42',
      price: 30.50,
      quantity: 1,
    },
    {
      id: 1,
      category: 'WOMEN',
      name: 'Floral Print Wrap Dress',
      color: 'Blue',
      size: '42',
      price: 30.50,
      quantity: 1,
    },
    {
      id: 1,
      category: 'WOMEN',
      name: 'Floral Print Wrap Dress',
      color: 'Blue',
      size: '42',
      price: 30.50,
      quantity: 1,
    },
    {
      id: 1,
      category: 'WOMEN',
      name: 'Floral Print Wrap Dress',
      color: 'Blue',
      size: '42',
      price: 30.50,
      quantity: 1,
    },
    
    {
      id: 1,
      category: 'WOMEN',
      name: 'Floral Print Wrap Dress',
      color: 'Blue',
      size: '42',
      price: 30.50,
      quantity: 1,
    },
    {
      id: 2,
      category: 'WOMEN',
      name: 'Floral Print Wrap Dress',
      color: 'Blue',
      size: '42',
      price: 20.50,
      quantity: 2,
    }
  ]);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(4.50);
  const [shipping, setShipping] = useState(0);

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTotal = subtotal - discount + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="w-5 h-5" />
        <h1 className="text-xl font-bold">Shopping Bag</h1>
        <span className="text-sm text-gray-500 ml-2">{items.length} items in your bag.</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Items */}
        <div className="lg:w-2/3">
          {items.map((item, index) => (
            <div key={item.id} className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Product Image Placeholder */}
                <div className="w-32 h-40 bg-gray-100 flex-shrink-0"></div>
                
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">{item.category}</p>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">Color • {item.color}</p>
                      <p className="text-sm text-gray-600">Size • {item.size}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-gray-600 h-6"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-lg font-medium">${item.price.toFixed(2)}</div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-lg font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-6 rounded">
            <h2 className="text-lg font-bold mb-4">Cart Total</h2>
            
            {/* Shipping */}
            {/* <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Calculated Shipping</h3>
              <div className="space-y-3">
                <div className="relative">
                  <select className="w-full p-2 border border-gray-300 rounded text-sm appearance-none">
                    <option>Country</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <div className="relative">
                  <select className="w-full p-2 border border-gray-300 rounded text-sm appearance-none">
                    <option>State / City</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="ZIP Code" 
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Coupon Code */}
            {/* <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Coupon Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow p-2 border border-gray-300 rounded text-sm"
                  placeholder="Enter coupon code"
                />
                <button className="px-4 py-2 bg-black text-white text-sm rounded hover:bg-gray-800">
                  Apply
                </button>
              </div>
            </div> */} 
            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between py-2">
                <span className="text-sm">Cart Subtotal</span>
                <span className="text-sm">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm">Discount</span>
                <span className="text-sm text-green-600">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm">Shipping</span>
                <span className="text-sm">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between py-4 border-t border-gray-200 font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 mt-4">
              Place Order
            </button>

            <p className="text-xs text-gray-500 mt-6 text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Design by Fluttertop
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
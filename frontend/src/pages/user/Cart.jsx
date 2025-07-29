import CartContext from "@/context/CartContext";
import { ShoppingBag, X } from "lucide-react";
import { useContext, useState } from "react";

const CartPage = () => {
  const cart = useContext(CartContext);

  const [discount, setDiscount] = useState(0); // Default 0
  const [shipping, setShipping] = useState(0); // Default 0
  // console.log(cart.cartItems[0].product.price);
  
  const subtotal = cart.cartItems.reduce(
    (sum, item) => sum + item.product?.price * item.quantity,
    0
  );
  const cartTotal = subtotal - discount + shipping;

  const handleRemove = (id) => {
    cart.removeFromCart(id);
  };

  const handleQuantityChange = (id, newQty) => {
    if (newQty >= 1) {
      cart.updateCartItemQuantity(id, newQty);
    }
  };

  if (cart.loading) return <p className="p-8 text-center">Loading cart...</p>;
  if (cart.error)
    return <p className="p-8 text-center text-red-500">Error: {cart.error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="w-5 h-5" />
        <h1 className="text-xl font-bold">Shopping Bag</h1>
        <span className="text-sm text-gray-500 ml-2">
          {cart.cartItems.length} items in your bag.
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Items */}
        <div className="lg:w-2/3">
          {cart.cartItems.map((item) => (
            <div key={item._id} className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-32 h-40 bg-gray-100 flex-shrink-0">
                  <img
                    src={item.product.images}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-medium">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Description • {item.product.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="text-gray-400 hover:text-gray-600 h-6"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-lg font-medium">
                      ${(item.product.price / 100).toFixed(2)}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.product._id, item.quantity - 1)
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.product._id, item.quantity + 1)
                          }
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-lg font-medium">
                        $
                        {((item.product.price * item.quantity) / 100).toFixed(
                          2
                        )}
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

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between py-2">
                <span className="text-sm">Cart Subtotal</span>
                <span className="text-sm">${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm">Discount</span>
                <span className="text-sm text-green-600">
                  -${(discount / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm">Shipping</span>
                <span className="text-sm">
                  {shipping === 0 ? "Free" : `$${(shipping / 100).toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between py-4 border-t border-gray-200 font-bold">
                <span>Total</span>
                <span>${(cartTotal / 100).toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 mt-4">
              Place Order
            </button>

            <p className="text-xs text-gray-500 mt-6 text-center">
              Secure checkout powered by XYZ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

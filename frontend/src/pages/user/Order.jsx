import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";


const Order = () => {
  const { cartItems, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const items = cartItems.map(item => ({
        product: item.productId,
        quantity: item.quantity,
      }));

      const orderData = {
        items,
        shippingAddress,
        paymentMethod,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      clearCart();
      // Handle success (e.g., show confirmation, redirect, etc.)
    } catch (error) {
      console.error("Order placement error:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-4">Place Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center">
            Order Summary
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              {/* Shipping Address Section */}
              <div className="space-y-2">
                <h3 className="font-medium">Shipping Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="street">Street</Label>
                    <Input
                      id="street"
                      name="street"
                      value={shippingAddress.street}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="zip">ZIP/Postal Code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      value={shippingAddress.zip}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleAddressChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="space-y-2">
                <h3 className="font-medium">Payment Method</h3>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit_card" id="credit_card" />
                    <Label htmlFor="credit_card">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                    <Label htmlFor="bank_transfer">Bank Transfer</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Order Items Summary */}
              <div className="space-y-2">
                <h3 className="font-medium">Order Items</h3>
                <div className="border rounded-lg divide-y">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="p-4 flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        ${(item.price * item.quantity / 100).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-medium text-lg pt-2">
                  <span>Total:</span>
                  <span>
                    $
                    {(
                      cartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      ) / 100
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <Button type="submit" className="w-full mt-4">
                Confirm Order
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Order;
import { ShoppingBag } from "lucide-react";
import React, { useContext, useState } from "react";
import { useCart } from "../../context/CartContext";
import { addItemToCart } from "@/services/cartApi";
import UserContext from "@/context/UserContext";
const LandingPageCard = ({ title, price, image }) => {
  const { loading, refreshCart } = useCart();
  const handleAddToCart = async () => {
    try {
      console.log("Sending to cart:", {
        productId: id,
        quantity: 1,
      });

      await addItemToCart({
        productId: id,
        quantity: 1,
      });

      if (refreshCart) refreshCart(); // Optional: refresh context state
      console.log("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };
  const user = useContext(UserContext);
  console.log(user?.user?.data);
  
  return (
    <div className="relative group overflow-hidden rounded-lg aspect-[3/4] w-full">
      <img
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        src={image}
        alt={title}
      />
      <button
        onClick={handleAddToCart}
        className="absolute top-3 right-3 z-20 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-200"
      >
        <ShoppingBag className="w-4 h-4 text-gray-800" />
      </button>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-5 group-hover:translate-y-0 transition-transform duration-300">
        <h2 className="text-xl font-bold tracking-tight mb-1">{title}</h2>
        <p className="text-lg font-medium">{price}</p>
      </div>
    </div>
  );
};

const Landing = () => {
  // Sample product data
  const trendingProducts = [
    {
      title: "Summer Linen Shirt",
      price: "$49.99",
      image: "/middle-right-1.jpg",
    },
    { title: "Canvas Sneakers", price: "$79.99", image: "/middle-right-1.jpg" },
    { title: "Wide Brim Hat", price: "$34.99", image: "/middle-right-1.jpg" },
    { title: "Chino Shorts", price: "$45.99", image: "/middle-right-1.jpg" },
  ];

  const newArrivals = [
    { title: "Silk Blend Tee", price: "$59.99", image: "/middle-right-1.jpg" },
    { title: "Woven Sandals", price: "$89.99", image: "/middle-right-1.jpg" },
    { title: "Crochet Bag", price: "$64.99", image: "/middle-right-1.jpg" },
    { title: "Denim Jacket", price: "$99.99", image: "/middle-right-1.jpg" },
  ];

  const bestSellers = [
    {
      title: "Classic White Sneakers",
      price: "$89.99",
      image: "/middle-right-1.jpg",
    },
    {
      title: "Oversized Sunglasses",
      price: "$29.99",
      image: "/middle-right-1.jpg",
    },
    { title: "Linen Pants", price: "$69.99", image: "/middle-right-1.jpg" },
    { title: "Knit Cardigan", price: "$79.99", image: "/middle-right-1.jpg" },
  ];

  return (
    <div className="max-w-screen mx-auto p-4">
      {/* Image Grid */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Main Image */}
        <div className="md:w-2/3">
          <div className="h-[500px] w-full rounded-2xl overflow-hidden">
            <img
              src="/top-left.jpg"
              alt="Main summer outfit"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Side Images */}
        <div className="md:w-1/3 flex flex-col gap-4">
          <div className="h-[240px] w-full rounded-2xl overflow-hidden">
            <img
              src="/top-right-up.jpg"
              alt="Summer outfit detail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[240px] w-full rounded-2xl overflow-hidden">
            <img
              src="/top-right-down.jpg"
              alt="Summer outfit accessory"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Lower part */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="md:w-1/3">
          <h1 className="text-4xl font-bold">Casual Inspiration</h1>
          <p className="mt-2 text-gray-600">
            Our Favourite combination for casual outfit that can inspire you to
            apply on your daily activity
          </p>
        </div>
        <div className="md:w-1/3 h-[200px] rounded-2xl overflow-hidden">
          <img
            src="/middle-right-1.jpg"
            className="w-full h-full object-cover"
            alt="Casual outfit 1"
          />
        </div>
        <div className="md:w-1/3 h-[200px] rounded-2xl overflow-hidden">
          <img
            src="/middle-right-2.jpg"
            className="w-full h-full object-cover"
            alt="Casual outfit 2"
          />
        </div>
      </div>

      <hr className="mt-8 mb-8 border-gray-200" />

      {/* Product Sections */}
      <div className="space-y-12 flex-wrap">
        {/* Trending Now */}
        <section>
          <h2 className="text-2xl  font-bold mb-6">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map((product, index) => (
              <LandingPageCard
                key={`trending-${index}`}
                title={product.title}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </section>

        {/* New Arrivals */}
        <section>
          <h2 className="text-2xl font-bold mb-6">New Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((product, index) => (
              <LandingPageCard
                key={`new-${index}`}
                title={product.title}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </section>

        {/* Best Sellers */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Best Sellers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellers.map((product, index) => (
              <LandingPageCard
                key={`best-${index}`}
                title={product.title}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </section>
        <section className="mb-16">
          <Newsletter />
        </section>
      </div>
    </div>
  );
};
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-gray-100 text-white py-16 px-4 rounded-xl">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl text-black font-bold mb-2">
          Join Our Newsletter
        </h2>
        <p className="mb-8 text-black ">
          Get 10% off your first order and stay updated with our latest arrivals
          and offers.
        </p>

        {isSubmitted ? (
          <div className="bg-green-900 bg-opacity-30 p-4 rounded-lg">
            <p className="text-green-300">
              Thank you for subscribing! Check your email for confirmation.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow rounded-full px-6 py-3 bg-gray-300 text-white placeholder-black focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="bg-white text-black font-medium rounded-full px-6 py-3 hover:bg-gray-200 transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Landing;

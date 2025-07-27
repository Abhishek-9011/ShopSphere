import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import React from "react";

const Products = () => {
  return (
    <div className="flex min-h-screen">
      {/* Filter Section - Sidebar */}
      <div className="w-72 bg-gray-100 p-4 border-r border-gray-50">
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="checkbox" />
              <span>$0 - $25</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="checkbox" />
              <span>$25 - $50</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Products</h1>
          <div>
            <select className="select select-bordered">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(7)].map((_, i) => (
            <ProductCard />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <div className="join">
            <button className="join-item btn">«</button>
            <button className="join-item btn btn-active">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

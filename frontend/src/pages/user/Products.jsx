import ProductCard from "@/components/ProductCard";
import ProductContext from "@/context/ProductContext";
import React, { useState, useContext } from "react";

const Products = () => {
  const { products: productsData, loading, error, refreshProducts } = useContext(ProductContext);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [],
    categories: []
  });

  // Safely access products array (handle both direct array and nested { products: [] } cases)
  const products = Array.isArray(productsData) 
    ? productsData 
    : productsData?.products || [];
  
  // Apply filters to products with additional safety checks
  const filteredProducts = products.filter(product => {
    if (!product) return false;
    
    // Price range filter
    const priceMatch = filters.priceRange.length === 0 || 
      filters.priceRange.some(range => {
        const price = product.price || 0;
        if (range === '0-25') return price <= 25;
        if (range === '25-50') return price > 25 && price <= 50;
        if (range === '50-100') return price > 50 && price <= 100;
        if (range === '100+') return price > 100;
        return true;
      });
    
    // Category filter
    const categoryMatch = filters.categories.length === 0 || 
      filters.categories.includes(product.category);
    
    return priceMatch && categoryMatch;
  });

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error m-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading products: {error}</span>
      </div>
    );
  }

  // Additional check if products array is empty
  if (!loading && products.length === 0) {
    return (
      <div className="alert alert-warning m-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>No products available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden p-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-bold">All Products</h1>
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="btn btn-sm"
        >
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter Section - Sidebar */}
      <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block w-full md:w-64 lg:w-72 bg-gray-100 p-4 border-r border-gray-200`}>
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price Range</h3>
          <div className="space-y-2">
            {[
              { value: '0-25', label: '$0 - $25' },
              { value: '25-50', label: '$25 - $50' },
              { value: '50-100', label: '$50 - $100' },
              { value: '100+', label: 'Over $100' }
            ].map((range) => (
              <label key={range.value} className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-sm md:checkbox-md"
                  checked={filters.priceRange.includes(range.value)}
                  onChange={() => handleFilterChange('priceRange', range.value)}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Categories</h3>
          <div className="space-y-2">
            {['Electronics', 'Clothing', 'Home & Garden'].map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-sm md:checkbox-md"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleFilterChange('categories', category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-4 md:p-6">
        <div className="hidden md:flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Products ({filteredProducts.length})</h1>
          <div>
            <select className="select select-bordered select-sm md:select-md">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Mobile sort dropdown */}
        <div className="md:hidden mb-4">
          <select className="select select-bordered w-full select-sm">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                title={product.name}
                image={product.images}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg">No products match your filters</p>
            <button 
              onClick={() => setFilters({ priceRange: [], categories: [] })}
              className="btn btn-link mt-2"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6 md:mt-8">
          <div className="join">
            <button className="join-item btn btn-sm md:btn-md">«</button>
            <button className="join-item btn btn-sm md:btn-md btn-active">1</button>
            <button className="join-item btn btn-sm md:btn-md">2</button>
            <button className="join-item btn btn-sm md:btn-md">3</button>
            <button className="join-item btn btn-sm md:btn-md">»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
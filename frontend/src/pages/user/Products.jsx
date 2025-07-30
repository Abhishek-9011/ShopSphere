import ProductCard from "@/components/ProductCard";
import ProductContext from "@/context/ProductContext";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import Pagination from "@/components/Pagination";
import React, { useState, useContext } from "react";

const Products = () => {
  const { products: productsData, loading, error, refreshProducts } = useContext(ProductContext);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [],
    categories: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('featured');
  const productsPerPage = 8;

  const products = Array.isArray(productsData) 
    ? productsData 
    : productsData?.products || [];
  
  // Filter products first
  let filteredProducts = products.filter(product => {
    if (!product) return false;
    
    const priceMatch = filters.priceRange.length === 0 || 
      filters.priceRange.some(range => {
        const price = product.price || 0;
        if (range === '0-25') return price <= 25;
        if (range === '25-50') return price > 25 && price <= 50;
        if (range === '50-100') return price > 50 && price <= 100;
        if (range === '100+') return price > 100;
        return true;
      });
    
    const categoryMatch = filters.categories.length === 0 || 
      filters.categories.includes(product.category);
    
    return priceMatch && categoryMatch;
  });

  // Sort products based on selected option
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return (a.price || 0) - (b.price || 0);
      case 'price-high-low':
        return (b.price || 0) - (a.price || 0);
      default:
        return 0; // Default or 'featured' - no sorting
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value]
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="alert alert-error m-4">Error loading products: {error}</div>;
  if (!loading && products.length === 0) return <div className="alert alert-warning m-4">No products available</div>;

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
        <PriceRangeFilter 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white p-4 md:p-6">
        <div className="hidden md:flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Products ({filteredProducts.length})</h1>
          <div>
            <select 
              className="select select-bordered select-sm md:select-md"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {currentProducts.map((product) => (
              <ProductCard 
                key={product._id}
                id={product._id} 
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
        {filteredProducts.length > productsPerPage && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
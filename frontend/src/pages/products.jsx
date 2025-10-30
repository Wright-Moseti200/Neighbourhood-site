import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { contextdata } from '../context/context';

const Products = () => {
  // Get functions and state from the context
  const { getProducts, loading, error } = useContext(contextdata);

  // Local state to store products fetched from the backend
  const [productsList, setProductsList] = useState([]);
  
  // State to manage how many items are visible
  const [visibleItems, setVisibleItems] = useState(4);

  // Fetch products when the component mounts - ONLY ONCE
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      if (response.success) {
        setProductsList(response.products);
      } else {
        console.error("Failed to fetch products:", response.message);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once on mount

  // Function to show more items
  const loadMore = () => {
    setVisibleItems((prevCount) => prevCount + 4);
  };

  // Helper function to format price
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `Ksh ${price.toLocaleString()}`;
    }
    return price;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Local Products</h1>
          <p className="text-lg md:text-xl opacity-90">
            Discover quality products from businesses in your neighborhood
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Handle Loading State */}
        {loading && (
          <div className="text-center text-lg">Loading products...</div>
        )}

        {/* Handle Error State (prints error to UI) */}
        {!loading && error && (
          <div className="text-center text-lg text-red-600">
            Error: {error}
          </div>
        )}

        {/* Handle No Products Found */}
        {!loading && !error && productsList.length === 0 && (
          <div className="text-center text-lg text-gray-600">
            No products found at the moment.
          </div>
        )}

        {/* Display Products Grid */}
        {!loading && !error && productsList.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-7xl">
              {productsList.slice(0, visibleItems).map(product => (
                <Link 
                  to={`/preview?type=product&id=${product._id}`} 
                  key={product._id} 
                  className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition min-w-[280px]"
                >
                  <img src={product.image_url} alt={product.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500"></span> 
                    </div>
                    <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">{product.title}</h3>
                    <p className="text-xs text-gray-600 mb-3 flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {product.location}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-800">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              {visibleItems < productsList.length && (
                <button 
                  onClick={loadMore}
                  className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Load More Products
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Products;
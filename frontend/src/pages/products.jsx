import React from 'react'

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Fresh Avocados (1kg)",
      location: "Njoro",
      price: "KSh 150",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
      date: "1 day ago"
    },
    {
      id: 2,
      name: "Handmade Kiondo Basket",
      location: "Nakuru Town",
      price: "KSh 800",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
      date: "3 days ago"
    },
    {
      id: 3,
      name: "Dairy Milk (5L)",
      location: "Molo",
      price: "KSh 300",
      bargainable: false,
      available: false,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",
      date: "4 days ago"
    },
    {
      id: 4,
      name: "Wooden Coffee Table",
      location: "Pipeline, Nakuru",
      price: "KSh 5,500",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=300&fit=crop",
      date: "6 days ago"
    },
    {
      id: 5,
      name: "Organic Tomatoes (2kg)",
      location: "Bahati",
      price: "KSh 120",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=300&fit=crop",
      date: "1 week ago"
    },
    {
      id: 6,
      name: "Maasai Beaded Jewelry",
      location: "Nakuru CBD",
      price: "KSh 1,200",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
      date: "1 week ago"
    },
    {
      id: 7,
      name: "Laptop Backpack",
      location: "Milimani",
      price: "KSh 2,000",
      bargainable: false,
      available: false,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      date: "2 weeks ago"
    },
    {
      id: 8,
      name: "Fresh Honey (500ml)",
      location: "Menengai",
      price: "KSh 450",
      bargainable: true,
      available: true,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784838?w=400&h=300&fit=crop",
      date: "2 weeks ago"
    }
  ]

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-7xl">
          {products.map(product => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition min-w-[280px]">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">{product.date}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-3 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {product.location}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-green-800">{product.price}</span>
                  {product.bargainable && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      Bargainable
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default Products
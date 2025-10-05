import React from 'react'

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "Nakuru County Launches Free Wi-Fi in CBD",
      location: "Nakuru CBD",
      description: "The county government has installed free public Wi-Fi hotspots across the central business district to boost digital connectivity.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Lake Nakuru Water Levels Rising",
      location: "Lake Nakuru",
      description: "Conservationists report increased water levels at Lake Nakuru National Park, attracting more flamingos to the area.",
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=300&fit=crop",
      date: "5 days ago"
    },
    {
      id: 3,
      title: "New Market Opens in Milimani",
      location: "Milimani, Nakuru",
      description: "A modern farmers market has opened its doors, providing fresh produce and local goods to residents.",
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=300&fit=crop",
      date: "1 week ago"
    },
    {
      id: 4,
      title: "Nakuru Tech Hub Hosts Startup Weekend",
      location: "Nakuru Town",
      description: "Young entrepreneurs gathered for a 3-day intensive program to develop innovative business solutions.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
      date: "1 week ago"
    },
    {
      id: 5,
      title: "Menengai Crater Road Upgrade Complete",
      location: "Menengai, Nakuru",
      description: "The newly upgraded road to Menengai Crater is now open, making the tourist destination more accessible to visitors.",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
      date: "2 weeks ago"
    },
    {
      id: 6,
      title: "School Feeding Program Expands",
      location: "Nakuru County",
      description: "The county government announces expansion of the school feeding program to cover 50 more schools across the region.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
      date: "2 weeks ago"
    },
    {
      id: 7,
      title: "Nakuru Railway Station Renovation Begins",
      location: "Nakuru Town",
      description: "Major renovation works have begun at the historic Nakuru Railway Station to modernize facilities and improve passenger experience.",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&h=300&fit=crop",
      date: "3 weeks ago"
    },
    {
      id: 8,
      title: "Youth Sports Tournament Kicks Off",
      location: "Afraha Stadium",
      description: "Over 500 young athletes from across Nakuru County participate in the annual inter-school sports competition at Afraha Stadium.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
      date: "3 weeks ago"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Local News</h1>
          <p className="text-lg md:text-xl opacity-90">
            Stay updated with the latest happenings in your neighborhood
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 max-w-7xl">
          {newsItems.map(news => (
            <div key={news.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition min-w-[280px]">
              <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">{news.date}</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2 text-sm md:text-base">{news.title}</h3>
                <p className="text-xs text-gray-600 mb-2 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {news.location}
                </p>
                <p className="text-xs text-gray-600 line-clamp-2">{news.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center">
          <button className="bg-green-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
            Load More News
          </button>
        </div>
      </div>
    </div>
  )
}

export default News
import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-green-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Neighbourhood KE</h1>
          <p className="text-lg md:text-xl opacity-90">
            Building stronger communities, one connection at a time
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto">
            Neighbourhood KE is dedicated to connecting communities across Nakuru and Kenya. 
            We believe that strong neighborhoods are built on trust, communication, and mutual support. 
            Our platform empowers residents to stay informed, discover local opportunities, and engage 
            with their community in meaningful ways.
          </p>
        </div>

        {/* What We Do Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition">
              <div className="w-14 h-14 bg-green-800 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Share Local News</h3>
              <p className="text-gray-600">
                Stay informed about what's happening in your neighborhood. From community events 
                to important announcements, we keep you connected to local stories that matter.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition">
              <div className="w-14 h-14 bg-green-800 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Discover Local Products</h3>
              <p className="text-gray-600">
                Support local businesses and find quality products right in your neighborhood. 
                From fresh produce to handmade goods, discover what your community has to offer.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition">
              <div className="w-14 h-14 bg-green-800 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-3">Find Job Opportunities</h3>
              <p className="text-gray-600">
                Connect with local employers and find opportunities close to home. Whether you're 
                seeking employment or offering positions, we bridge the gap between talent and opportunity.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16 bg-gray-50 rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Why Choose Neighbourhood KE?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-800 rounded-full flex items-center justify-center mr-4 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Locally Focused</h4>
                <p className="text-gray-600 text-sm">
                  Every listing, news article, and opportunity is from your neighborhood, ensuring relevance and proximity.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-800 rounded-full flex items-center justify-center mr-4 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Safe & Trusted</h4>
                <p className="text-gray-600 text-sm">
                  We prioritize community safety with verified listings and secure interactions between neighbors.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-800 rounded-full flex items-center justify-center mr-4 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Easy to Use</h4>
                <p className="text-gray-600 text-sm">
                  Our intuitive platform makes it simple to post, browse, and connect with your community.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-800 rounded-full flex items-center justify-center mr-4 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Community Driven</h4>
                <p className="text-gray-600 text-sm">
                  Built by neighbors, for neighbors. We listen to our community and continuously improve based on your feedback.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed mb-4">
              Neighbourhood KE was born from a simple idea: communities thrive when neighbors connect and support each other. 
              Starting in Nakuru, we recognized the need for a platform that brings together local news, products, and job 
              opportunities in one accessible place.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We've seen firsthand how difficult it can be to stay informed about local events, find quality products from 
              nearby businesses, or discover job opportunities within your community. Traditional methods often fall short, 
              and social media platforms can be overwhelming and unfocused.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, Neighbourhood KE serves communities across Nakuru and continues to grow throughout Kenya. We're proud 
              to be a platform where neighbors become friends, local businesses flourish, and communities grow stronger together.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">Our Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-green-800 mb-2">Community First</h4>
              <p className="text-gray-600 text-sm">
                Everything we do is centered around building stronger, more connected neighborhoods.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-green-800 mb-2">Trust & Safety</h4>
              <p className="text-gray-600 text-sm">
                We maintain a safe environment where neighbors can interact with confidence and peace of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-green-800 mb-2">Simplicity</h4>
              <p className="text-gray-600 text-sm">
                We keep things straightforward and easy to use, so everyone can participate.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-green-800 mb-2">Local Impact</h4>
              <p className="text-gray-600 text-sm">
                We empower local businesses and individuals to thrive within their communities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
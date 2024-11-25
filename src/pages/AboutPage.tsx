import React from 'react';
import { UtensilsCrossed, Truck, Users, Heart, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <UtensilsCrossed size={48} className="text-orange-500" />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-6">About Dev's Paradise</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your one-stop destination for a heavenly food experience, where tradition meets innovation
          in every delicious bite.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-orange-50 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center leading-relaxed">
          We believe that great food brings people together. Our mission is to connect you with
          delicious meals from your favorite local restaurants, home chefs, and culinary creators,
          making every meal an unforgettable experience.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <Star className="text-orange-500 mb-4 h-8 w-8" />
          <h3 className="text-xl font-bold text-gray-800 mb-3">Quality First</h3>
          <p className="text-gray-600">
            We partner with the finest restaurants and chefs to ensure every dish meets our high standards
            of excellence.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <Clock className="text-orange-500 mb-4 h-8 w-8" />
          <h3 className="text-xl font-bold text-gray-800 mb-3">Convenience</h3>
          <p className="text-gray-600">
            Our easy-to-use platform makes browsing, ordering, and tracking your food effortless and
            enjoyable.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <Users className="text-orange-500 mb-4 h-8 w-8" />
          <h3 className="text-xl font-bold text-gray-800 mb-3">Community</h3>
          <p className="text-gray-600">
            Supporting local chefs and restaurants while bringing global flavors to your doorstep.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
          <div className="flex items-start space-x-4">
            <Heart className="text-orange-500 h-6 w-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Passionate About Food</h3>
              <p className="text-gray-600">
                Our team of culinary enthusiasts carefully curates every menu item to ensure
                an exceptional dining experience.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Truck className="text-orange-500 h-6 w-6 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Swift Delivery</h3>
              <p className="text-gray-600">
                Our efficient delivery network ensures your food arrives fresh and on time,
                every time.
              </p>
            </div>
          </div>
        </div>
        <div className="relative h-[400px] rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf"
            alt="Restaurant kitchen"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-orange-500 text-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-6">Ready to Experience Dev's Paradise?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Let us turn your cravings into happiness. Explore our menu and experience the joy
          of great food, delivered with care and passion.
        </p>
        <button
          onClick={() => navigate('/menu')}
          className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors"
        >
          Explore Our Menu
        </button>
      </div>
    </div>
  );
}
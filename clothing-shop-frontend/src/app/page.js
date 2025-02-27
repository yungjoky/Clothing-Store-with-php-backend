"use client";

import { useState, useEffect } from 'react';
import { fetchProducts } from '../lib/api';
import { motion } from 'framer-motion';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'all', label: 'All Products' },
    { name: 'featured', label: 'Featured' },
    { name: 'shirts', label: 'Shirts' },
    { name: 'pants', label: 'Pants' },
    { name: 'outerwear', label: 'Outerwear' },
    { name: 'accessories', label: 'Accessories' }
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(selectedCategory !== 'all' ? selectedCategory : null);
        console.log("Products loaded:", data);
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Error in component:", err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  useEffect(() => {
    if (searchQuery) {
      setFilteredProducts(
        products.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.$id === product.$id);
      if (existingItem) {
        return prev.map(item => 
          item.$id === product.$id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.$id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => 
      prev.map(item => 
        item.$id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    alert("This is a demo. Checkout functionality isn't implemented.");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">MODISH</h1>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">apparel</span>
            </motion.div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 py-2 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-gray-300 dark:focus:border-gray-600 focus:outline-none text-sm transition-colors"
                  />
                  <svg 
                    className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                onClick={() => setShowCart(!showCart)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-center my-8">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-2 text-indigo-600 dark:text-indigo-400 font-medium"
            >
              Try Again
            </button>
          </div>
        )}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12 relative"
        >
          <div className="rounded-2xl overflow-hidden relative h-[300px] sm:h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
              alt="Fashion banner"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent flex flex-col justify-center p-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Summer Collection 2025</h2>
              <p className="text-gray-200 mb-6 max-w-md">Discover the latest trends in fashion and explore our new arrivals for the season.</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium w-max hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        </motion.section>
        <section className="mb-10">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    selectedCategory === category.name
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  } transition-colors`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>
        </section>
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.$id || product.id}
              variants={item}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white">{product.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-1">${Number(product.price).toFixed(2)}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart(product)}
                  className="mt-3 w-full bg-gray-900 dark:bg-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.section>
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <svg 
              className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
      <motion.div 
        className={`fixed inset-y-0 right-0 max-w-md w-full bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        }`}
        initial={false}
      >
        <div className="h-full flex flex-col">
          <div className="py-6 px-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Shopping Cart</h2>
            <button 
              onClick={() => setShowCart(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                <button 
                  onClick={() => setShowCart(false)}
                  className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-500 dark:hover:text-indigo-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {cartItems.map((item) => (
                  <li key={item.$id || item.id} className="py-4 flex">
                    <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">${Number(item.price).toFixed(2)} each</p>
                      </div>
                      <div className="flex-1 flex items-end justify-between">
                        <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.$id || item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 dark:text-gray-400"
                          >
                            -
                          </button>
                          <span className="px-2 py-1 text-gray-900 dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.$id || item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 dark:text-gray-400"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.$id || item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                <p>Subtotal</p>
                <p>${getTotalPrice().toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Shipping and taxes calculated at checkout.</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium"
              >
                Proceed to Checkout
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
      {showCart && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowCart(false)}
        />
      )}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">All Products</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">New Arrivals</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">Featured</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">Sale</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">Contact Us</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">FAQs</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">Shipping</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">Returns</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            © 2025 Modish. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
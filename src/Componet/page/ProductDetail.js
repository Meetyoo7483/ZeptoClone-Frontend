import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../service/BaseUrl';

const ProductDetail = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Try multiple category endpoints to find the product
        const categories = ['cofeee', 'sabjii', 'Fashion', 'Mobile', 'Beauty', 'Frash', 'Cafe', 'Toys', 'Home', 'Electronics', 'FoodCarosarl'];
        let found = null;

        // First try general endpoint
        try {
          const listUrl = `${BaseUrl}/user/get/Product`;
          const all = await axios.get(listUrl);
          const products = all?.data?.data || [];
          found = products.find(p => p._id === productId);
          if (found) {
            setProduct(found);
            setLoading(false);
            return;
          }
        } catch (err) {
          // Continue to categories
        }

        // Try each category endpoint
        for (const category of categories) {
          try {
            const categoryUrl = `${BaseUrl}/user/get/Product/${category}`;
            const res = await axios.get(categoryUrl);
            const products = res?.data?.data || [];
            found = products.find(p => p._id === productId);
            if (found) {
              setProduct(found);
              setLoading(false);
              return;
            }
          } catch (err) {
            // Continue to next category
          }
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Card */}
          <div className="flex items-center justify-center bg-white rounded-xl shadow-lg p-6 md:p-8">
            {(() => {
              const imageField = product?.product_Image || product?.image || product?.productImage || product?.img;
              const imageUrl = imageField ? `${BaseUrl}/${imageField}` : null;
              
              return imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={product?.product_Name || 'product'} 
                  className="w-full max-h-96 object-contain rounded-lg" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">No image available</span>
                </div>
              );
            })()}
          </div>

          {/* Product Details Card */}
          <div className="flex flex-col justify-start">
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product?.product_Name}
              </h1>
              
              {/* Size/Quantity Info */}
              <p className="text-sm text-gray-500 mb-4">
                {product?.product_size || product?.product_quantity || 'Standard size'}
              </p>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6 line-clamp-4">
                {product?.product_description}
              </p>

              {/* Pricing Section */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-pink-600">
                    ₹{product?.product_discount_price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product?.product_price}
                  </span>
                  <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                    {product?.discount || '20'}% OFF
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
                Add to Cart
              </button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                  <span className="text-green-600 font-semibold">✓</span> In Stock
                </div>
                <p className="text-xs text-gray-500">
                  All nutritional information displayed is as per the product label. Efforts are made to ensure accuracy, but product descriptions are indicative in nature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
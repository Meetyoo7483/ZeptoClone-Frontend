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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          {(() => {
            // Try multiple possible image field names
            const imageField = product?.product_Image || product?.image || product?.productImage || product?.img;
            const imageUrl = imageField ? `${BaseUrl}/${imageField}` : null;
            
            return imageUrl ? (
              <img 
                src={imageUrl} 
                alt={product?.product_Name || 'product'} 
                className="w-full h-96 object-cover rounded-md" 
                onError={(e) => {
                  console.error('Image failed to load from:', imageUrl);
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                No image (field: {product?.product_Image ? 'product_Image' : product?.image ? 'image' : 'not found'})
              </div>
            );
          })()}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product?.product_Name}</h1>
          <p className="text-gray-600 mt-2">{product?.product_description}</p>
          
          <div className="mt-4">
            <span className="text-2xl font-bold text-green-600">₹{product?.product_discount_price}</span>
            <span className="text-gray-500 line-through ml-4">₹{product?.product_price}</span>
            <span className="text-red-600 ml-4">{product?.discount}% OFF</span>
          </div>

          <button className="bg-green-600 text-white px-8 py-3 rounded mt-6 w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
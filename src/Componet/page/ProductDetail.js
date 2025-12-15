import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BaseUrl from '../service/BaseUrl';

const ProductDetail = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to resolve image paths returned by backend.
  const getImageUrl = (path) => {
    if (!path) return null;
    // if backend already returns full URL, use it
    if (typeof path === 'string' && (path.startsWith('http://') || path.startsWith('https://'))) return path;
    // otherwise treat as relative path stored on server and prefix BaseUrl
    return `${BaseUrl}/${path}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const url = `${BaseUrl}/product/get/${productId}`;
        console.log('Fetching product from', url);
        const result = await axios.get(url);
        setProduct(result.data.product);
        setLoading(false);
      } catch (error) {
        console.error('Product fetch error:', error?.response?.status, error?.response?.data || error.message);
        // Fallback: try fetching from general products list and find by id (if backend doesn't expose single endpoint)
        try {
          const listUrl = `${BaseUrl}/user/get/Product`;
          console.log('Attempting fallback fetch from', listUrl);
          const all = await axios.get(listUrl);
          const found = (all?.data?.data || []).find(p => p._id === productId || p.id === productId);
          if (found) {
            setProduct(found);
          } else {
            console.warn('Product not found in fallback list');
          }
        } catch (fallbackErr) {
          console.error('Fallback fetch failed:', fallbackErr?.response?.status, fallbackErr?.response?.data || fallbackErr.message);
        }
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          {(() => {
            const mainPath = product?.images?.[0] ?? product?.image ?? product?.product_Image;
            const mainUrl = getImageUrl(mainPath);
            return mainUrl ? (
              <img src={mainUrl} alt={product?.name || 'product'} className="w-full" />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center">No image</div>
            );
          })()}

          <div className="flex gap-2 mt-4">
            {product?.images?.length ? (
              product.images.map((img, i) => {
                const url = getImageUrl(img);
                return url ? <img key={i} src={url} alt={product?.name ? `${product.name} ${i+1}` : `thumb-${i}`} className="w-20 h-20 cursor-pointer" /> : null;
              })
            ) : product?.image || product?.product_Image ? (
              <img src={getImageUrl(product.image ?? product.product_Image)} alt={product?.name || 'thumb'} className="w-20 h-20 cursor-pointer" />
            ) : null}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product?.product_Name}</h1>
          <p className="text-gray-600 mt-2">{product?.product_description}</p>
          
          <div className="mt-4">
            <span className="text-2xl font-bold text-green-600">₹{product?.product_price}</span>
            <span className="text-gray-500 line-through ml-4">₹{product?.product_discount_price}</span>
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
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';
import Spinner from '../components/Spinner';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import { WHATSAPP_MESSAGE } from '../constants';

const PlayIcon = () => (
    <svg className="h-16 w-16 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);


const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById, products, whatsappNumber } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct || null);
    }
  }, [id, getProductById]);

  if (!product) {
    return <Spinner />;
  }
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`${WHATSAPP_MESSAGE} ${product.name} (Price: ₹${product.offerPrice.toLocaleString('en-IN')})`)}`;
  
  // Enhanced logic for finding related products
  const relatedProducts = products
    .filter(p => p.id !== product.id) // Exclude the current product
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      // Higher score for same category
      if (a.category === product.category) scoreA += 2;
      if (b.category === product.category) scoreB += 2;
      // Additional score for same brand
      if (a.brand === product.brand) scoreA += 1;
      if (b.brand === product.brand) scoreB += 1;
      
      // Sort by descending score to get the most relevant products first
      return scoreB - scoreA;
    })
    .slice(0, 4); // Take the top 4 most related products

  return (
    <div className="space-y-10">
      {/* Image gallery */}
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 border border-brand-border">
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
      </div>

      {/* Product info */}
      <div className="px-2 space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-brand-primary sm:text-3xl">{product.name}</h1>
        
        <div>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-baseline gap-3">
                <p className="text-3xl text-brand-primary">₹{product.offerPrice.toLocaleString('en-IN')}</p>
                {product.originalPrice > product.offerPrice && (
                  <p className="text-xl line-through text-brand-secondary">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </p>
                )}
              </div>
              {product.originalPrice > product.offerPrice && (
                <p className="text-md font-semibold text-green-600 mt-1">
                  You save {Math.round(((product.originalPrice - product.offerPrice) / product.originalPrice) * 100)}%
                </p>
              )}
            </div>
            <div className="text-right">
                <h3 className="text-sm font-medium text-brand-secondary">Quality</h3>
                <p className="text-md text-brand-primary">{product.quality}</p>
            </div>
          </div>
        </div>

        <div>
            <p className="text-base text-brand-secondary leading-relaxed">{product.description}</p>
        </div>
        
        <div className="pt-4">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="secondary">Buy Now</Button>
          </a>
        </div>
      </div>

      {/* Video Review */}
      <div className="space-y-4 px-2">
         <h2 className="text-xl font-bold tracking-tight text-brand-primary">Video Review</h2>
         <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black cursor-pointer group">
            <img src={product.images[1] || product.images[0]} alt="Video thumbnail" className="w-full h-full object-cover opacity-50 transition-opacity group-hover:opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
                <PlayIcon />
            </div>
         </div>
      </div>


       {/* Related Products */}
       {relatedProducts.length > 0 && (
         <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-brand-primary px-2">Related Products</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
              {relatedProducts.map(p => (
                <div key={p.id} className="flex-shrink-0 w-2/3 sm:w-1/3">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
         </div>
       )}
    </div>
  );
};

export default ProductDetailPage;

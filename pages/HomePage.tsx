import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const PriceCategory = ({ label, icon }: { label: string, icon: string }) => (
    <div className="flex flex-col items-center space-y-2">
        <div className="w-16 h-16 bg-gray-100 border border-brand-border rounded-full flex items-center justify-center">
            <span className="text-brand-primary text-2xl">{icon}</span>
        </div>
        <span className="text-sm text-brand-secondary">{label}</span>
    </div>
);

const HomePage: React.FC = () => {
  const { products, heroImage } = useProducts();
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="rounded-lg overflow-hidden border border-brand-border">
         <div className="aspect-w-16 aspect-h-9 md:aspect-h-7">
             <img src={heroImage} alt="Featured shoe" className="w-full h-full object-cover"/>
         </div>
      </section>

      {/* Price Categories */}
      <section>
        <div className="flex justify-around items-center">
           <PriceCategory label="Under ₹999" icon="₹" />
           <PriceCategory label="Under ₹1499" icon="₹" />
           <PriceCategory label="Under ₹1,999" icon="₹" />
           <PriceCategory label="Over ₹2,000" icon="₹" />
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-brand-primary text-left">Featured Products</h2>
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
         {featuredProducts.length === 0 && (
            <p className="mt-6 text-center text-brand-secondary">No featured products at the moment. Check back later!</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
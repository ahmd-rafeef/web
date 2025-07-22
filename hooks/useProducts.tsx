import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { Product, ProductContextType } from '../types';
import { INITIAL_PRODUCTS, BRANDS as INITIAL_BRANDS, INITIAL_HERO_IMAGE, WHATSAPP_NUMBER as INITIAL_WHATSAPP_NUMBER } from '../constants';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Helper to safely get values from localStorage
const getStoredValue = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    // Use the default value if the item is null or undefined
    return item != null ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return defaultValue;
  }
};


export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => getStoredValue('champ_products', INITIAL_PRODUCTS));
  const [heroImage, setHeroImage] = useState<string>(() => getStoredValue('champ_heroImage', INITIAL_HERO_IMAGE));
  const [whatsappNumber, setWhatsappNumber] = useState<string>(() => getStoredValue('champ_whatsappNumber', INITIAL_WHATSAPP_NUMBER));

  // Effect to save products to localStorage whenever they change
  useEffect(() => {
    try {
      window.localStorage.setItem('champ_products', JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products to localStorage:', error);
    }
  }, [products]);

  // Effect to save hero image to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem('champ_heroImage', JSON.stringify(heroImage));
    } catch (error) {
      console.error('Error saving heroImage to localStorage:', error);
    }
  }, [heroImage]);

  // Effect to save WhatsApp number to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem('champ_whatsappNumber', JSON.stringify(whatsappNumber));
    } catch (error) {
      console.error('Error saving whatsappNumber to localStorage:', error);
    }
  }, [whatsappNumber]);


  const brands = useMemo(() => {
    const productBrands = products.map(p => p.brand);
    const allBrands = [...new Set([...INITIAL_BRANDS, ...productBrands])];
    return allBrands.sort((a, b) => a.localeCompare(b));
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: new Date().getTime().toString(),
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  const updateHeroImage = (image: string) => {
    setHeroImage(image);
  };
  
  const updateWhatsappNumber = (number: string) => {
    setWhatsappNumber(number);
  };

  const value = { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    getProductById, 
    brands,
    heroImage,
    updateHeroImage,
    whatsappNumber,
    updateWhatsappNumber
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

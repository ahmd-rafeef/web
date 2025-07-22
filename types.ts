
export interface Product {
  id: string;
  name: string;
  brand: string;
  originalPrice: number;
  offerPrice: number;
  description: string;
  images: string[]; // Array of base64 strings or image URLs
  isFeatured?: boolean;
  quality: string;
  category: string;
}

export interface Filters {
  searchQuery: string;
  brands: string[];
  priceRange: [number, number];
  qualities: string[];
  categories: string[];
}

export interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  brands: string[];
  heroImage: string;
  updateHeroImage: (image: string) => void;
  whatsappNumber: string;
  updateWhatsappNumber: (number: string) => void;
}

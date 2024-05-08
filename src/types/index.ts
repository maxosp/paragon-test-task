export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  images: string[];
}

export interface ApiError {
  message: string;
}

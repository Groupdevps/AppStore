export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  category?:string;
  imageUrl?: string;
  createdAt?: string;
}
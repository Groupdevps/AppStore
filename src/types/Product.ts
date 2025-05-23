export interface Product {
  uid: string;
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  category?:string;
  imageUrl?: string;
  image?: string;
  createdAt?: string;
}
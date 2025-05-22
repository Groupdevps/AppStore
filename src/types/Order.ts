import {Product} from '@/types/Product'; 
export interface Order {
    id?: string;
    userId: string;    
    createdAt?: string;
    products: Product[];
}
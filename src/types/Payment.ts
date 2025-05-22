export interface Payment {
  id?: string;  
  OrderId: string;
  total: number;  
  createdAt?: string;
}
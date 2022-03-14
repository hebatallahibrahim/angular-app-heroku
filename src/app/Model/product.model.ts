export interface Product {
  id?: number;
  name: string;
  price: number;
  description?: string;
  discount?: number; // (?) Means optional more like Nullable
  imageUrl?: string;
  Count: number;
}

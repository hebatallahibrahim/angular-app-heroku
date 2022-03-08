import { Injectable } from '@angular/core';
import { Product } from '../Model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  productArray: Product[] = [
    {
      id: 1,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
    },
    {
      id: 2,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
    },
    {
      id: 3,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
    },
    {
      id: 4,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
    },
    {
      id: 5,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
    },
    {
      id: 6,
      name: 'productname',
      price: 2000,
      imageUrl: 'https://picsum.photos/200',
    },
  ];

  constructor() {}
  getAllProduct(): Product[] {
    return this.productArray.splice(0);
  }
  getProductByID() {}
  addProduct() {}
  updateProduct() {}
  deleteProduct() {}
}

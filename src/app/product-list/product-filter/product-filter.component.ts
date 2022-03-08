import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  colors: string[] = ['red', 'blue', 'yellow'];
  prices: string[] = [
    'Lowest price',
    '1000-2000',
    '2000-3000',
    '3000-6000',
    'Highest price',
  ];
  categorys: string[] = [
    'Bedroom',
    'Living Room',
    'Dining Room',
    'Garden Furniture',
    'Kitchens',
  ];
  sub_categorys: string[] = ['Chair', 'Bed', 'Table'];
  constructor() {}

  ngOnInit(): void {}
}

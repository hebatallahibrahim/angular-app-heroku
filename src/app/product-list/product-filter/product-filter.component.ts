import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  @Output() changeFilterEvent = new EventEmitter<any>();

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
  onColorChange(event: any) {
    this.changeFilterEvent.emit({ id: event.value, eventType: 'color' });
  }
  onCategoryChange(event: any) {
    this.changeFilterEvent.emit({ id: event.value, eventType: 'category' });
  }
  onSubCategoryChange(event: any) {
    this.changeFilterEvent.emit({ id: event.value, eventType: 'subCategory' });
  }

  ngOnInit(): void {}
}

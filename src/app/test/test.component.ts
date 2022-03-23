import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subject, from } from 'rxjs';
import { Product } from '../Model/product.model';
import { ProductListService } from '../Service/product-list.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  visibleSidebar2: any;
  productArray: Product[] = [];
  mainProductArray: Product[] = [];
  constructor(
    private primengConfig: PrimeNGConfig,
    private productListService: ProductListService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.productListService.getAllProduct().subscribe(
      (result) => {
        this.productArray = result.products;
        this.productArray.forEach((a: any) => {
          Object.assign(a, { quantity: 1, totalPrice: a.selling_price });
        });
        this.mainProductArray = result.products;
      },
      (err) => {
        console.log(err);
      }
    );

    this.primengConfig.ripple = true;
  }
  first: number = 0;

  totalRecords: number = 120;

  totalRecords2: number = 12;

  onPageChange(event: any) {
    this.first = event.first;
  }

  refresh() {
    this.first = 0;
  }
}

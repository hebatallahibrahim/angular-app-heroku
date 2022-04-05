import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../Service/payment.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderItems: any[] = [];
  order_id!: any;
  isLoading = true;
  constructor(
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getOrderProducts();
  }

  getOrderProducts() {
    this.order_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.paymentService.getOrderItems(this.order_id).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        if (data.status == 200) {
          this.orderItems = data.orderItems;
        }
      },
      (err) => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }
}

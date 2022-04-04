import { Component, OnInit } from '@angular/core';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { contactUs } from 'src/app/Model/contactUs.model';

@Component({
  selector: 'app-order-data',
  templateUrl: './order-data.component.html',
  styleUrls: ['./order-data.component.css'],
})
export class OrderDataComponent implements OnInit {
  id!: any;
  orderArray: any[] = [];
  constructor(
    private _service: adminservice,
    private router: Router,
    private activateroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activateroute.snapshot.params['postId'];
    this._service.getOrdersDetails(this.id).subscribe({
      next: (res: any) => {
        console.log(res.orderItems);

        this.orderArray = res.orderItems;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}

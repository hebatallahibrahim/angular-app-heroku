import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { adminservice } from 'src/app/Service/admin.service';

@Component({
  selector: 'app-order-datails',
  templateUrl: './order-datails.component.html',
  styleUrls: ['./order-datails.component.css'],
})
export class OrderDatailsComponent implements OnInit {
  OrdeArray: any[] = [];
  constructor(private _service: adminservice, private rout: Router) {}

  ngOnInit(): void {
    this._service.getAllOrdes().subscribe(
      (data: any) => {
        console.log(data);

        this.OrdeArray = data.All_orders;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}

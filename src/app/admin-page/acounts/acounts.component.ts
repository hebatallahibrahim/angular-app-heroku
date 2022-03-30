import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { adminservice } from 'src/app/Service/admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-acounts',
  templateUrl: './acounts.component.html',
  styleUrls: ['./acounts.component.css']
})
export class AcountsComponent implements OnInit {
  formRegistration: FormGroup = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    address: new FormControl(null),
    city: new FormControl(null),
    password: new FormControl(null),
    phone: new FormControl(null),
    region: new FormControl(null),
  });
  arr2 = [1,2,3,4,5,6,7,8,9,10];
  usersArray:any[]=[];
  err: string | undefined;
  dangerAlertShow=false;
  constructor(public _AdminService: AdminService,
    private _service : adminservice ,  public _Router: Router) { 
      
    }

  deleteUserAcount(id: any): void {
    this._service.deleteProduct(id).subscribe(res => {
      console.log(res);
      this.usersArray = this.usersArray.filter(item => item.id !== id);
      })
    }

  ngOnInit(): void {
    this._AdminService.getAllUsers().subscribe(
      (res) => {
        this.usersArray=res.user;
        console.log(this.usersArray);
      },
      (err:any) => {
        console.log(err);
      }
    );
  }
  

}

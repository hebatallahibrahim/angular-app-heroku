import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { profileUserService } from '../Service/user-profile.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
fav=[1,2,3]
public isCollapsed = false;
public isCollapseg = true;
public btncollapse= false;

formRegistration: FormGroup = new FormGroup({
  Name: new FormControl(null),
  Email: new FormControl(null),
  Phone: new FormControl(null),
  Address: new FormControl(null),
  City: new FormControl(null),
  Region: new FormControl(null),
});


getFormData(FormData: any) {
  console.log(FormData);
}


ResposneObj : any ;
  constructor(public  _service:profileUserService ) { }

ngOnInit(): void {
  this._service.getthemoviedb()
    .subscribe((data: any) => {
      this.ResposneObj = data;
      console.log(data)

    }, (err: any) => {
      console.log(err)
    });
  
  }
}

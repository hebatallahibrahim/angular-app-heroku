import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { profileUserService } from '../Service/user-profile.service';
import { UserService } from '../Service/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
public isCollapsed = false;
public isCollapseg = true;
public btncollapse= false;
userID=1;
userItem:any={};
name="";
failedAlert=false;
emailExists=false;
@ViewChild('aollapse') aollapse: any;
@ViewChild('collapse') collapse:any;

formRegistration: FormGroup = new FormGroup({
  Name: new FormControl(null,[Validators.required,Validators.minLength(3)]),
  Email: new FormControl(null,[Validators.required, Validators.email]),
  Phone: new FormControl(null,[Validators.required,Validators.pattern('^01[0125][0-9]{8}$')]),
  Address: new FormControl(null,Validators.required),
  City: new FormControl(null,Validators.required),
  Region: new FormControl(null,Validators.required),
});


getFormData(data: any) {
      console.log(data);
      var formData: any = new FormData();
      formData.append('name', data.get('Name').value);
      formData.append('email', data.get('Email').value);
      formData.append('phone', data.get('Phone').value);
      formData.append('address', data.get('Address').value);
      formData.append('city', data.get('City').value);
      formData.append('region', data.get('Region').value);

      this.userService.upDateProfileUser(this.userID,formData)
        .subscribe(
          (data) => {
            console.log(data);
            this.failedAlert=false;
            this.emailExists=false;
            if (data.status == 200) {
              this.getUserProfile();
              this.collapse.toggle(); 
              this.aollapse.toggle();
            }else if(data.message=='Email Already Exists') {
              this.emailExists=true;
            }
          },
          (err) => {
            this.emailExists=false;
            this.failedAlert=true;
            console.log(err);
          }
        );
}


  constructor(public  userService:UserService ) { }

ngOnInit(): void {
  this.getUserProfile();
  
  }

  getUserProfile(){
    this.userService.getProfileUser(this.userID).subscribe(
      (data)=>{
        this.userItem=data.User;
        this.name=this.userItem.name;
      },
      (err)=>{
        console.log(err);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Service/authentication.service';

@Component({
  selector: 'app-user-get-info',
  templateUrl: './user-get-info.component.html',
  styleUrls: ['./user-get-info.component.css']
})
export class UserGetInfoComponent implements OnInit {

  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);
    console.log(userObj.user.id); 
    console.log(userObj.user); 
    console.log(userObj.user.name); 
    console.log(userObj.user.email);
    console.log(userObj.user.phone);
    console.log(userObj.user.city);
    console.log(userObj.user.region);
    const token = userObj.access_token;
    console.log(token); 
  }

}

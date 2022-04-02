import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Service/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-test-user-info',
  templateUrl: './test-user-info.component.html',
  styleUrls: ['./test-user-info.component.css']
})
export class TestUserInfoComponent implements OnInit {

  checkbox:boolean = false;
  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.auth.logout();
    this.router.navigate(['/log-in']);
  }

  

}

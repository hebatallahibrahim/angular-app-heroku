import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Service/authentication.service';

@Component({
  selector: 'app-user-log-out',
  templateUrl: './user-log-out.component.html',
  styleUrls: ['./user-log-out.component.css']
})
export class UserLogOutComponent implements OnInit {

  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

}

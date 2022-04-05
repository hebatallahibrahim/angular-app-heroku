import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-admin-log-out',
  templateUrl: './admin-log-out.component.html',
  styleUrls: ['./admin-log-out.component.css']
})
export class AdminLogOutComponent implements OnInit {

  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.auth.logoutt();
    this.router.navigate(['/log-in']);
  }

}

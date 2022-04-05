import { Component, OnInit } from '@angular/core';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-navnar',
  templateUrl: './navnar.component.html',
  styleUrls: ['./navnar.component.css'],
})
export class NavnarComponent implements OnInit {
  MessagesArray: any;
  loggedIn: boolean = false;
  constructor(
    private auth: AuthenticationService,
    private _service: adminservice
  ) {}

  ngOnInit(): void {
    this._service.getAllContactUsMessages();
    this.auth.statuss().subscribe(
      (res) => {
        this.loggedIn = res;
        console.log('navbar:' + this.loggedIn);
      },
      (err) => {
        console.log(err);
      }
    );

    this._service.messagesHasBeenChanged.subscribe((res: any) => {
      console.log(res);
      this.MessagesArray = res;
      console.log(this.MessagesArray);
    });
  }
}

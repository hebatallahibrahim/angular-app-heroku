import { Component, OnInit } from '@angular/core';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navnar',
  templateUrl: './navnar.component.html',
  styleUrls: ['./navnar.component.css'],
})
export class NavnarComponent implements OnInit {
  islogin: boolean = false;
  MessagesArray: any;
  constructor(
    private _service: adminservice,
    public _auth: AuthService,
    public _Router: Router
  ) {
    _auth.adminData.subscribe((data) => {
      console.log();
      if (data) {
        this.islogin = true;
      } else {
        this.islogin = false;
      }
    });
  }

  ngOnInit(): void {
    this._service.getAllContactUsMessages();
    this._service.messagesHasBeenChanged.subscribe((res: any) => {
      console.log(res);
      this.MessagesArray = res;
      console.log(this.MessagesArray);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { contactUs } from 'src/app/Model/contactUs.model';
@Component({
  selector: 'app-navnar',
  templateUrl: './navnar.component.html',
  styleUrls: ['./navnar.component.css'],
})
export class NavnarComponent implements OnInit {
  MessagesArray: any;
  constructor(
    private _service: adminservice,
    private router: Router,
    private activateroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._service.messagesHasBeenChanged.subscribe((res: any) => {
      console.log(res);
      this.MessagesArray = res;
    });
  }
}

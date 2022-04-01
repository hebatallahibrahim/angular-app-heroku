import { Component, EventEmitter, OnInit } from '@angular/core';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { contactUs } from 'src/app/Model/contactUs.model';

@Component({
  selector: 'app-all-contact-us',
  templateUrl: './all-contact-us.component.html',
  styleUrls: ['./all-contact-us.component.css'],
})
export class AllContactUsComponent implements OnInit {
  MessagesArray: any[] = [];
  MessagesArrayk: any[] = [];
  id!: any;

  closeResult = '';
  constructor(
    private _service: adminservice,
    private router: Router,
    private activateroute: ActivatedRoute,
    private modalService: NgbModal
  ) {}
  messageChange: EventEmitter<any> = new EventEmitter();

  removeContactItem(id: any) {
    this._service.deleteContactUsMessage(id);
    this._service.messagesHasBeenChanged.subscribe((res: any) => {
      this.MessagesArray = res;
    });
    // .subscribe((res) => {
  }

  ngOnInit() {
    this._service.getAllContactUsMessages();
    this._service.messagesHasBeenChanged.subscribe((res: any) => {
      this.MessagesArray = res;
    });
  }
}

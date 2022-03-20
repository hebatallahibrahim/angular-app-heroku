import { Component, OnInit } from '@angular/core';
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

  removeContactItem(id: any): void {
    this._service.deleteContactUsMessage(id).subscribe((res) => {
      console.log(res);
      this.MessagesArray = this.MessagesArray.filter((item) => item.id !== id);
    });
    this.MessagesArray;
  }

  ngOnInit() {
    this._service.getAllContactUsMessages().subscribe(
      (data: any) => {
        console.log(data);
        this.MessagesArray = data.ALLContactUs;
        console.log(this.MessagesArray);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}

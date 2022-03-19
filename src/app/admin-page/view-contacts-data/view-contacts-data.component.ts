import { Component, OnInit } from '@angular/core';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from '@angular/router';
import { contactUs } from 'src/app/Model/contactUs.model';
@Component({
  selector: 'app-view-contacts-data',
  templateUrl: './view-contacts-data.component.html',
  styleUrls: ['./view-contacts-data.component.css']
})
export class ViewContactsDataComponent implements OnInit {
  id!: any;
  contactArray!: contactUs;
  constructor(
    private _service : adminservice,
    private router: Router,
    private activateroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activateroute.snapshot.params['postId'];
    this._service.getContactUsMessageByID(this.id).subscribe((data: any)=>{
      this.contactArray = data.ContactUs;
    });
  }

}

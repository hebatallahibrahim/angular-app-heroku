import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { contactUsService } from '../Service/contact-us.service';

@Component({
  selector: 'app-cancel-subscription',
  templateUrl: './cancel-subscription.component.html',
  styleUrls: ['./cancel-subscription.component.css']
})
export class CancelSubscriptionComponent implements OnInit {

  alert: boolean = false;
  SuccessAlertShow = false;
  dangerAlertShow=false;
  err!: string;
  formUnsubscription: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });
  constructor(private contactusService: contactUsService, private _Router: Router) { }

  ngOnInit(): void {
  }

  getFormData(data: any) {
    this.contactusService.deleteSubscription(data.get('email').value).subscribe(
      (data) => {
        if (data.message == 'success') {
          this.dangerAlertShow=false;
          this.SuccessAlertShow = true;
          this.formUnsubscription.reset();
        } else {
          this.err = 'not valid data';
        }
      },
      (err) => {
        this.SuccessAlertShow = false;
        this.dangerAlertShow=true;
        this.formUnsubscription.reset();
        console.log(err);
      }
    );
  }
}

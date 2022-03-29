import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { contactUsService } from '../Service/contact-us.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  subscribedAlert=false;
  failedAlert=false;
  existedEmailAlert=false;
  isLoading=false;

  formSubscription: FormGroup = new FormGroup({
    Email: new FormControl(null)  
  });
  err:string|undefined;
  constructor(private contactusService:contactUsService) {}

  ngOnInit(): void {}
  getFormData(data: any) {
    this.isLoading=true;
    var formData: any = new FormData();
    formData.append('email', data.get('Email').value);

    this.contactusService.subscribeToUpdates(formData).subscribe(
      (data) => {
        console.log(data);
        this.isLoading=false;
        if (data.message == 'success') {
          this.subscribedAlert=true;
          this.formSubscription.reset();
          setTimeout(() => (this.subscribedAlert = false), 3500);
        } else if(data.message == 'email existed') {
          this.existedEmailAlert=true;
          this.formSubscription.reset();
          setTimeout(() => (this.existedEmailAlert = false), 3500);
        }
        else {
          this.err = 'not valid data';
        }
      },
      (err) => {
        this.isLoading=false;
        console.log(err);
        this.failedAlert=true;
        setTimeout(() => (this.failedAlert = false), 3000);
      }
    );
  }
}

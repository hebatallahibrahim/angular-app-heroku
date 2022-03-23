import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { contactUsService } from '../Service/contact-us.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  formSubscription: FormGroup = new FormGroup({
    Email: new FormControl(null)  
  });
  err:string|undefined;
  constructor(private contactusService:contactUsService) {}

  ngOnInit(): void {}
  getFormData(data: any) {
    var formData: any = new FormData();
    formData.append('email', data.get('Email').value);

    this.contactusService.subscribeToUpdates(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.message == 'success') {
      
        } else {
          this.err = 'not valid data';
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {
  dangerAlertShow=false;
  SuccessAlertShow=false;
  formRegistration: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    file: new FormControl(null, [
      Validators.required
    ]),
    fileSource: new FormControl(null, [
      Validators.required
    ])
  });
  err: string | undefined;
 
  constructor(public _AdminService: AdminService, public _Router: Router) { }

  ngOnInit(): void {
  }
  onFileChange(event:any) {


    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.formRegistration.patchValue({

        fileSource: file

      });

    }

  }
  getFormData(data: any) {
    console.log(data);
    var formData: any = new FormData();
    formData.append('name', data.get('name').value);
    formData.append('description', data.get('description').value);
    formData.append('image', data.get('fileSource').value);

    this._AdminService.addSubCategory(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.message == 'success') {
          this.SuccessAlertShow=true;
          this.dangerAlertShow=false;
           this.formRegistration.reset();
          this._Router.navigate(['/all-sub-categry']);
        } else {
          this.err = 'not valid data';
        }
      },
      (err) => {
        this.SuccessAlertShow=false;
        this.dangerAlertShow=true;
        console.log(err);
      }
    );
  }
}



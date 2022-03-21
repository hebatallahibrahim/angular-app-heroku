import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { adminservice } from 'src/app/Service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from 'src/app/Model/category.model';
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  id!: any;
  post! :Category;
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
    file: new FormControl(null),
    fileSource: new FormControl(null)
  });
  err: string | undefined;
  
  constructor(
    public _serve:adminservice,
    private activateroute: ActivatedRoute,
    public _Router: Router) { 
    }
  ngOnInit(): void {
      this.id = this.activateroute.snapshot.params['postId']
      console.log();
      this._serve.editCategory(this.id).subscribe((data: any)=>{
        this.post = data.category;
      });
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
    formData.append('descripition', data.get('description').value);
    formData.append('image', data.get('fileSource').value);

    this._serve.updateCategry(this.id, formData).subscribe(

      (data) => {
        console.log(data);
        if (data.message == 'success') 
        {
          this.SuccessAlertShow=true;
          this.dangerAlertShow=false;
           this.formRegistration.reset();
          this._Router.navigate(['/all-category']);
        } 
        else 
        {
          this.err = 'not valid data';
        }
      },
        (err) => {
          this.SuccessAlertShow=false;
          this.dangerAlertShow=true;
          console.log(err);
 });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  formRegistration: FormGroup = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    file: new FormControl(null),
    fileSource: new FormControl(null)
  });
  err: string | undefined;
  dangerAlertShow=false;
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

    this._serve.updateCategry(this.id, formData).subscribe((res:any) => {
      console.log(res);
      console.log('cat updated successfully!');
      this._Router.navigate(['/all-category']);
 })

  }

}

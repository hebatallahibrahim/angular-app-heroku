import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit {
  formRegistration: FormGroup = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    file: new FormControl(null),
    fileSource: new FormControl(null)
  });

  err: string | undefined;
  dangerAlertShow=false;
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
    var formData: any = new FormData();
    formData.append('name', data.get('name').value);
    formData.append('description', data.get('description').value);
    formData.append('image', data.get('fileSource').value);

    this._AdminService.addSubCategory(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.message == 'Subcategory added succesfully') {
          this.dangerAlertShow=false;
          this._Router.navigate(['/all-product']);
        } else {
          this.err = 'not valid data';
        }
      },
      (err) => {
        this.dangerAlertShow=true;
        console.log(this.dangerAlertShow);
        console.log(err);
      }
    );
  }

}

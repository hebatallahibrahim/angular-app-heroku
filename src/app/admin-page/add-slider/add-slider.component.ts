import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.css']
})
export class AddSliderComponent implements OnInit {

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
  dangerAlertShow=false;
  SuccessAlertShow=false;
  isLoading=false;
  sliderArray:any[]=[];
  
  constructor(private _AdminService: AdminService, private _Router: Router) { }

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
    this.isLoading=true;
    var formData: any = new FormData();
    formData.append('name', data.get('name').value);
    formData.append('description', data.get('description').value);
    formData.append('image', data.get('fileSource').value);

    this._AdminService.addSlider(formData).subscribe(
      (data) => {
        console.log(data);
        this.isLoading=false;
        if (data.message == 'success') {
          this.SuccessAlertShow=true;
          this.dangerAlertShow=false;
           this.formRegistration.reset();
          this._Router.navigate(['/slider']);
        } else {
          this.err = 'not valid data';
        }
      },
      (err) => {
        this.isLoading=false;
        this.SuccessAlertShow=false;
        this.dangerAlertShow=true;
        console.log(err);
      }
    );
  }
}




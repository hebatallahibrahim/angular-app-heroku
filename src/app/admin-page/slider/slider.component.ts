import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  formRegistration: FormGroup = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    file: new FormControl(null),
    fileSource: new FormControl(null)
  });
  err: string | undefined;
  sliderArray:any[]=[];
  imagUrlSlider: string = 'http://127.0.0.1:8000/uploads/slider/';
  constructor(private _AdminService: AdminService, private _Router: Router) { }

  ngOnInit(): void {
    this._AdminService.getSlider().subscribe(
      (res) => {
        this.sliderArray=res.Slider;
        console.log(this.sliderArray);
      },
      (err:any) => {
        console.log(err);
      }
    );
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

    this._AdminService.addSlider(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.message == 'Slider added succesfully') {
          this._Router.navigate(['/home']);
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

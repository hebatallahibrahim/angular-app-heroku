import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { adminservice } from 'src/app/Service/admin.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

 
  err: string | undefined;
  dangerAlertShow=false;
  sliderArray:any[]=[];
  imagUrlSlider: string = 'http://127.0.0.1:8000/uploads/slider/';
  constructor(private _AdminService: AdminService, private _Router: Router
    , private _service : adminservice ) { }

  removeSliderItem(id: any): void {
    this._service.deleteSlider(id).subscribe(res => {
      console.log(res);
      this.sliderArray = this.sliderArray.filter(item => item.id !== id);
      })
    
  }
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

 

  
}

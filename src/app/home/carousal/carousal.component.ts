import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/Service/home.service';

@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.css']
})
export class CarousalComponent implements OnInit {
  sliderArray:any[]=[];
  imagUrlSlider: string = 'http://127.0.0.1:8000/uploads/slider/';
  constructor(private _HomeService: HomeService, private _Router: Router) { }

  ngOnInit(): void {
    this._HomeService.getSlider().subscribe(
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

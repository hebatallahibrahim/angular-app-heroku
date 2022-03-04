import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blogs-page',
  templateUrl: './blogs-page.component.html',
  styleUrls: ['./blogs-page.component.css']
})
export class BlogsPageComponent implements OnInit {
  arr = [1,2,3,4,5,6];
  constructor() { }

  ngOnInit(): void {
  }

}

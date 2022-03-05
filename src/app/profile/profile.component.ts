import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
fav=[1,2,3]
public isCollapsed = false;
public isCollapseg = true;
public btncollapse= false;
  constructor() { }

  ngOnInit(): void {
  }

}

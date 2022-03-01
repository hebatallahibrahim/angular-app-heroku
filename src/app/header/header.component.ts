import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [NgbDropdownConfig],
})
export class HeaderComponent implements OnInit {
  accountDropdown = false;
  constructor(config: NgbDropdownConfig) {
    // customize default values of dropdowns used by this component tree

    config.autoClose = false;
  }
  dropdownOpen() {
    this.accountDropdown = true;
  }
  ngOnInit(): void {}
}

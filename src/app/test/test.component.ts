import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subject, from } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  visibleSidebar2: any;
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'crs-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input()
  slidenav;

  constructor() { }

  ngOnInit() {
  }

}

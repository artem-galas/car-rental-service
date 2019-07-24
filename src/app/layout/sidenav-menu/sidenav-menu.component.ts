import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'crs-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

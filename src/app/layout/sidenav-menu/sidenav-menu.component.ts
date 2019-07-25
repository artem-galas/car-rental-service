import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { TokenService } from '~/shared/services';

@Component({
  selector: 'crs-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavMenuComponent implements OnInit {
  @Input()
  slidenav: MatSidenav;

  constructor(private readonly tokenService: TokenService,
              private readonly router: Router) { }

  ngOnInit() {
  }

  goToMyBookings() {
    if (this.tokenService.currentUser) {
      this.router.navigate(['my-bookings']);
    } else {
      this.router.navigate(['auth/sign-in']);
    }
    this.slidenav.toggle();
  }
}

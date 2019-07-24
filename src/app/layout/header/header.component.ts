import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'crs-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input()
  slidenav;

  constructor(public afAuth: AngularFireAuth,
              private readonly router: Router) { }

  ngOnInit() {
  }

  signOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['auth', 'sign-in']);
  }

}

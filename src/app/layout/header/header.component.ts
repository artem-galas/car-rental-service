import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'crs-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input()
  slidenav;

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

}

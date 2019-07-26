import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule, MatSidenav } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';

import { MaterialModule } from '~/framework';
import { of } from 'rxjs';

import { SidenavMenuComponent } from './sidenav-menu.component';
import { TokenService } from '~/shared/services';

@Component({
  template: ''
})
export class MockComponent {
}

describe('SidenavMenuComponent', () => {
  let component: SidenavMenuComponent;
  let fixture: ComponentFixture<SidenavMenuComponent>;
  let router;

  beforeEach(async(() => {
    router = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MatListModule,
        RouterTestingModule.withRoutes([
          {
            path: 'my-bookings',
            component: MockComponent,
          },
          {
            path: 'auth/sign-in',
            component: MockComponent
          }
        ])
      ],
      declarations: [ MockComponent, SidenavMenuComponent ],
      providers: [
        {
          provide: TokenService, useValue: {
            currentUser: {
              email: 'fake@mail.com',
              displayName: 'Fake Name',
              uid: 'fakeUid'
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});

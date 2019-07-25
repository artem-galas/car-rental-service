import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '~/framework';

import { SidenavMenuComponent } from './sidenav-menu.component';
import { TokenService } from '~/shared/services';

describe('SidenavMenuComponent', () => {
  let component: SidenavMenuComponent;
  let fixture: ComponentFixture<SidenavMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MatListModule,
        RouterTestingModule
      ],
      declarations: [ SidenavMenuComponent ],
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

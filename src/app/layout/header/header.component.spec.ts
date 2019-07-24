import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatToolbarModule } from '@angular/material';

import { of } from 'rxjs';
import { MaterialModule } from '~/framework';

import { HeaderComponent } from './header.component';

const mockUser = {
  displayName: 'Fake Name'
};

const authFireStub = {
  user: of(mockUser)
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      declarations: [ HeaderComponent ],
      providers: [
        {
          provide: AngularFireAuth, useValue: authFireStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});

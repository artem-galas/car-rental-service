import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '~/framework';

import { SignUpComponent } from './sign-up.component';
import { AuthService } from '~/+auth/shared/services/auth.service';
import { of } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService;

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', ['signUp']);
    authService.signUp.and.returnValue(of({}));

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        RouterTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      declarations: [
        SignUpComponent
      ],
      providers: [
        {
          provide: AuthService, useValue: authService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});

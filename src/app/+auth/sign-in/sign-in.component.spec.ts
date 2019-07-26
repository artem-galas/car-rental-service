import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '~/framework';

import { SignInComponent } from './sign-in.component';
import { AuthService } from '~/+auth/shared/services/auth.service';
import { of } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  template: ''
})
class MockComponent {
}

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService;

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', {
      signIn: of({})
    });

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        RouterTestingModule.withRoutes([
          {
            path: 'my-bookings',
            component: MockComponent,
          },
          {
            path: 'auth/sign-in',
            component: MockComponent
          }
        ]),
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      declarations: [
        MockComponent,
        SignInComponent,
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
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });

  describe('validate', () => {
    let signInForm;

    beforeEach(() => {
      signInForm = component.signInForm;
    });

    it('should valid', () => {
      signInForm.patchValue({
        email: 'fake@mail.com',
        password: '12345678'
      });

      expect(signInForm.valid)
        .toBeTruthy();
    });

    it('password should has minLength error', () => {
      signInForm.patchValue({
        email: 'fake@mail.com',
        password: '1'
      });

      expect(signInForm.invalid)
        .toBeTruthy();
      expect(signInForm.hasError('minlength', 'password'))
        .toBeTruthy();
    });

    it('email should has email error', () => {
      signInForm.patchValue({
        email: 'fakeEmail.com',
        password: '123456789'
      });

      expect(signInForm.invalid)
        .toBeTruthy();
      expect(signInForm.hasError('email', 'email'))
        .toBeTruthy();
    });

    it('email should has require error', () => {
      signInForm.patchValue({
        email: '',
        password: '123456789'
      });

      expect(signInForm.invalid)
        .toBeTruthy();
      expect(signInForm.hasError('required', 'email'))
        .toBeTruthy();
    });
  });

  describe('.submitSignInForm', () => {
    it('should signIn', () => {
      const formValue = {
        email: 'fake@mail.com',
        password: '12345678'
      };

      component.signInForm.patchValue(formValue);

      fixture.detectChanges();

      component.submitSignInForm();

      expect(authService.signIn)
        .toHaveBeenCalledWith(formValue);
    });

    it('should not signUp', () => {
      const formValue = {
        fullName: 'Fake Name',
      };

      component.signInForm.patchValue(formValue);

      fixture.detectChanges();

      component.submitSignInForm();

      expect(authService.signIn)
        .not
        .toHaveBeenCalled();
    });
  });
});

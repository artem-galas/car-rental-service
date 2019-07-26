import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '~/framework';

import { SignUpComponent } from './sign-up.component';
import { AuthService } from '~/+auth/shared/services/auth.service';
import { from, of } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService;

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', ['signUp']);
    authService.signUp.and.returnValue(from(Promise.resolve()));

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

  describe('validate', () => {
    let signUpForm;

    beforeEach(() => {
      signUpForm = component.signUpForm;
    });

    it('should valid', () => {
      signUpForm.patchValue({
        email: 'fake@mail.com',
        fullName: 'Fake Name',
        idNumber: 'ABC1',
        password: '12345678'
      });

      expect(signUpForm.valid)
        .toBeTruthy();
    });

    it('fullName should has require error', () => {
      signUpForm.patchValue({
        fullName: '',
      });

      expect(signUpForm.invalid)
        .toBeTruthy();
      expect(signUpForm.hasError('required', 'fullName'))
        .toBeTruthy();
    });

    it('idNumber should has require error', () => {
      signUpForm.patchValue({
        idNumber: '',
      });

      expect(signUpForm.invalid)
        .toBeTruthy();
      expect(signUpForm.hasError('required', 'idNumber'))
        .toBeTruthy();
    });
  });

  describe('.submitSignUpForm', () => {
    it('should signUp', () => {
      const formValue = {
        email: 'fake@mail.com',
        fullName: 'Fake Name',
        idNumber: 'ABC1',
        password: '12345678'
      };

      component.signUpForm.patchValue(formValue);

      fixture.detectChanges();

      component.submitSignUpForm();

      expect(authService.signUp)
        .toHaveBeenCalledWith(formValue);
    });

    it('should not signUp', () => {
      const formValue = {
        fullName: 'Fake Name',
      };

      component.signUpForm.patchValue(formValue);

      fixture.detectChanges();

      component.submitSignUpForm();

      expect(authService.signUp)
        .not
        .toHaveBeenCalled();
    });
  });
});

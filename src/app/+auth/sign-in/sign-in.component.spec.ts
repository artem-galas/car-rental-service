import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '~/framework';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MaterialModule
      ],
      declarations: [
        SignInComponent
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
    expect(component).toBeTruthy();
  });

  describe('validate', () => {
    const signInForm = component.signInForm;
    it('should valid', () => {
      signInForm.patchValue({
        username: 'artem',
        password: '12345678'
      });

      expect(signInForm.valid)
        .toBeTruthy();
    });

    it('password should has minLength error', () => {
      signInForm.patchValue({
        username: 'artem',
        password: '1'
      });

      expect(signInForm.invalid)
        .toBeTruthy();
      expect(signInForm.hasError('minLength', 'password'))
        .toBeTruthy();
    });

    it('username should has require error', () => {
      signInForm.patchValue({
        username: '',
        password: '123456789'
      });

      expect(signInForm.invalid)
        .toBeTruthy();
      expect(signInForm.hasError('require', 'username'))
        .toBeTruthy();
    });
  });
});

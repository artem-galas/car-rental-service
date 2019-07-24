import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import Veriff from '@veriff/js-sdk';
import { switchMap, takeUntil } from 'rxjs/operators';

import { BaseComponent } from '~/framework';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'crs-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends BaseComponent implements OnInit {
  signUpForm: FormGroup;
  veriff;

  get fullName() {
    return this.signUpForm.get('fullName').value;
  }

  get firstName() {
    return this.fullName.split(' ')[0];
  }

  get lastName() {
    return this.fullName.split(' ')[1];
  }

  get idNumber() {
    return this.signUpForm.get('idNumber').value;
  }

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly snackBar: MatSnackBar,
              private readonly render: Renderer2) {
    super();
  }

  ngOnInit() {
    this.buildForm();
    this.initializeVeriff();
  }

  submitSignUpForm() {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value)
        .pipe(
          switchMap(() => {
            const successSnackBar = this.snackBar.open('Your identity should be verified.', 'Verify');

            return successSnackBar.onAction();
          }),
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          () => {
            this.veriff.setParams({
              person: {
                givenName: this.firstName,
                lastName: this.lastName,
                idNumber: this.idNumber
              }
            });
            this.veriff.mount();

            const veriffButton = this.render.selectRootElement('#veriff-submit-btn') as HTMLInputElement;
            veriffButton.click();
        },
          (message: string) => {
            this.snackBar.open(message, 'Ok');
          }
        );
    } else {
      this.snackBar.open('Form is not valid', 'Ok');
    }
  }

  private buildForm() {
    this.signUpForm = this.fb.group({
      email: [null, Validators.compose(
        [Validators.required, Validators.email]
      )],
      fullName: [null, Validators.compose(
        [Validators.required]
      )],
      idNumber: [null, Validators.compose(
        [Validators.required]
      )],
      password: [null, Validators.compose(
        [Validators.required, Validators.minLength(6)]
      )],
    });
  }

  private initializeVeriff() {
    this.veriff = Veriff({
      env: 'production',
      apiKey: 'c273bb49-3be7-447e-a7cc-3d00cb9cfdeb',
      parentId: 'veriff-root',
      onSession: (err, response) => {
        location.replace(response.verification.url);
      }
    });
  }

}

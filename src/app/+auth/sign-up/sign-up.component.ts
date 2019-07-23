import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'crs-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
    this.buildForm();
  }

  submitSignUpForm() {
    this.authService.signUp(this.signUpForm.value)
      .subscribe(
        user => console.log(user),
        (message: string) => {
          this.snackBar.open(message, 'Ok');
        }
      );
  }

  private buildForm() {
    this.signUpForm = this.fb.group({
      email: [null, Validators.compose(
        [Validators.required, Validators.email]
      )],
      fullName: [null, Validators.compose(
        [Validators.required]
      )],
      password: [null, Validators.compose(
        [Validators.required, Validators.minLength(6)]
      )],
    });
  }

}

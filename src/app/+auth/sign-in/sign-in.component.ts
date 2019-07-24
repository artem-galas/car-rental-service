import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '~/+auth/shared/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'crs-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private readonly authService: AuthService,
              private readonly snackBar: MatSnackBar,
              private readonly router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  submitSignInForm() {
    this.authService
      .signIn(this.signInForm.value)
      .subscribe(
        (user) => {
          this.router.navigate(['my-rental']);
        },
        (message: string) => {
          this.snackBar.open(message, 'Ok');
        }
      );
  }

  private buildForm() {
    this.signInForm = this.fb.group({
      email: [null, Validators.compose(
        [Validators.required, Validators.email]
      )],
      password: [null, Validators.compose(
        [Validators.required, Validators.minLength(6)]
      )]
    });
  }

}

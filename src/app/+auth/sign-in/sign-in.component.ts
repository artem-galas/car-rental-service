import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'crs-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  submitSignInForm() {
    console.log(this.signInForm.value);
  }

  private buildForm() {
    this.signInForm = this.fb.group({
      username: [null, Validators.compose(
        [Validators.required]
      )],
      password: [null, Validators.compose(
        [Validators.required, Validators.minLength(6)]
      )]
    });
  }

}

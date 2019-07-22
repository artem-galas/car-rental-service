import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'crs-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  submitSignUpForm() {
    console.log(this.signUpForm.value);
  }

  private buildForm() {
    this.signUpForm = this.fb.group({
      username: [null, Validators.compose(
        [Validators.required]
      )],
      fullName: [null, Validators.compose(
        [Validators.required]
      )],
      password: [null, Validators.compose(
        [Validators.required, Validators.minLength(6)]
      )],
      passwordConfirm: [null, Validators.compose(
        [Validators.required, Validators.minLength(6)]
      )]
    });
  }

}

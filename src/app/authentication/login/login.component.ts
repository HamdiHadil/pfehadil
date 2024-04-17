import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  errorMessage: string | null = null;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]})

  constructor(public router: Router, private fb: FormBuilder, private auth: AngularFireAuth, private authService: AuthService) { }


  login() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.get(['email'])!.value, this.loginForm.get(['password'])!.value)
          .then(response => {
            // Handle successful login
            this.auth.authState.subscribe(user => {
              if (user) {
                this.router.navigate(['/admin/farmer']);
              }
            })
          })
          .catch(error => {
            // Handle login error
            this.errorMessage = error.message;
          });
    }
  }
}

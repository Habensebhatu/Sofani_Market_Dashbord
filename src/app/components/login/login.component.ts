import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm!: FormGroup;
  errorMessage?: string;
  unsubscribe$ = new Subject<void>();

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    console.log("testettdghvdhv");
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      
  }

  onSubmit() {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.authenticationService.login(username, password)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(success => {
              if (success) {
                  this.router.navigate(['/products']);
                  return null;
              } else {
                  this.loginForm.get('password')!.setErrors({ misLogIn: true });
                  this.loginForm.get('username')!.setErrors({ misLogIn: true });
                  return { misLogIn: true };
              }
          });
  }

  ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
  }
}

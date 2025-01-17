import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { SharedStorageService } from '../../Services/shared-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private sharedStorageService: SharedStorageService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(
        response => {
          if (response.status === 1) {
            // Store username in SharedStorageService
            this.sharedStorageService.setCurrentUser(username);

            sessionStorage.setItem('currentUser', username);
            console.log(sessionStorage.getItem('currentUser'));
            // Navigate on successful login
            this.router.navigate(['/selectSession']);
          } else {
            alert(response.responsemsg || 'Invalid credentials. Please try again.');
          }
        },
        error => {
          alert('An error occurred during login. Please try again.');
          console.error('Login error:', error);
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}

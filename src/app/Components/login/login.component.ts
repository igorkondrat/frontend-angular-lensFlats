import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {AuthService} from '../../Services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../Models/User';
import {DashboardComponent} from '../account/dashboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('showLogin', [
      transition('void=>*', [
        style({borderRadius: '100px', opacity: 0}),
        animate(300, style({borderRadius: '10px', opacity: 1}))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
  user = {
    email: 'igooor.kondrat1998@gmail.com',
    password: '111',
  };

  isLoggedIn = true;
  answer: string;

  constructor(private authService: AuthService, private router: Router, private dashboardComponent: DashboardComponent) {
  }

  login(loginForm: NgForm) {
    this.authService.loginUser(loginForm).subscribe((response) => {
        if (response.headers.get('authToken') !== null) {
          localStorage.setItem('authToken', response.headers.get('authToken'));
          this.router.navigate(['/']);
          localStorage.setItem('isLogIn', 'true');
          this.authService.isLogin(true);
          this.authService.getUserInfo().subscribe((res: User) => {
            this.dashboardComponent.user = res;
            this.authService.changeUserPhoto(res);
          });
        } else {
          if (response.headers.get('accountDetails') !== null) {
            this.answer = response.headers.get('accountDetails');
          }
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLogIn') === 'true';
  }

  closeChanged() {
    this.router.navigate(['/']);
  }
}

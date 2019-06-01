import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../Services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;
  token: string;
  answer: string;
  wait: boolean;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((res) => {
      if (res.email && res.token) {
        this.email = res.email;
        this.token = res.token;
      }
    });
  }

  forgotPassword(passwordForm: NgForm) {
    this.wait = true;
    this.authService.rememberPassword(passwordForm).subscribe((response: any) => {
        this.wait = false;
        this.answer = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setNewPassword(newPasswordForm: NgForm) {
    this.authService.setNewPassword(newPasswordForm).subscribe((response: any) => {
        this.answer = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  closeChanged() {
    this.router.navigate(['/']);
  }
}

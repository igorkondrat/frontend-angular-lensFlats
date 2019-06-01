import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {RegistrationService} from '../../../Services/registration.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  answer;

  constructor(private registrationService: RegistrationService) {
  }

  ngOnInit() {
  }

  changePassword(passwordForm: NgForm) {
    this.registrationService.changePassword(passwordForm.value).subscribe((response) => {
      this.answer = response.body;
      if (response.headers.get('authToken') !== null) {
        localStorage.setItem('authToken', response.headers.get('authToken'));
      }
    });
  }
}

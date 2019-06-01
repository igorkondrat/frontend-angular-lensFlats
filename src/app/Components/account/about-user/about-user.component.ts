import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from '../../../app.component';
import {AuthService} from '../../../Services/auth.service';
import {RegistrationService} from '../../../Services/registration.service';
import {User} from '../../../Models/User';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.css']
})
export class AboutUserComponent implements OnInit {

  constructor(private appComponent: AppComponent, private authService: AuthService, private registrationService: RegistrationService) {
  }

  user: User;
  answer: string;

  ngOnInit() {
    setTimeout(() => {
      this.appComponent.showFlats = false;
    });
    this.authService.getUserInfo().subscribe((response) => {
      this.user = response;
    });
  }

  editUser(userForm: NgForm) {
    this.registrationService.updateUser(userForm.value).subscribe((response) => {
      this.answer = response;
    });
  }

}

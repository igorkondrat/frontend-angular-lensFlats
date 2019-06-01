import {Component, OnInit} from '@angular/core';
import {RegistrationService} from '../../../Services/registration.service';
import {AuthService} from '../../../Services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../Models/User';
import {AppComponent} from '../../../app.component';
import {AboutUserComponent} from '../about-user/about-user.component';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-change-photo',
  templateUrl: './change-photo.component.html',
  styleUrls: ['./change-photo.component.css']
})
export class ChangePhotoComponent implements OnInit {
  constructor(private registrationService: RegistrationService,
              private authService: AuthService,
              private aboutUserComponent: AboutUserComponent,
              private router: Router,
              private appComponent: AppComponent) {
  }

  userPhoto: File;
  answer: String;
  previewPhoto: false;

  ngOnInit() {
    setTimeout(() => {
      this.appComponent.showFlats = false;
    });
  }

  changePhoto(photoForm: NgForm) {
    if (this.userPhoto != null) {
      this.registrationService.changePhotoUser(this.userPhoto).subscribe((response: String) => {
        this.answer = response;
        this.authService.getUserInfo().subscribe((res: User) => {
          this.aboutUserComponent.user = res;
          this.authService.changeUserPhoto(res);
        });
      });
    }
    this.answer = 'Choose photo please';
  }

  onFileChanged(event) {
    if (event.target.files && event.target.files[0]) {
      this.userPhoto = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev: any) => {
        this.previewPhoto = ev.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  closeChanged() {
    this.router.navigate(['/account/aboutUser']);
  }
}

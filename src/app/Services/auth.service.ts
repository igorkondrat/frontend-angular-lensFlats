import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {http} from '../../variables';
import {User} from '../Models/User';
import {Flat} from '../Models/Flat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  redirectUrl: string;

  public _subject = new Subject<boolean>();
  public event = this._subject.asObservable();
  public subject = new Subject<User>();
  public userPhoto = this.subject.asObservable();

  getUserInfo() {
    return this.http.get(http + 'userInfo', {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  getUseFlats() {
    return this.http.get<Flat>(http + 'userFlats', {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  public isLogin(data: boolean) {
    this._subject.next(data);
  }

  public changeUserPhoto(data: User) {
    this.subject.next(data);
  }

  loginUser(loginForm: NgForm) {
    return this.http.post(http + 'login', loginForm.value, {observe: 'response'});
  }

  rememberPassword(passwordForm: NgForm) {
    return this.http.post(http + 'rememberPassword', passwordForm.value);
  }

  setNewPassword(newPasswordForm: NgForm) {
    const uploadData = new FormData();
    uploadData.append('email', newPasswordForm.value.email);
    uploadData.append('token', newPasswordForm.value.token);
    uploadData.append('password', newPasswordForm.value.password);
    uploadData.append('confirmPassword', newPasswordForm.value.confirmPassword);
    return this.http.post(http + 'setNewPassword', uploadData);
  }

}

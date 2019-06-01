import {Injectable} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {http} from '../../variables';
import {Observable} from 'rxjs';
import {User} from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  user: User;

  constructor(private http: HttpClient) {
  }

  userRegister(regForm: NgForm): Observable<User> {
    return this.http.post<User>(http + 'register', regForm);
  }

  updateUser(regForm: NgForm) {
    return this.http.post<string>(http + 'updateUser', regForm);
  }

  changePhotoUser(userPhoto: File) {
    const uploadData = new FormData();
    uploadData.append('newPhoto', userPhoto);
    return this.http.post(http + 'changePhoto', uploadData, {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  changePassword(passwordForm: NgForm) {
    const uploadData = new FormData();
    uploadData.append('currentPassword', new Blob([JSON.stringify(passwordForm)]));
    return this.http.post(http + 'changePassword', uploadData,
      {
        headers: {'authToken': localStorage.getItem('authToken')},
        observe: 'response'
      });
  }

}

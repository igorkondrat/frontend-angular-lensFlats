import {Injectable, OnInit} from '@angular/core';
import {http} from '../../variables';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MessageService implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  getAllMessage() {
    return this.http.get(http + 'getAllMessages', {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  getSingleMessage(idFrom: number) {
    return this.http.get(http + 'getSingleMessages/' + idFrom, {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  sendMessage(messageForm: NgForm) {
    console.log(messageForm);
    return this.http.post(http + 'sendMessage', messageForm,
      {
        headers: {'authToken': localStorage.getItem('authToken')}
      });
  }

  createMessage(messageForm: NgForm) {
    return this.http.post(http + 'createMessage', messageForm,
      {
        headers: {'authToken': localStorage.getItem('authToken')}
      });
  }
}

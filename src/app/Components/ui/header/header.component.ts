import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Services/auth.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {AppComponent} from '../../../app.component';
import {User} from '../../../Models/User';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('showRegistration', [
      transition('void=>*', [
        style({height: '10%', opacity: 0}),
        animate(300, style({height: '100%', opacity: 1}))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;
  isLoggedIn = false;
  showFlats = true;

  constructor(private authService: AuthService, private appComponent: AppComponent) {
  }

  user: User;

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLogIn') === 'true';
    this.authService.event.subscribe((data) => {
      this.isLoggedIn = data;
    });
    if (this.isLoggedIn) {
      this.authService.getUserInfo().subscribe((response) => {
        this.user = response;
      });
    }
    this.authService.userPhoto.subscribe((res) => {
      this.user = res;
    });
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  onSingOut() {
    localStorage.removeItem('isLogIn');
    localStorage.removeItem('authToken');
    localStorage.clear();
    this.authService.isLogin(false);
  }

  myDashboard() {
    this.appComponent.showFlats = false;
  }

}

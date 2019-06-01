import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {AuthService} from '../../Services/auth.service';
import {User} from '../../Models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User;
  answer: string;

  constructor(private appComponent: AppComponent, private authService: AuthService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.appComponent.showFlats = false;
    });
    this.authService.getUserInfo().subscribe((response) => {
      this.user = response;
    });
  }

  ngOnDestroy(): void {
    this.appComponent.showFlats = true;
  }

}

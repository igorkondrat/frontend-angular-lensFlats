import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from '../../../app.component';
import {AuthService} from '../../../Services/auth.service';
import {Flat} from '../../../Models/Flat';
import {FlatService} from '../../../Services/flat.service';

@Component({
  selector: 'app-users-flats',
  templateUrl: './users-flats.component.html',
  styleUrls: ['./users-flats.component.css']
})
export class UsersFlatsComponent implements OnInit, OnDestroy {

  constructor(private appComponent: AppComponent, private authService: AuthService, private flatService: FlatService) {
  }

  flats: Flat;

  ngOnInit() {
    setTimeout(() => {
      this.appComponent.showFlats = false;
    });
    this.authService.getUseFlats().subscribe((response: Flat) => {
      this.flats = response;
    }, (error) => {
      console.log(error);
    });
  }


  ngOnDestroy(): void {
    this.appComponent.showFlats = true;
  }

  rating(flatId: number, rating: number) {
    this.flatService.rateFlat(flatId, rating).subscribe(() => {
    });
  }

}

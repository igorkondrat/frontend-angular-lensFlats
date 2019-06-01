import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Flat} from '../../Models/Flat';
import {FlatService} from '../../Services/flat.service';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-flats-view-current',
  templateUrl: './flats-view-current.component.html',
  styleUrls: ['./flats-view-current.component.css'],

})
export class FlatsViewCurrentComponent implements OnInit {
  lat: string;
  lng: string;
  flat: Flat;
  answer: string;
  fromDate: NgbDate;
  toDate: NgbDate;
  showNumber = false;

  phone: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flatService: FlatService,
    private router: Router,
    calendar: NgbCalendar
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params) => {
      this.flatService.getSingleFlatAnonymous(params.flatId).subscribe((response) => {
        this.flat = response;

        this.flatService.getOwnerEmail(this.flat.id).subscribe((response) => {
          this.phone = response[1];
        });

        this.flatService.getLocation(this.flat.address).subscribe((res) => {
            // @ts-ignore
            this.lat = res.results[0].geometry.location.lat;
            // @ts-ignore
            this.lng = res.results[0].geometry.location.lng;
          },
          (error: any) => {
            console.log(error);
          });
      });
    });
  }

  closeChanged() {
    this.router.navigate(['/']);
  }

  contactWithOwner(flatId: number) {
    this.flatService.getOwnerEmail(flatId).subscribe((response) => {
      this.phone = response[1];
      this.router.navigate(['account/createMessage',  {email: response[0]}]);
    });
  }

  showNumber2(){
      this.showNumber = !this.showNumber
  }

  rating(flatId: number, rating: number) {
    this.flatService.rateFlat(flatId, rating).subscribe();
  }
}

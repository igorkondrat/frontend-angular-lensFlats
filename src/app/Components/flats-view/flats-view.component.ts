import {Component, OnInit} from '@angular/core';
import {FlatService} from '../../Services/flat.service';
import {Flat} from '../../Models/Flat';
import {Options} from 'ng5-slider';

@Component({
  selector: 'app-flats-view',
  templateUrl: './flats-view.component.html',
  styleUrls: ['./flats-view.component.css']
})
export class FlatsViewComponent implements OnInit {

  constructor(private flatService: FlatService) {
  }

  minValue = 0;
  maxValue = 10000;
  flats: Flat;
  options: Options = {
    floor: 0,
    ceil: 10000,
    translate: (value: number): string => {
      return '₴' + value;
    },
    combineLabels: (minValue: string, maxValue: string): string => {
      return 'from ' + minValue + ' up to ' + maxValue;
    }
  };

  ngOnInit() {
    this.flatService.getAllFlats().subscribe((response) => {
      this.flats = response;
    });
  }

  rating(flatId: number, rating: number) {
    this.flatService.rateFlat(flatId, rating).subscribe();
  }

  checkbox(price) {
    const rating = document.getElementsByName('star');
    const rooms = document.getElementsByName('rooms');
    let ratingStar = 0;
    let roomsCount = 0;
    for (let i = 0; i < rating.length; i++) {
      // @ts-ignore
      if (rating[i].checked === true) {
        // @ts-ignore
        ratingStar = rating[i].value;
      }
    }
    for (let j = 0; j < rooms.length; j++) {
      // @ts-ignore
      if (rooms[j].checked === true) {
        // @ts-ignore
        roomsCount = rooms[j].value;
      }
    }
    this.flatService.getStarFilter(ratingStar, price.viewLowValue, price.viewHighValue, roomsCount).subscribe((response) => {
      this.flats = response;
    });

  }


}

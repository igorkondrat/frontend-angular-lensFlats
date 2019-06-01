import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {NgForm} from '@angular/forms';
import {FlatService} from '../../Services/flat.service';
import {Router} from '@angular/router';
import {Address} from '../../Models/Address';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.css'],
  animations: [
    trigger('showFlatRegistration', [
      transition('void=>*', [
        style({borderRadius: '100px', opacity: 0}),
        animate(300, style({borderRadius: '10px', opacity: 1}))
      ])
    ])
  ]
})
export class FlatComponent implements OnInit {
  flat = {
    nameFlat: '',
    price: Number,
    square: Number,
    storeys: Number,
    wallingMaterial: '',
    rooms: Number,
    floor: Number,
    address: '',
    guests: Number
  };

  @ViewChild('search')
  public searchElementRef: ElementRef;

  answer: String;
  addrKeys: string[];
  addr: Address;

  constructor(private flatService: FlatService,
              private router: Router,
              private mapsAPILoader: MapsAPILoader,
              private zone: NgZone) {
  }

  ngOnInit() {
  }

  registerFlat(flatForm: NgForm) {

    flatForm.value.address = '';
    if (this.addr !== undefined) {
      if (this.addr.country !== undefined) {
        flatForm.value.address += this.addr.country + ', ';
      }

      if (this.addr.admin_area_l1 !== undefined) {
        flatForm.value.address += this.addr.admin_area_l1 + ', ';
      }
      if (this.addr.locality !== undefined) {
        flatForm.value.address += this.addr.locality + ', ';
      }

      if (this.addr.route !== undefined) {
        flatForm.value.address += this.addr.route + ', ';
      }

      if (this.addr.street_number !== undefined) {
        flatForm.value.address += this.addr.street_number + ' ';
      }
    }

    this.flatService.flatRegister(flatForm).subscribe((response) => {
        this.answer = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  closeChanged() {
    this.router.navigate(['/']);
  }

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }

}

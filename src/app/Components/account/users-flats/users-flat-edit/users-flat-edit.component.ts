import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FlatService} from '../../../../Services/flat.service';
import {Flat} from '../../../../Models/Flat';
import {NgForm} from '@angular/forms';
import {UsersFlatsComponent} from '../users-flats.component';
import {Address} from '../../../../Models/Address';
import {AuthService} from '../../../../Services/auth.service';

@Component({
  selector: 'app-users-flat-edit',
  templateUrl: './users-flat-edit.component.html',
  styleUrls: ['./users-flat-edit.component.css']
})
export class UsersFlatEditComponent implements OnInit {

  flat: Flat;
  flatPhotos: File[];
  answer: string;
  addrKeys: string[];
  addr: Address;
  lat: string;
  lng: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flatService: FlatService,
    private router: Router,
    private userFlatsComponent: UsersFlatsComponent,
    private zone: NgZone,
    private auth: AuthService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.flatService.getSingleFlat(params.flatId).subscribe((response) => {
        this.flat = response;
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

  onFileChangedFlats(event) {
    if (event.target.files) {
      this.flatPhotos = event.target.files;
    }
  }

  onSetFile(photoForm: NgForm) {
    this.flatService.changePhotoFlat(this.flatPhotos, photoForm).subscribe((response) => {
      this.flatPhotos = null;
      this.answer = response;
      this.flatService.getSingleFlat(this.flat.id.toString()).subscribe((res) => {
        this.flat = res;
      });
    });
  }

  deletePhoto(flatPhoto: string, flatId: string) {
    this.flatService.deletePhotoFlat(flatPhoto, flatId).subscribe(() => {
      this.flatService.getSingleFlat(flatId).subscribe((res) => {
        this.flat = res;
      });
    });
  }

  deleteFlat(flatId: number) {
    this.flatService.deleteFlat(flatId).subscribe(() => {
      this.auth.getUseFlats().subscribe((res) => {
        this.userFlatsComponent.flats = res;
        this.router.navigate(['property']);
      });
    });
  }

  closeChanged() {
    this.router.navigate(['property']);
  }

  editFlat(flatForm: NgForm) {
    if (this.addr !== undefined) {
      flatForm.value.address = '';
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
    } else {
      flatForm.value.address = this.flat.address;
    }

    this.flatService.updateFlat(flatForm.value).subscribe((response) => {
      this.answer = response;
      this.flatService.getSingleFlat(this.flat.id.toString()).subscribe((res) => {
        this.flat = res;
        this.flatService.getLocation(this.flat.address).subscribe((answer) => {
            // @ts-ignore
            this.lat = answer.results[0].geometry.location.lat;
            // @ts-ignore
            this.lng = answer.results[0].geometry.location.lng;
          },
          (error: any) => {
            console.log(error);
          });
        this.answer = response;
      });
    });
  }

  setAddress(addrObj) {
    this.zone.run(() => {
      this.addr = addrObj;
      this.addrKeys = Object.keys(addrObj);
    });
  }

}

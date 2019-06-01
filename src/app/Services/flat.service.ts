import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {http} from '../../variables';

@Injectable({
  providedIn: 'root'
})
export class FlatService {
  constructor(private http: HttpClient) {
  }

  flatRegister(flatForm: NgForm) {
    return this.http.post<String>(http + 'flatRegister', flatForm.value, {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  getAllFlats() {
    return this.http.get(http + 'getAllFlats');
  }

  getStarFilter(rating: number, minPrice: number, maxPrice: number, roomsCount: number) {
    return this.http.get(http + 'getFilter/' + rating + '&' + minPrice + '&' + maxPrice + '&' + roomsCount);
  }

  getSingleFlat(flatId: string) {
    return this.http.get(http + 'getSingleFlat/' + flatId, {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  getSingleFlatAnonymous(flatId: string) {
    return this.http.get(http + 'getSingleFlatAnonymous/' + flatId);
  }

  changePhotoFlat(flatPhoto: File[], photoForm: NgForm) {
    const uploadData = new FormData();
    for (let i = 0; i < flatPhoto.length; i++) {
      uploadData.append('newPhotoFlat', flatPhoto[i]);
    }
    const id = photoForm.value.id;
    return this.http.post<string>(http + 'changePhotoFlat' + id, uploadData, {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  deletePhotoFlat(flatPhoto: string, flatId: string) {
    return this.http.post(http + 'deleteFlatPhoto/' + flatPhoto + '&' + flatId, null, {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  deleteFlat(flatId: number) {
    return this.http.post(http + 'deleteFlat' + flatId, null, {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  updateFlat(flatForm: NgForm) {
    return this.http.post<string>(http + 'updateFlat', flatForm, {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  rateFlat(flatId: number, rating: number) {
    return this.http.get(http + 'rateFlat/' + flatId + '/' + rating, {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

  getLocation(address: string) {
    return this.http.get<string>('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query='
      + address
      + '&key=AIzaSyAqWVKlXaSPD8KcHQ0ncNl5qcxglyBlnyI');
  }

  getOwnerEmail(flatId: number) {
    return this.http.get<string>(http + 'getOwnerEmail/' + flatId, {
      headers: {
        'authToken': localStorage.getItem('authToken')
      }
    });
  }

}

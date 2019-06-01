import {User} from './User';

export class Flat {

  constructor(
    public id?: number,
    public nameFlat?: string,
    public price?: number,
    public square?: string,
    public storeys?: string,
    public wallingMaterial?: string,
    public averageRating?: number,
    public rooms?: string,
    public floor?: string,
    public address?: string,
    public guests?: number,
    public listPhotoFlats?: string,
    public user?: User,
  ) {
  }
}

import { Injectable } from '@angular/core';
import { maps } from './data/maps';

@Injectable()
export class MapService {

  constructor() { }

  public static getMapById(id:string){
      return maps.find(map=>map.id===id);
  }

}
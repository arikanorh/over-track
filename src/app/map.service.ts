import { Injectable } from '@angular/core';
import { maps } from './data/maps';
import { Map } from './model/map';

@Injectable()
export class MapService {

  constructor() { }

  public static getMapById(id:string):Map{
      return maps.find(map=>map.id===id);
  }

}
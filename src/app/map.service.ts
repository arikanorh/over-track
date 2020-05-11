import { Injectable } from '@angular/core';
import { maps } from './data/maps';
import { Map } from './model/map';

@Injectable()
export class MapService {

  constructor() { }

  public static getMapById(id:string):Map{
      return maps.find(map=>map.id===id);
  }
  public static getMaps():Map[]{
    return maps.sort((e1,e2)=> e1.name>e2.name?1:-1);
  }

}
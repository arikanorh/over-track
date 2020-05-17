import { Injectable } from '@angular/core';
import { maps } from '../data/maps';
import { Map } from '../model/Map';

@Injectable()
export class MapService {

  constructor() { }

  public   getMapById(id:string):Map{
      return maps.find(map=>map.id===id);
  }
  public   getMaps():Map[]{
    return maps.sort((e1,e2)=> e1.name>e2.name?1:-1);
  }

}
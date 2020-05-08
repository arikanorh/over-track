import { Component, OnInit } from '@angular/core';
import { GameRecord } from '../model/game';
import { maps } from '../data/maps';
import { Map } from '../model/map';
import  * as moment from "moment";
import { DbService } from '../db.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  mapList:Map[]=maps;
  model=new GameRecord();
  data$:Observable<GameRecord[]>;

  constructor(private dbService:DbService) {
   }

  ngOnInit() {
    this.model.map="1";
    this.data$ = this.dbService.getRecords();

   }

  add(){

    this.model.date= moment().format('YYYY-MM-DD HH:mm:ss '); 
    this.dbService.addItem(this.model);

     this.model = new GameRecord();
    this.model.map="1";
  }

delete(item:GameRecord){
  this.dbService.deleteItem(item);
  //this.data= this.data.filter(e=>e!==item);
}

}
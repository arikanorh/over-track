import { Component, OnInit } from '@angular/core';
import { Game } from '../model/game';
import { maps } from '../data/maps';
import { Map } from '../model/map';
import  moment from "moment";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  mapList:Map[]=maps;
  model=new Game();
  data:Game[]=[
    {
      map:'Hanamura', skillRating:2300,date:'2020-05-08 13:00:00'
    },{
      map:'Hanamura', skillRating:2320,date:'2020-05-08 13:25:00'
    },{
      map:'Hanamura', skillRating:2301,date:'2020-05-08 13:42:00'
    },{
      map:'Hanamura', skillRating:2280,date:'2020-05-08 13:34:00'
    },{
      map:'Hanamura', skillRating:2305,date:'2020-05-08 13:55:00'
    },{
      map:'Hanamura', skillRating:2330,date:'2020-05-08 14:12:00'
    },{
      map:'Hanamura', skillRating:2370,date:'2020-05-08 14:30:00'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  add(){

    this.model.date= moment().format('YYYY-MM-DD HH:mm:ss '); 

    this.data.push(this.model);
    this.model = new Game();
  }

}
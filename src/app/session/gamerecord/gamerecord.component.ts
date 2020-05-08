import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapService } from '../../map.service';
import { GameRecord } from 'src/app/model/game';
import { Map } from 'src/app/model/map';
import  * as moment from "moment";

@Component({
  selector: 'app-gamerecord',
  templateUrl: './gamerecord.component.html',
  styleUrls: ['./gamerecord.component.css']
})
export class GamerecordComponent implements OnInit {

  @Input() game:GameRecord;
  @Output() del = new EventEmitter();
  map:Map;
  ago:string;
  constructor() { }

  ngOnInit() {
     this.map = MapService.getMapById(this.game.map);
     this.ago = moment(this.game.date,'YYYY-MM-DD HH:mm:ss').fromNow();
  }

}
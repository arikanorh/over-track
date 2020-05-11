import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MapService } from '../../../map.service';
import { GameRecord } from 'src/app/model/GameRecord';
import { Map } from 'src/app/model/map';
import * as moment from "moment";

@Component({
  selector: 'app-gamerecord',
  templateUrl: './gamerecord.component.html',
  styleUrls: ['./gamerecord.component.css']
})
export class GamerecordComponent implements OnInit,OnChanges {

  @Input() game: GameRecord;
  @Input() prev: GameRecord;

  @Output() del = new EventEmitter();
  @Output() update = new EventEmitter();

  map: Map;
  ago: string;
  win: boolean;
  lose: boolean;
  tie: boolean;
  diffAbs: number;
  constructor() { }

  ngOnInit() {
    this.map = MapService.getMapById(this.game.map);
    this.ago = moment(this.game.timestamp?.toDate()).fromNow();
    if (this.prev) {
      let diff = this.game.skillRating - this.prev.skillRating;
      this.diffAbs = Math.abs(diff);
    }
    this.calcStatus();
   

  }
  ngOnChanges(){
    this.calcStatus();

  }

  calcStatus(){
    if (this.game.status === "WIN")
    this.win = true;
  else if (this.game.status === "LOSE")
    this.lose = true;
  else if (this.game.status === "TIE")
    this.tie = true;
  }


}
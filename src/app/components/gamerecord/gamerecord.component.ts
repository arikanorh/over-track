import { Component, OnInit, Input, Output, EventEmitter, OnChanges, HostListener, ChangeDetectionStrategy } from '@angular/core';
 import   moment from "moment";
import { MapService } from '../../services/map.service';
import { Map } from '../../model/Map';
import { GameRecord } from '../../model/GameRecord';
 
@Component({
  selector: 'app-gamerecord',
  templateUrl: './gamerecord.component.html',
  styleUrls: ['./gamerecord.component.css']
})
export class GamerecordComponent implements OnInit, OnChanges {

  @Input() game: GameRecord;
  @Input() prev: GameRecord;
  @Input() readOnly: boolean;

  @Output() del = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() editModeChanged = new EventEmitter();

  ago: string;
  win: boolean;
  lose: boolean;
  tie: boolean;
  diffAbs: number;
  editMode: boolean = false;
  maps;
  map: Map;

  closeTimer;
  constructor(public mapService: MapService) { }

  ngOnInit() {
    this.maps = this.mapService.getMaps();
    this.map = this.mapService.getMapById(this.game.map);

    if (this.prev) {
      let diff = this.game.skillRating - this.prev.skillRating;
      this.diffAbs = Math.abs(diff);
    }

    this.win=false;
    this.lose=false;
    this.tie=false;
    
    if (this.game.status === "WIN"){
      this.win = true;
    }
    else if (this.game.status === "LOSE"){ 
      this.lose = true;
    }
    else if (this.game.status === "TIE"){
      this.tie = true;
    }

    this.ago = moment(this.game.timestamp?.toDate()).fromNow();



  }
  ngOnChanges() {
    this.ngOnInit();

  }



  toggleEditMode() {
    this.editMode = !this.editMode;
    this.editModeChanged.emit(this);
  }
  closeEditMode() {
    this.editMode = false;
  }

  @HostListener('click')
  onClick(e) {

  }

  @HostListener('mouseenter')
  scheduleInterval() {
    if (this.closeTimer) {
      clearInterval(this.closeTimer);
    }
  }

  @HostListener('mouseleave')
  autoCloseEditMode(e) {
    this.closeTimer = setTimeout(() => {
      this.editMode = false;
    }, 1000);
  }
}
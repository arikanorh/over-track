import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapService } from '../../map.service';

@Component({
  selector: 'app-gamerecord',
  templateUrl: './gamerecord.component.html',
  styleUrls: ['./gamerecord.component.css']
})
export class GamerecordComponent implements OnInit {

  @Input() game;
  @Output() del = new EventEmitter();
  name;
  constructor() { }

  ngOnInit() {
     this.name = MapService.getMapById(this.game.map).name;
  }

}
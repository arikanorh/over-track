import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
 import  moment from "moment";
import { SessionRecord } from '../../model/SessionRecord';
import { Char } from '../../model/Char';

@Component({
  selector: 'app-session-record',
  templateUrl: './session-record.component.html',
  styleUrls: ['./session-record.component.css']
})
export class SessionRecordComponent implements OnInit {

  @Input() session: SessionRecord;
  @Input() index: number;
  @Output() update = new EventEmitter();
  @Input() chars: Char[];

  editMode = false;
  ago: string;
  constructor() {
    
  }

  ngOnInit() {
    this.ago = moment(this.session.started?.toDate()).fromNow();
  }
  updateCharName(name: string) {
    this.session.char.name=name;
  }

  updateSessions() {

    this.update.emit(this.session);
     this.editMode = false;
  }

}

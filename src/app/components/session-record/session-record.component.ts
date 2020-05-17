import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionRecord } from 'src/app/model/SessionRecord';
import * as moment from "moment";
import { Char } from 'src/app/model/Char';
import { SessionService } from 'src/app/services/session.service';

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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionRecord } from 'src/app/model/SessionRecord';
import * as moment from "moment";

@Component({
  selector: 'app-session-record',
  templateUrl: './session-record.component.html',
  styleUrls: ['./session-record.component.css']
})
export class SessionRecordComponent implements OnInit {

  @Input() session:SessionRecord;
  @Input() index:number;
  @Output() del = new EventEmitter();
  ago:string;
  constructor() { }

  ngOnInit() {
    this.ago = moment(this.session.started?.toDate()).fromNow();

  }

}

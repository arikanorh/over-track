import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-session-stat-displayer',
  templateUrl: './session-stat-displayer.component.html',
  styleUrls: ['./session-stat-displayer.component.css']
})
export class SessionStatDisplayerComponent implements OnInit {

  @Input() session;
  @Input() lastGameOfSession;

  constructor() { }

  ngOnInit() {
    }

}
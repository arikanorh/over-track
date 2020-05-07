import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-gamerecord',
  templateUrl: './gamerecord.component.html',
  styleUrls: ['./gamerecord.component.css']
})
export class GamerecordComponent implements OnInit {

  @Input() game;
  @Output() delete;
  constructor() { }

  ngOnInit() {
  }

}
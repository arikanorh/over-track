import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ui-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

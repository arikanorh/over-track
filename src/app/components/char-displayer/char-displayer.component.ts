import { Component, OnInit, Input } from '@angular/core';
import { Char } from 'src/app/model/Char';

@Component({
  selector: 'app-char-displayer',
  templateUrl: './char-displayer.component.html',
  styleUrls: ['./char-displayer.component.css']
})
export class CharDisplayerComponent implements OnInit {

  @Input() char:Char;
  constructor() { }

  ngOnInit() {
  }

}

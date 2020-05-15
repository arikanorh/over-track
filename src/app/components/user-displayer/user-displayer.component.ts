import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-user-displayer',
  templateUrl: './user-displayer.component.html',
  styleUrls: ['./user-displayer.component.css']
})
export class UserDisplayerComponent implements OnInit {

  @Input() user:User
  
  constructor() { }

  ngOnInit() {
  }

}

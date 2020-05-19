import { Component, OnInit } from '@angular/core';
 import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../model/User';
  
@Component({
  selector: 'app-page',
  templateUrl: './users-page.html',
  styleUrls: ['./users-page.css']
})
export class UsersPage implements OnInit {

  users$:Observable<User[]>;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.users$=this.userService.getUsers$();
  }

}

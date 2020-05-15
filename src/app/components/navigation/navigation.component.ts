import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/User';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  user: User;

  constructor(public auth: AuthService,private router:Router,private route:ActivatedRoute) {

    auth.getUser().subscribe(e => {
      this.user = e;
    });
  }

  login() {
    this.auth.login();
  }
 
  logout() {
    this.auth.logout();
  }

  goBack(){
    window.history.back();

  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage implements OnInit {

  constructor(private as:AuthService,private router:Router) { }

  ngOnInit() {
    this.as.getUser$().subscribe(e=>{
      if(e){
        console.log('Gonna redirect user');
        this.router.navigate(['/'])

      }
    })
  }

}
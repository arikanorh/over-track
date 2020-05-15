import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-my-session',
  template: '',
  styles: []
})
export class MySessionsPage implements OnInit {

  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit() {
    this.auth.getUser().subscribe(e=>{
      this.router.navigate(['users',e.uid,'sessions']);
    })
  }

}

// This page just redirects

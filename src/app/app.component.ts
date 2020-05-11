import { Component } from "@angular/core";
import { AuthService } from './auth.service';

 

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  user;
  constructor(public auth: AuthService) {

    auth.getUser().subscribe(e=>{
      this.user =e;
    });
  

  }
  login() {
     this.auth.login();
  }
  logout() {
    this.auth.logout();
  }
}

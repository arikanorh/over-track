import { Component, VERSION } from "@angular/core";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html", 
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(public auth: AngularFireAuth) {
  
  }
  login() {
    console.log(this.auth);
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }}

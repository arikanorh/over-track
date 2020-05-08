import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _user$= new BehaviorSubject<User>(null);
  user$ =this._user$.asObservable();

  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe(e=>{
      this._user$.next(e);
  
    })
  }
    login() {
      console.log(this.auth);
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    logout() {
      this.auth.signOut();
    }

    public getUser(){
      return this._user$;
    }
}

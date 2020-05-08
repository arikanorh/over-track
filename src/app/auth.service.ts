import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _user$= new BehaviorSubject<User>(null);
  user$ =this._user$.asObservable();

  constructor(public auth: AngularFireAuth) {
    this.auth.authState.subscribe((e:User)=>{
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

    public getUser():Observable<User>{
      return this.user$;
    }
    // public getCurentUser(){
    //   return this._user$.value;
    // }
}

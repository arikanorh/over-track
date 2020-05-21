import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, firestore } from 'firebase/app';
import {  Observable, ReplaySubject } from 'rxjs';
import { User } from '../model/User';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _user$= new ReplaySubject<User>(1);
  user$ =this._user$.asObservable();
  currentUser:User;

  constructor(public auth: AngularFireAuth,afs:AngularFirestore,private router:Router) {
    
    
    this.auth.authState.subscribe((e:firebase.User)=>{
      if(!e){
      this._user$.next(null)
       return;
      }
      let user= new User();
       user.uid = e.uid;
       user.displayName = e.displayName;
       user.photoURL = e.photoURL;
       user.email = e.email;
       user.lastLogin = firestore.FieldValue.serverTimestamp();
       this.currentUser =user;
       this._user$.next(user);
       afs.collection('users').doc(user.uid).set({...user});
  
    })
  }
    login() {
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    logout() {
      this.auth.signOut().then(e=>{
        this._user$.next(null);
        this.router.navigate(['login']);
      });
    }

    public getUser$():Observable<User>{
      return this.user$;
    }
    public getCurentUser():User{
       return this.currentUser;
    }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/User';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  private _users$: ReplaySubject<User[]> = new ReplaySubject(1);
  private users$: Observable<User[]> = this._users$.asObservable();

  constructor(private afs: AngularFirestore) {

    this.usersCollection = this.afs.collection<User>('users');
    this.usersCollection.valueChanges().subscribe(e => {
      this._users$.next(e);
    })
  }

  public getUsers$() {
    return this.users$; 
  }

}

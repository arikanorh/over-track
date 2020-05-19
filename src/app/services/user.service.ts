import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/User';
 import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$: ReplaySubject<User[]> = new ReplaySubject(1);
  private users$: Observable<User[]> = this._users$.asObservable();

  constructor(private afs: AngularFirestore) {

    this.afs.collection<User>('users').get().subscribe(
      e => {
        this._users$.next(e.docs.map(e => {
          return e.data() as User;
        }));
      }
    )
    
  }

  public getUsers$() {
    return this.users$; 
  }

}

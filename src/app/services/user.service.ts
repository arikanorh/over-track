import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/User';
 import { ReplaySubject, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users$: ReplaySubject<User[]> = new ReplaySubject(1);
  private users$: Observable<User[]> = this._users$.asObservable();

  constructor(private afs: AngularFirestore,private ls:LoaderService) {

    this.ls.show();
    this.afs.collection<User>('users').get().subscribe(
      e => {
        this._users$.next(e.docs.map(e => {
          return e.data() as User;
        }));
        this.ls.hide();
      }
    )
    
  }

  public getUsers$() {
    return this.users$; 
  }

}

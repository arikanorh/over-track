import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { GameRecord } from './model/game';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './model/User';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private itemsCollection: AngularFirestoreCollection<GameRecord>;
  _items$:BehaviorSubject<GameRecord[]> = new BehaviorSubject(null);
  items:Observable<GameRecord[]>= this._items$.asObservable();

  constructor(private afs: AngularFirestore,  auth:AuthService) {
    auth.getUser().subscribe(user=>{
      if(user){
        this.itemsCollection = afs.collection<GameRecord>('users/'+user.uid+"/games");
          this.itemsCollection.valueChanges().subscribe(e=>{
           this._items$.next(e);
        })}
      
    })

  }
  public addItem(item: GameRecord) {
    const id = this.afs.createId();
    item.id = id;
    this.itemsCollection.doc(id).set({...item});
   }

  public getRecords():Observable<GameRecord[]>{
    return this.items;
  }

  public deleteItem(item:GameRecord){
     this.itemsCollection.doc(item.id).delete();
  }

}

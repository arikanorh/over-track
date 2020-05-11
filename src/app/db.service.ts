import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { GameRecord } from './model/GameRecord';
import { Observable, ReplaySubject } from 'rxjs';
import { AuthService } from './auth.service';
import { tap} from 'rxjs/operators';

import { SessionRecord } from './model/SessionRecord';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private gamesCollection: AngularFirestoreCollection<GameRecord>;
  private _items$: ReplaySubject<GameRecord[]> = new ReplaySubject(1);
  private items$: Observable<GameRecord[]> = this._items$.asObservable();

  private sessionsCollection: AngularFirestoreCollection<SessionRecord>;
  private _sessions$: ReplaySubject<SessionRecord[]> = new ReplaySubject(1);
  private sessions$: Observable<SessionRecord[]> = this._sessions$.asObservable();


  constructor(private afs: AngularFirestore, private auth: AuthService) {
    auth.getUser().subscribe(user => {
      this.gamesCollection = afs.collection<GameRecord>('users/' + user.uid + "/games", ref => (ref.orderBy('timestamp', 'desc')));
      this.gamesCollection.valueChanges().subscribe(e => {
        this._items$.next(e);
      })

      this.sessionsCollection = afs.collection<SessionRecord>('users/' + user.uid + "/sessions", ref => (ref.orderBy('started', 'desc')));
      this.sessionsCollection.valueChanges().subscribe(e => {
        this._sessions$.next(e);
      })

    })

  }
  public addGameRecord(item: GameRecord, sessionid: string) {
    const id = this.afs.createId();
    item.id = id;
    item.sessionid = sessionid;
    item.timestamp = firebase.firestore.FieldValue.serverTimestamp();

    this.gamesCollection.doc(id).set({ ...item });
  }

  public getGameRecords$(): Observable<GameRecord[]> {
    return this.items$;
  }

  public getGameRecordsBySessionId$(uid: string, id: string): Observable<GameRecord[]> {
    return this.afs.collection<GameRecord>('users/' + uid + "/games", ref => (ref.where('sessionid', "==", id).orderBy('timestamp', 'desc'))).valueChanges({ serverTimestamps: 'estimate' }).pipe(
      tap(
        e=>{
          //console.log(e);
        }
      ));
  }

  public deleteGameRecord(item: GameRecord) {
    this.gamesCollection.doc(item.id).delete();
  }
  public updateGameRecord(item: GameRecord) {
    this.gamesCollection.doc(item.id).set({ ...item });
  }

  public deleteSessionRecord(id: string) {
    this.sessionsCollection.doc(id).delete();
  }

  public addSessionRecord(sessionname:string) {
    const id = this.afs.createId();
    let item = new SessionRecord();
    item.id = id;
    item.name=sessionname;
    item.started = firebase.firestore.FieldValue.serverTimestamp();
    this.sessionsCollection.doc(id).set({ ...item });
  }

  public getSessionRecords(): Observable<SessionRecord[]> {
    return this.sessions$;
  }

}

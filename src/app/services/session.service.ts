import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { SessionRecord } from '../model/SessionRecord';
import { GameRecord } from '../model/GameRecord';
import { tap } from 'rxjs/operators';
import { Char } from '../model/Char';

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  constructor(private afs: AngularFirestore) { }


  public getSessionsByUserId$(uid: string): Observable<SessionRecord[]> {
    return this.afs.collection<SessionRecord>('users/' + uid + "/sessions", ref => (ref.orderBy('started', 'desc'))).valueChanges().pipe(
      tap(e => {
        e.forEach(element => {
          if (!element.char){
            element.char = new Char();
          }
          if (!element.name){
            element.name = '';
          }
        })
      }));


  }

  public getSessionBySessionId$(uid: string, sid: string): Observable<SessionRecord> {
    return this.afs.collection<SessionRecord>('users/' + uid + "/sessions").doc<SessionRecord>(sid).valueChanges();

  }

  public updateSessionStats(id: string, uid: string, stats) {
    this.afs.collection<SessionRecord>('users/' + uid + "/sessions").doc(id).update({ ...stats })
  }

  public deleteSessionRecord(id: string, uid: string) {
    this.afs.collection<SessionRecord>('users/' + uid + "/sessions").doc(id).delete();
  }

  public addSessionRecord(session: SessionRecord, uid: string) {

    const id = this.afs.createId();
    session.id = id;
    session.char = {...session.char};
    session.last_game= {...session.last_game}
    session.last_game.map="22";
    session.started = firebase.firestore.FieldValue.serverTimestamp();
    this.afs.collection<SessionRecord>('users/' + uid + "/sessions").doc(id).set({...session});
  }

  public updateSessionsLastGameInfo(uid: string, sid: string, gamerecord: GameRecord) {
    this.afs.doc('users/' + uid + "/sessions/" + sid).update({ last_game: { ...gamerecord } })
  }

  public updateSessionCharInfo(uid: string, sid: string, session: SessionRecord) {

    let updateInfo = new SessionRecord();
    updateInfo.role = session.role;
    updateInfo.char = Object.assign({}, session.char);
    updateInfo.name = session.name;
    this.afs.collection('users').doc(uid).collection('sessions').doc(sid).set(Object.assign({}, updateInfo), { merge: true });
  }

}

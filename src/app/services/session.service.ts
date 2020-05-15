import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { SessionRecord } from '../model/SessionRecord';
import { GameRecord } from '../model/GameRecord';

@Injectable({
  providedIn: 'root'
})
export class SessionService {


  constructor(private afs: AngularFirestore) { }
 
  
  public getSessionsByUserId$(uid: string): Observable<SessionRecord[]> {
    return this.afs.collection<SessionRecord>('users/' + uid + "/sessions", ref => (ref.orderBy('started', 'desc'))).valueChanges();

  }

  public getSessionBySessionId$(uid:string,sid:string):Observable<SessionRecord>{
    return this.afs.collection<SessionRecord>('users/'+uid+"/sessions").doc<SessionRecord>(sid).valueChanges();
  }

  public updateSessionStats(id:string,uid:string,stats){
    this.afs.collection<SessionRecord>('users/'+uid+"/sessions").doc(id).update({...stats})
  }

  public deleteSessionRecord(id: string,uid:string) {
    this.afs.collection<SessionRecord>('users/' + uid + "/sessions").doc(id).delete();
  }

  public addSessionRecord(sessionname: string,uid:string) {

    const id = this.afs.createId();
    let item = new SessionRecord();
    item.id = id;
    item.name = sessionname;
    item.started = firebase.firestore.FieldValue.serverTimestamp();
    this.afs.collection<SessionRecord>('users/' + uid + "/sessions").doc(id).set({ ...item });
  }

  public updateSessionsLastGameInfo(uid:string,sid:string,gamerecord:GameRecord){
    this.afs.doc('users/'+uid+"/sessions/"+sid).update({last_game:{...gamerecord}})
  }

}

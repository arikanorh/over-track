import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GameRecord } from '../model/GameRecord';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private afs: AngularFirestore) { }

  public getGameRecordsBySessionId$(uid: string, id: string): Observable<GameRecord[]> {
    return this.afs.collection<GameRecord>('users/' + uid + "/games", ref => (ref.where('sessionid', "==", id).orderBy('timestamp', 'desc'))).valueChanges({ serverTimestamps: 'estimate' });
  }

  public addGameRecord(item: GameRecord, sessionid: string, uid: string) {
    const id = this.afs.createId();
    item.id = id;
    item.sessionid = sessionid;
    item.timestamp = firebase.firestore.FieldValue.serverTimestamp();

    this.afs.collection('users/' + uid + '/games').doc(id).set({ ...item });
  }

  public deleteGameRecord(item: GameRecord, uid: string) {
    this.afs.collection<GameRecord>('users/' + uid + "/games").doc(item.id).delete();
  }
  public updateGameRecord(item: GameRecord, uid: string) {
    this.afs.collection<GameRecord>('users/' + uid + "/games").doc(item.id).set({ ...item });
  }




}

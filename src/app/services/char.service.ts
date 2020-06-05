import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Char } from '../model/Char';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharService {

constructor(private afs:AngularFirestore) {

 }

 public getChars(uid:string):Observable<Char[]>{
   return this.afs.collection<Char>('chars',ref=>ref.where('uid','==',uid)).valueChanges();
 }

 public addChar(uid:string,name:string):Promise<any>{
  const id = this.afs.createId();
  let char = new Char();
  char.id=id;
  char.uid=uid;
  char.name=name;

   this.afs.collection('chars').doc(id).set({...char});
   return this.afs.collection('users').doc(uid).collection('chars').doc(id).set({...char});
 }

 public deleteChar(uid:string,id):Promise<any>{
  this.afs.collection('users').doc(uid).collection('chars').doc(id).delete();
  return this.afs.collection('chars').doc(id).delete();


 }

}

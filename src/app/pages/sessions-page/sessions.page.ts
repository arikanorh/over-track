import { Component, OnInit } from '@angular/core';
import { SessionRecord } from 'src/app/model/SessionRecord';
 import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
 import { SessionService } from 'src/app/services/session.service';
 import { CharService } from 'src/app/services/char.service';
import { Char } from 'src/app/model/Char';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.css']
})
export class SessionsPage implements OnInit {

  constructor(private db: SessionService, private route: ActivatedRoute, private charService:CharService) { }

  sessions$: Observable<SessionRecord[]>;
  uid;
  session=new SessionRecord();
  chars$:Observable<Char[]>;

  ngOnInit() {
    this.uid = this.route.snapshot.params.userid;
    this.sessions$ = this.db.getSessionsByUserId$(this.uid);
    this.chars$ = this.charService.getChars(this.uid);

    this.session.role='TANK';
   }

  addSession() {
    console.log(this.session)
    this.db.addSessionRecord(this.session,this.uid);

  }

  trackByFn(index, item: SessionRecord) {
    return item.id;
  }
  updateCharName(name:string){
    this.session.char.name=name;
    console.log(this.session.char);
  }
  updateSession(session){
    this.db.updateSessionCharInfo(this.uid,session.id,session);
  }

}

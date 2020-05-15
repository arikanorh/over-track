import { Component, OnInit } from '@angular/core';
import { SessionRecord } from 'src/app/model/SessionRecord';
 import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.css']
})
export class SessionsPage implements OnInit {

  constructor(private db: SessionService, private router: ActivatedRoute, private auth: AuthService) { }

  sessions$: Observable<SessionRecord[]>;
  uid;

  ngOnInit() {
    this.uid = this.router.snapshot.params.userid;
    this.sessions$ = this.db.getSessionsByUserId$(this.uid);
   }

  addSession(sessionname: string) {
    this.db.addSessionRecord(sessionname,this.uid);

  }

  trackByFn(index, item: SessionRecord) {
    return item.id;
  }

}

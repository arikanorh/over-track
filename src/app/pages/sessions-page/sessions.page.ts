import { Component, OnInit } from '@angular/core';
  import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';
import { SessionRecord } from '../../model/SessionRecord';
 
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

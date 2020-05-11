import { Component, OnInit } from '@angular/core';
import { SessionRecord } from 'src/app/model/SessionRecord';
import { DbService } from 'src/app/db.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sessionlist',
  templateUrl: './sessionlist.component.html',
  styleUrls: ['./sessionlist.component.css']
})
export class SessionlistComponent implements OnInit {

   constructor(private db:DbService) { }

  sessions$ :Observable<SessionRecord[]>;

  ngOnInit() {
    this.sessions$ = this.db.getSessionRecords();
  }

  addSession(sessionname:string){
    this.db.addSessionRecord(sessionname);

  }
 
  trackByFn(index,item:SessionRecord){
     return item.id;
  }

}

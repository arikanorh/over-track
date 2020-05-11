import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameRecord } from '../../model/GameRecord';
import { Map } from '../../model/map';
import * as moment from "moment";
import { DbService } from '../../db.service';
import { Subscription, Observable } from 'rxjs';
import { MapService } from 'src/app/map.service';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.css']
})
export class SessionDetailComponents implements OnInit, OnDestroy {
  mapList: Map[];
  model: GameRecord;
  data: GameRecord[];
  subs: Subscription[] = [];
  sessionid;
  constructor(private dbService: DbService, private route: ActivatedRoute, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.mapList = MapService.getMaps();
    this.resetModel();
    // this.subs= this.dbService.getGameRecords().subscribe(e=>{
    //   this.data = e;
    // });

    this.sessionid = this.route.snapshot.params.id;
    let sub = this.auth.getUser().subscribe(e => {
      let sub = this.dbService.getGameRecordsBySessionId$(e.uid, this.sessionid).subscribe(e => {
        this.data = e;
      });
      this.subs.push(sub);
    })

    this.subs.push(sub);
  }

  add() {


    let lastData = this.data[0];
    if (lastData) {
      let diff = this.model.skillRating - lastData.skillRating;
      console.log(diff);
      if (diff > 0) {
        this.model.status = "WIN";
      } else if (diff === 0) {
        this.model.status = "TIE";
      } else
        this.model.status = "LOSE";
    }

    this.dbService.addGameRecord(this.model, this.sessionid);


     this.model.map = "1";
  


  }

  delete(item: GameRecord) {
    this.dbService.deleteGameRecord(item);
    //this.data= this.data.filter(e=>e!==item);
  }
  update(item: GameRecord) {
    this.dbService.updateGameRecord(item);
  }

  resetModel() {
    this.model = new GameRecord();
    this.model.map = "1";
   }

  deleteSession() {
    this.dbService.deleteSessionRecord(this.sessionid);
    this.router.navigate(['sessions'])
  }

  trackByFn(index, game: GameRecord) {
    return game.id;
  }
  ngOnDestroy() {
    this.subs.forEach(e => e.unsubscribe())
  }

}
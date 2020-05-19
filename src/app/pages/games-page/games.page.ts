import { Component, OnInit, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { GameRecord } from '../../model/GameRecord';
import { Map } from '../../model/map';
import { Subscription, Observable } from 'rxjs';
 import { ActivatedRoute, Router } from '@angular/router';
import { GamerecordComponent } from '../../components/gamerecord/gamerecord.component';
import { SessionRecord } from '../../model/SessionRecord';
import { GameService } from '../../services/game.service';
import { SessionService } from '../../services/session.service';
import { MapService } from '../../services/map.service';
 
@Component({
  selector: 'app-session-detail',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.css']
})
export class GamesPage implements OnInit, OnDestroy {
  @ViewChildren(GamerecordComponent) games: QueryList<GamerecordComponent>;
  mapList: Map[];
  model: GameRecord;
  data: GameRecord[];
  subs: Subscription[] = [];
  sessionid;
  uid;
  session: SessionRecord;

  constructor(
    private gameService: GameService,
    private sessionService: SessionService,
    private route: ActivatedRoute,
    private router: Router,
    private mapService:MapService) {
  }

  ngOnInit() {
    this.mapList = this.mapService.getMaps();
    this.resetModel();

    this.sessionid = this.route.snapshot.params.sessionid;
    this.uid = this.route.snapshot.params.userid;
    let sub = this.gameService.getGameRecordsBySessionId$(this.uid, this.sessionid).subscribe(e => {
      this.data = e;
    });

    let sub2 = this.sessionService.getSessionBySessionId$(this.uid, this.sessionid).subscribe(e => {
      this.session = e;
    });


    this.subs.push(sub);
    this.subs.push(sub2);
  }

  add() {
    let lastData = this.data[0];
    if (!lastData) {
      lastData = this.session.last_game;
    }
    if (lastData) {

      let diff = this.model.skillRating - lastData.skillRating;
      if (diff > 0) {
        this.model.status = "WIN";
      } else if (diff === 0) {
        this.model.status = "TIE";
      } else
        this.model.status = "LOSE";
    }

    this.gameService.addGameRecord(this.model, this.sessionid, this.uid);
    this.resetModel();
  }



  delete(item: GameRecord) {
    this.gameService.deleteGameRecord(item, this.uid);
    //this.data= this.data.filter(e=>e!==item);
  }
  update(item: GameRecord) {
    this.gameService.updateGameRecord(item, this.uid);
  }

  updateLastGame (item:GameRecord){
    this.sessionService.updateSessionsLastGameInfo(this.uid,this.sessionid,item);
  }

  resetModel() {
    this.model = new GameRecord();
    this.model.map = "1";
  }

  deleteSession() {
    this.sessionService.deleteSessionRecord(this.sessionid, this.uid);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  handleEditModeChanged(e) {
    this.games.filter(item => item !== e).forEach(item => item.closeEditMode());
  }

  trackByFn(index, game: GameRecord) {
    return game.id;
  }
  ngOnDestroy() {
    this.subs.forEach(e => e.unsubscribe())
  }

}
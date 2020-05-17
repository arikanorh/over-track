import { Component, OnInit } from '@angular/core';
import { Char } from 'src/app/model/Char';
import { CharService } from 'src/app/services/char.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chars-page',
  templateUrl: './chars-page.html',
  styleUrls: ['./chars-page.css']
})
export class CharsPage implements OnInit {

  chars$:Observable<Char[]>;
  uid;
  constructor(private charService:CharService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.uid = this.route.snapshot.params.userid;
    this.chars$ = this.charService.getChars(this.uid);

  }

  addChar(name:string){

      this.charService.addChar(this.uid,name);

  }

}

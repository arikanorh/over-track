import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CharService } from '../../services/char.service';
import { Char } from '../../model/Char';

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

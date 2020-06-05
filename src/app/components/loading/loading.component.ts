import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  show:boolean;

  constructor(private ls:LoaderService) { }

  ngOnInit() {

    this.ls.listen().subscribe(e=>{
      this.show=e;
    })
  }

 
}

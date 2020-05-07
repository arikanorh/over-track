import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { environment } from "./environments/environment";
import { RouterModule } from "@angular/router";
import { SessionComponent } from "./session/session.component";
import { GamerecordComponent } from "./session/gamerecord/gamerecord.component";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MapService } from './map.service';

@NgModule({
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule.forRoot([{ path: "", component: SessionComponent }])
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    SessionComponent,
    GamerecordComponent
  ],
  bootstrap: [AppComponent],
  providers: [MapService]
})
export class AppModule {}

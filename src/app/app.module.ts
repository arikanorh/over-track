import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { environment } from "./environments/environment";
import { RouterModule } from "@angular/router";
import { SessionDetailComponents } from "./session/session-details/session-details.component";
import { GamerecordComponent } from "./session/session-details/gamerecord/gamerecord.component";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MapService } from './map.service';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AuthService } from './auth.service';
import 'firebase/auth';
import { DbService } from './db.service';
import { SessionlistComponent } from './session/sessionlist/sessionlist.component';
import { SessionRecordComponent } from './session/sessionlist/session-record/session-record.component';

@NgModule({
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: "", redirectTo:"sessions",pathMatch:"full" },
      { path:"sessions",component:SessionlistComponent},
      { path:"sessions/:id",component:SessionDetailComponents}
    ],{useHash:false}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    SessionDetailComponents,
    GamerecordComponent,
    SessionlistComponent,
    SessionRecordComponent
  ],
  bootstrap: [AppComponent],
  providers: [MapService,AuthService,DbService]
})
export class AppModule {}

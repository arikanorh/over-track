import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MapService } from './services/map.service';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";

import { AuthService } from './services/auth.service';
import 'firebase/auth';
import { RoutingModule } from './routing.module';
import { MySessionsPage } from './pages/my-session.page';
import { UsersPage } from './pages/users-page/users-page';
import { UserDisplayerComponent } from './components/user-displayer/user-displayer.component';
import { UserService } from './services/user.service';
import { GamesPage } from './pages/games-page/games.page';
import { GamerecordComponent } from './components/gamerecord/gamerecord.component';
import { SessionsPage } from './pages/sessions-page/sessions.page';
import { SessionRecordComponent } from './components/session-record/session-record.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CharsPage } from './pages/chars-page/chars-page';
import { SharedModule } from './shared/shared.module';
import { CharDisplayerComponent } from './components/char-displayer/char-displayer.component';
import { CharService } from './services/char.service';
import { SessionStatDisplayerComponent } from './components/session-stat-displayer/session-stat-displayer.component';
import { AuthGuard } from "./auth.guard";
import { LoginPage } from "./pages/login-page/login.page";
import { LoadingComponent } from './components/loading/loading.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSnackBarModule,
      RoutingModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      AngularFirestoreModule,
      SharedModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
   ],
   declarations: [
      AppComponent,
      GamesPage,
      GamerecordComponent,
      SessionsPage,
      SessionRecordComponent,
      UsersPage,
      UserDisplayerComponent,
      MySessionsPage,
      LogoComponent,
      NavigationComponent,
      CharsPage,
      CharDisplayerComponent,
      SessionStatDisplayerComponent,
      LoginPage,
      LoadingComponent
   ],
   bootstrap: [
      AppComponent
   ],
   providers: [
      MapService,
      AuthService,
      UserService,
      CharService,
      AuthGuard
   ]
})
export class AppModule {

   constructor(afs: AngularFirestore, private swUpdate: SwUpdate, private snackBar: MatSnackBar) {

      if (location.hostname === "localhost") {
         afs.firestore.settings({
            host: "localhost:8080",
            ssl: false
         });
      }

      this.swUpdate.available.subscribe(event => {
         console.log(event);
         let snackBarRef = this.snackBar.open('Newer version of Overtrack is available', 'Refresh');
         snackBarRef.onAction().subscribe(() => {
            window.location.reload()
         })
      })
   }
}

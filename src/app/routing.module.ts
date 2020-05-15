import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 import { UsersPage } from './pages/users-page/users-page';
import { MySessionsPage } from './pages/my-session.page';
import { SessionsPage } from './pages/sessions-page/sessions.page';
import { GamesPage } from './pages/games-page/games.page';
  
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "users", pathMatch: "full" },
      { path: "mysessions", component: MySessionsPage },
      {
        path: "users", children: [
          { path: "", component: UsersPage },
          {
            path: ":userid/sessions", children: [
              { path: "", component: SessionsPage },
              { path: ":sessionid", component: GamesPage }
            ]
          },
        ]
      },
      {path:"**",redirectTo:"mysessions",pathMatch:"full"}

    ]),
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }

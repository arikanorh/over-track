import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UsersPage } from "./pages/users-page/users-page";
import { MySessionsPage } from "./pages/my-session.page";
import { SessionsPage } from "./pages/sessions-page/sessions.page";
import { GamesPage } from "./pages/games-page/games.page";
import { CharsPage } from "./pages/chars-page/chars-page";
import { AuthGuard } from "./auth.guard";
import { LoginPage } from "./pages/login-page/login.page";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "users", pathMatch: "full" },
      { path: "mysessions", component: MySessionsPage,canActivate: [AuthGuard] },
      { path: "users", canActivate: [AuthGuard],children: [
          { path: "", component: UsersPage },
          {
            path: ":userid",
            children: [
              { path: "sessions", component: SessionsPage },
              { path: "sessions/:sessionid", component: GamesPage },
              { path: "chars", component: CharsPage }
            ]
          }
        ]
      },
      { path: "login", component: LoginPage },
      { path: "**", redirectTo: "mysessions", pathMatch: "full" }
    ])
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule {}

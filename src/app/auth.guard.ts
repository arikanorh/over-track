import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "./services/auth.service";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private as: AuthService, private router: Router) {}

  canActivate() {
    return this.as.getUser$().pipe(
      map(e => {
        if (e) {
          console.log("User valid");
          return true;
        } else {
          console.log("User invalid");
          this.router.navigate(["login"]);
          return false;
        }
      })
    );
  }
}

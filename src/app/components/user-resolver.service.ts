import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User, UserService } from '../data';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

  // récupère les services nécessaires (injection de dépendances)
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  // résout la route demandée
  // https://codeburst.io/understanding-resolvers-in-angular-736e9db71267
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    // réalise un appel au service pour récupérer, sur base de
    // l'identifiant donné à travers la route /:id
    // un Observable<User>
    return this.userService.getById(route.params.id).pipe(
      // dans le cas d'une erreur (eg.: un Observable<never>)
      // catch l'erreur et renvoie vers l'URL donnée
      catchError(err => this.router.navigateByUrl('/'))
    );
  }
}

import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[];

  constructor() {
    // instancie le tableau d'utilisateurs
    // (même principe qu'expliqué dans 'src/app/components/user-form/user-form.component.ts')
    this.users = [
      {
        id: 0,
        firstname: 'John',
        lastname: 'Doe',
        address: {
          street: 'some street',
          city: null
        }
      },
      {
        id: 1,
        firstname: 'Jane',
        lastname: 'Doe',
        address: {
          street: null,
          city: 'some city'
        }
      },
      {
        id: 2,
        firstname: 'Sarah',
        lastname: 'Connor',
        address: {
          street: 'Terminator has to find it',
          city: 'somewhere in America'
        }
      },
      {
        id: 3,
        firstname: 'Dude with no lastname',
        lastname: null,
        address: {
          street: 'will invalidate',
          city: 'the form'
        }
      }
    ];
  }

  // récupère un Observable d'User
  // sur base de l'identifiant en paramètre
  getById(id: number): Observable<User> {
    // vérifie que l'identifiant n'est pas incorrect
    if (id && (id < 0 || id >= this.users.length)) {
      // renvoie un Observable<never> dans le cas où il y a une erreur
      return throwError(RangeError('Index out of bound'));
    }

    // renvoie un observable avec l'User trouvé
    return of(this.users[id]);
  }
}

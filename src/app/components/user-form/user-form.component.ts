import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../data';

const EMPTY_STRING: string = '';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  user: User;

  // récupère les services nécessaires (injection de dépendances)
  constructor(private builder: FormBuilder, private route: ActivatedRoute) {

    // instancie le FormGroup
    this.userForm = this.builder.group({
      firstname: [EMPTY_STRING, Validators.required],

      lastname: [EMPTY_STRING, Validators.required],

      address: this.builder.group({
        street: [EMPTY_STRING],

        city: [EMPTY_STRING]
      })
    });

    // instancie le modèle avec les valeurs par défaut
    // 'User' étant une interface, on crée un objet avec les mêmes propriétés que cette interface
    // et on utilise le keyword 'as' --> https://lmgtfy.com/?q=as+keyword+typescript
    this.user = {
      firstname: EMPTY_STRING,
      lastname: EMPTY_STRING,
      address: {
        street: EMPTY_STRING,
        city: EMPTY_STRING
      }
    } as User;
  }

  ngOnInit() {
    // récupère l'information stockée par l'UserResolver dans la route
    // https://www.techiediaries.com/angular-router-resolve/
    this.route.data.subscribe((data: {user: User}) => {
      if (data && data.user) {
        // sauvegarde la donnée dans une variable de classe
        this.user = data.user;

        // met à jour les champs du formulaire avec la donnée sauvegardée
        this.userForm.patchValue(this.user);
      }
    });
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }

    console.log('OK', this.user);
  }
}

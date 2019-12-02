import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../data';
import { EMPTY_STRING } from '../../constants';

@Component({
  selector: 'app-user-form-two',
  templateUrl: './user-form-two.component.html',
  styleUrls: ['./user-form-two.component.css']
})
// Définit un formulaire avec un objet-modèle initialisé comme variable de classe (NgModel utilisé)
export class UserFormTwoComponent implements OnInit {

  userForm: FormGroup;
  user: User;

  // récupère les services nécessaires (injection de dépendances)
  constructor(private builder: FormBuilder, private route: ActivatedRoute) {

    // instancie le FormGroup
    this.userForm = this.builder.group({
      username: [EMPTY_STRING, Validators.required],
      usersecondname: [EMPTY_STRING, Validators.required],
      the_address: this.builder.group({
        dastreet: [EMPTY_STRING],
        dacity: [EMPTY_STRING]
      })
    });

    // instancie le modèle avec les valeurs par défaut
    // 'User' étant une interface, on crée un objet avec les mêmes propriétés que cette interface
    this.user = {
      firstname: EMPTY_STRING,
      lastname: EMPTY_STRING,
      address: {
        street: EMPTY_STRING,
        city: EMPTY_STRING
      }
    };
  }

  ngOnInit() {
    // récupère l'information stockée par l'UserResolver dans la route
    // https://www.techiediaries.com/angular-router-resolve/
    this.route.data.subscribe((data: { user: User }) => {
      if (data && data.user) {
        // sauvegarde la donnée dans la variable de classe
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

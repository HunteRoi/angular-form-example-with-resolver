import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../data';
import { EMPTY_STRING } from '../../constants';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
// Définit un formulaire sans objet-modèle (pas de NgModel utilisé)
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

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
  }

  ngOnInit() {
    // récupère l'information stockée par l'UserResolver dans la route
    // https://www.techiediaries.com/angular-router-resolve/
    this.route.data.subscribe((data: { user: User }) => {
      if (data && data.user) {
        // met à jour les champs du formulaire avec la donnée sauvegardée
        this.userForm.patchValue(data.user);
      }
    });
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }

    console.log('OK', this.userForm.value);
  }
}

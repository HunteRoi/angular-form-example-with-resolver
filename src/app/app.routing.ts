import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserFormTwoComponent } from './components/user-form-two/user-form-two.component';
import { UserResolver } from './user-resolver.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/user'
  },

  {
    path: 'user-two/:id',
    component: UserFormTwoComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'user-two',
    component: UserFormTwoComponent,
  },
  {
    path: 'user/:id',
    component: UserFormComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: 'user',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

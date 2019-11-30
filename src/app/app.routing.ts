import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserResolver } from './components/user-form/user-resolver.service';

const routes: Routes = [
  {
    path:':id',
    component: UserFormComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: '',
    component: UserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

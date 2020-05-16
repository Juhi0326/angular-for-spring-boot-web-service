import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { PersonResolverServiceService } from './services/person-resolver-service.service';


const routes: Routes = [
  { path: 'createPerson', component: CreatePersonComponent },
  { path: 'admin', component: AdminComponent, resolve: {people: PersonResolverServiceService} },
  { path: 'editPerson', component: EditPersonComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


  exports: [RouterModule]
})
export class AppRoutingModule { }

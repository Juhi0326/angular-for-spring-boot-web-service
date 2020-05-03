import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonService } from './services/person.service';
import { AdminComponent } from './components/admin/admin.component';
import { CreatePersonComponent } from './components/create-person/create-person.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CreatePersonComponent,
    NavBarComponent,
    EditPersonComponent,
  ],
  imports: [

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [PersonService, HttpClientModule],
  bootstrap: [AppComponent]

})
export class AppModule { }

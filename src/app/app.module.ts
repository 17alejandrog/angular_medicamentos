import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { HomeComponent } from './pages/home/home.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { LaboratoriosComponent } from './pages/laboratorios/laboratorios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmpleadoComponent,
    HomeComponent,
    InventariosComponent,
    LaboratoriosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

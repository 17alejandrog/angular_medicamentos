/*IMPORT NECESARIO PARA TRABAJAR CON EL NG-MODEL*/
import { FormsModule } from '@angular/forms';

/*IMPORT NECESARIO PARA LAS PETICIONES HTTP*/
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { HomeComponent } from './pages/home/home.component';
import { VentaComponent } from './pages/venta/venta.component';
import { ReportescsvComponent } from './pages/reportescsv/reportescsv.component';
import { RedirectService } from './services/redirect.service';
import { ReportegraficoComponent } from './pages/reportegrafico/reportegrafico.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmpleadoComponent,
    HomeComponent,
    VentaComponent,
    ReportescsvComponent,
    ReportegraficoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RedirectService],
  bootstrap: [AppComponent]
})
export class AppModule { }

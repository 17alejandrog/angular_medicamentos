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
import { VentaComponent } from './pages/venta/venta.component';
import { ReportescsvComponent } from './pages/reportescsv/reportescsv.component';
import { RedirectService } from './services/redirect.service';
import { ReportegraficoComponent } from './pages/reportegrafico/reportegrafico.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmpleadoComponent,
    HomeComponent,
    InventariosComponent,
    LaboratoriosComponent,
    VentaComponent,
    ReportescsvComponent,
    ReportegraficoComponent,
    ProveedoresComponent
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

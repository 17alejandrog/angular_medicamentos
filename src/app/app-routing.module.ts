import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { VentaComponent } from './pages/venta/venta.component';
import { ReportescsvComponent } from './pages/reportescsv/reportescsv.component';
import { ReportegraficoComponent } from './pages/reportegrafico/reportegrafico.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'venta', component: VentaComponent},
  { path: 'reportescsv', component: ReportescsvComponent},
  { path: 'reportegrafico', component: ReportegraficoComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

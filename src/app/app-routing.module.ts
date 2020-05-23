import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { LaboratoriosComponent } from './pages/laboratorios/laboratorios.component';
import { VentaComponent } from './pages/venta/venta.component';
import { ReportescsvComponent } from './pages/reportescsv/reportescsv.component';
import { ReportegraficoComponent } from './pages/reportegrafico/reportegrafico.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { EstanteriaComponent } from './pages/estanteria/estanteria.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'inventarios', component: InventariosComponent },
  { path: 'laboratorios', component: LaboratoriosComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'venta', component: VentaComponent},
  { path: 'reportescsv', component: ReportescsvComponent},
  { path: 'reportegrafico', component: ReportegraficoComponent},
  { path: 'estanteria', component: EstanteriaComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

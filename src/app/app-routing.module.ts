import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { InventariosComponent } from './pages/inventarios/inventarios.component';
import { LaboratoriosComponent } from './pages/laboratorios/laboratorios.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'empleado', component: EmpleadoComponent },
  { path: 'inventarios', component: InventariosComponent },
  { path: 'laboratorios', component: LaboratoriosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

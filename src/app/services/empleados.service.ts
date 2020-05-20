import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ModelEmpleado } from '../models/empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {


  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public helperService: HelperService) { }
  
  listarEmpleados() {
    return this.http.get<ModelEmpleado>(
      this.baseUrl + "controller/ctlEmpleado.php?type=list"
    );
  }

  guardarEmpleado(postData: any) {
    return this.http.post<any>(this.baseUrl + "controller/ctlEmpleado.php", postData);
  }

  buscarEmpleado(postData: any) {
    const url = this.baseUrl + "controller/ctlEmpleado.php";
    return this.http.post<any>(url, postData);
  }

  eliminarEmpleado(postData: any) {
    const url = this.baseUrl + "controller/ctlEmpleado.php";
    return this.http.post<any>(url, postData);
  }

}

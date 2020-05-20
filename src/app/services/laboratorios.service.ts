import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ModelLaboratorio } from '../models/laboratorio';

@Injectable({
  providedIn: 'root'
})
export class LaboratorioService {


  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public helperService: HelperService) { }
  
  listarLaboratorios() {
    return this.http.get<ModelLaboratorio>(
      this.baseUrl + "controller/ctlLaboratorio.php?type=list"
    );
  }

  guardarLaboratorio(postData: any) {
    return this.http.post<any>(this.baseUrl + "controller/ctlLaboratorio.php", postData);
  }

  buscarLaboratorio(postData: any) {
    const url = this.baseUrl + "controller/ctlLaboratorio.php";
    return this.http.post<any>(url, postData);
  }

  eliminarLaboratorio(postData: any) {
    const url = this.baseUrl + "controller/ctlLaboratorio.php";
    return this.http.post<any>(url, postData);
  }
}

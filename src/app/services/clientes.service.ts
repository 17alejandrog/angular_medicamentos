import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ModelCliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, public helperService: HelperService) { }

  buscarCliente(postData: any) {
    const url = this.baseUrl + "controller/ctlCliente.php";
    return this.http.post<any>(url, postData);
  }

  guardarCliente(postData: any) {
    return this.http.post<any>(this.baseUrl + "controller/ctlCliente.php", postData);
  }

  listarClientes() {
    return this.http.get<ModelCliente>(
      this.baseUrl + "controller/ctlCliente.php?type=list"
    );
  }

  eliminarCliente(postData: any) {
    const url = this.baseUrl + "controller/ctlCliente.php";
    return this.http.post<any>(url, postData);
  }
}

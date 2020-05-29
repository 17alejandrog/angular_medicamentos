import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ModelCliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public helperService: HelperService) { }

  listarClientes(){
    return this.http.get<ModelCliente>(
      this.baseUrl + "controller/ctlCliente.php?type=list"
    );
  }

  listarVentas(){
    return this.http.get<ModelCliente>(
      this.baseUrl + "controller/ctlVenta.php?type=list"
    );
  }

  guardaVenta(postData: any){
    return this.http.post<any>(this.baseUrl + "controller/ctlVenta.php", postData);
  }
}

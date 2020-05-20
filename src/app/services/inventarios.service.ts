import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ModelInventario } from '../models/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {


  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public helperService: HelperService) { }
  
  listarInventarios() {
    return this.http.get<ModelInventario>(
      this.baseUrl + "controller/ctlInventario.php?type=list"
    );
  }

  guardarInventario(postData: any) {
    return this.http.post<any>(this.baseUrl + "controller/ctlInventario.php", postData);
  }

  buscarInventario(postData: any) {
    const url = this.baseUrl + "controller/ctlInventario.php";
    return this.http.post<any>(url, postData);
  }

  eliminarInventario(postData: any) {
    const url = this.baseUrl + "controller/ctlInventario.php";
    return this.http.post<any>(url, postData);
  }
}

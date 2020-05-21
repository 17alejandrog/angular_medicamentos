import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ModelProveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {


  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public helperService: HelperService) { }
  
  listarProveedores() {
    return this.http.get<ModelProveedor>(
      this.baseUrl + "controller/ctlProveedor.php?type=list"
    );
  }

  guardarProveedor(postData: any) {
    return this.http.post<any>(this.baseUrl + "controller/ctlProveedor.php", postData);
  }

  buscarProveedor(postData: any) {
    const url = this.baseUrl + "controller/ctlProveedor.php";
    return this.http.post<any>(url, postData);
  }

  eliminarProveedor(postData: any) {
    const url = this.baseUrl + "controller/ctlProveedor.php";
    return this.http.post<any>(url, postData);
  }

}

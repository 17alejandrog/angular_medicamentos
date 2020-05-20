import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HelperService } from '../util/HelperService';
import { HttpClient } from '@angular/common/http';
import { ModelInventario } from '../models/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public helperService: HelperService) { }

listarProductos(){
  return this.http.get<ModelInventario>(
    this.baseUrl + "controller/ctlInventario.php?type=list"
  );
}

}

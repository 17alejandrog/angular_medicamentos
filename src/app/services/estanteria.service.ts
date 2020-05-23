import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ModelEstanteria } from '../models/estanteria';

@Injectable({
  providedIn: 'root'
})
export class EstanteriaService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public helperService: HelperService) { }

  listarEstanterias() {
    return this.http.get<ModelEstanteria>(
      this.baseUrl + "controller/ctlEstanteria.php?type=list"
    );
  }

  guardarEstanteria(postData: any) {
    return this.http.post<any>(this.baseUrl + "controller/ctlEstanteria.php", postData);
  }

  buscarEstanteria(postData: any) {
    const url = this.baseUrl + "controller/ctlEstanteria.php";
    return this.http.post<any>(url, postData);
  }
  
}

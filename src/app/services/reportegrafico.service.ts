import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';

@Injectable({
  providedIn: 'root'
})
export class ReportegraficoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public helperService: HelperService) { }

  consultac3(postData:any){
    return this.http.post<any>(this.baseUrl + "controller/ctlReporte.php", postData);
  }
}


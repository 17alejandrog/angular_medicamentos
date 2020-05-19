import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';

@Injectable({
  providedIn: 'root'
})
export class ReportescsvService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public helperService: HelperService) { }

  generarcsv(postData:any){
    return this.http.post<any>(this.baseUrl + "reporte/gestionCSV_rpt.php", postData);
  }

}

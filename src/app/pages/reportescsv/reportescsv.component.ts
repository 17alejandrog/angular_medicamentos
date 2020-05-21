import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ReportescsvService } from '../../services/reportescsv.service';
import { HelperService } from 'src/app/util/HelperService';
import { ModelReporteCsv } from '../../models/reportes';
import { RedirectService } from 'src/app/services/redirect.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-reportescsv',
  templateUrl: './reportescsv.component.html',
  styleUrls: ['./reportescsv.component.css']
})
export class ReportescsvComponent implements OnInit {

  reporteData = {} as ModelReporteCsv;
  baseUrl = environment.baseUrl;

  constructor(public helperService: HelperService,
    public reportescsvService: ReportescsvService,
    private opentab: RedirectService) { }

  ngOnInit(): void {
    
  }

  generarcsv(){
    let param = {cod_rpt : this.reporteData.cod_reporte};
    // let param = {cod_rpt : this.reporteData.cod_reporte};
    this.opentab.post(param, this.baseUrl + "reporte/gestionCSV_rpt.php");
  }


}

import { Component, OnInit } from '@angular/core';
import { ModelReporteCsv } from 'src/app/models/reportes';
import { HelperService } from 'src/app/util/HelperService';
import { ReportegraficoService } from '../../services/reportegrafico.service';
import * as c3 from 'c3';

@Component({
  selector: 'app-reportegrafico',
  templateUrl: './reportegrafico.component.html',
  styleUrls: ['./reportegrafico.component.css']
})
export class ReportegraficoComponent implements OnInit {

  reporteData = {} as ModelReporteCsv;
  titulochart: string = "";

  constructor(public helperService: HelperService,
    public reportegraficoService: ReportegraficoService) { }

  ngOnInit(): void {

  }

  generac3() {
    let postData = new FormData();
    postData.append("cod_grafica", this.reporteData.cod_reporte);
    this.reportegraficoService.consultac3(postData).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        let cols = [];

        if (respuesta.msj === "Success") {
          let response = JSON.parse(respuesta.data);
          switch (this.reporteData.cod_reporte) {
            case "1":

              this.titulochart = 'REPORTE SEGUN LA DISTRIBUCION DE GÉNERO';

              for (let i = 0; i < response.length; i++) {
                cols.push([response[i].genero + ": " + response[i].cantidad, response[i].cantidad]);
              }

              let chart = c3.generate({
                bindto: '#div_chart',
                data: {
                  columns: cols,
                  type: 'donut',
                },
                donut: {
                  title: "Distribucion de género"
                }
              });
              break;
            case "2":
              this.titulochart = 'REPORTE SEGUN LA DISTRIBUCION DE MEDICAMENTO';

              for (let i = 0; i < response.length; i++) {
                if (response[i].cantidad > 0)
                  cols.push([response[i].medicamento + ": " + response[i].cantidad, response[i].cantidad]);
              }

              let chart2 = c3.generate({
                bindto: '#div_chart',
                data: {
                  columns: cols,
                  type: 'donut',
                },
                donut: {}
              });
              break;
            case "3":
              this.titulochart = 'CANTIDADES VENDIDAS DE CADA PRODUCTO';

              for (let i = 0; i < response.length; i++) {
                cols.push([response[i].nombre + ": $" + response[i].ingresos, response[i].cantidad]);
              }

              let chart3 = c3.generate({
                bindto: '#div_chart',
                data: {
                  columns: cols,
                  type: 'bar'
                },
                bar: {
                  width: {
                    ratio: 0.3
                  }
                }
              });
              break;
            case "4":
              this.titulochart = 'REPORTE VENTAS E INGRESOS POR EMPLEADO';

              for (let i = 0; i < response.length; i++) {
                cols.push([response[i].empleado + ": $" + response[i].generado, response[i].ventas]);
              }

              console.log(cols);

              let chart5 = c3.generate({
                bindto: '#div_chart',
                data: {
                  columns: cols,
                  type: 'bar'
                },
                bar: {
                  width: {
                    ratio: 0.3
                  }
                }
              });

              break;
            case "5":
              this.titulochart = 'VENTAS GENERADAS POR DÍA DEL MES';

              for (let i = 0; i < response.length; i++) {
                cols.push([response[i].fecha + ": " + response[i].ingresos, response[i].ventas]);
              }

              let chart4 = c3.generate({
                bindto: '#div_chart',
                data: {
                  columns: cols,
                  type: 'bar'
                },
                bar: {
                  width: {
                    ratio: 0.3
                  }
                }
              });
              break;
            case "6":
              this.titulochart = 'VENTAS POR DIA DE LA SEMANA';

              for (let i = 0; i < response.length; i++) {
                cols.push([response[i].dia + ": $" + response[i].ingresos, response[i].ventas]);
              }

              let chart6 = c3.generate({
                bindto: '#div_chart',
                data: {
                  columns: cols,
                  type: 'bar'
                },
                bar: {
                  width: {
                    ratio: 0.3
                  }
                }
              });
              break;
          }
        } else {
          this.helperService.openModal(true, "Info", "No se encontro");
        }
      },
      (error) => {
        this.helperService.openModal(
          true,
          "Info",
          "Error consumiendo el servicio"
        );
      }
    );
  }



}

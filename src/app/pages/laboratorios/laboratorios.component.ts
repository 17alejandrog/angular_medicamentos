import { Component, OnInit } from '@angular/core';
import { ModelLaboratorio } from 'src/app/models/laboratorio';
import { HelperService } from 'src/app/util/HelperService';
import { LaboratorioService } from '../../services/laboratorios.service';

@Component({
  selector: 'app-laboratorios',
  templateUrl: './laboratorios.component.html',
  styleUrls: ['./laboratorios.component.css']
})
export class LaboratoriosComponent implements OnInit {

  laboratorios: ModelLaboratorio[] = [];
  laboratorioData = {} as ModelLaboratorio;

  constructor(
    public helperService: HelperService,
    public laboratorioService: LaboratorioService,
  ) { }

  ngOnInit(): void {
    this.listarLaboratorios();
  }

  listarLaboratorios() {
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.laboratorioService.listarLaboratorios().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.laboratorios = JSON.parse(respuesta.data);
        } else {
          this.laboratorios = [];
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

  guardarLaboratorio() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idLaboratorio", this.laboratorioData.idLaboratorio);
    postDataObj.append("nombreLab", this.laboratorioData.nombreLab);
    postDataObj.append("descripcionLab", this.laboratorioData.descripcionLab);

    if (this.helperService.isValidValue(this.laboratorioData.idLaboratorio)) {
      postDataObj.append("type", "update");
    } else {
      postDataObj.append("type", "save");
    }

    this.laboratorioService.guardarLaboratorio(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Guardado exitosamente");
          this.listarLaboratorios();
          this.limpiarLaboratorio();
        } else {
          this.helperService.openModal(
            true,
            "Info",
            "No se detecto ningun cambio en la base de datos"
          );
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
  
  buscarLaboratorio() {
    let postDataObj = new FormData();
    postDataObj.append("nombreLab", this.laboratorioData.nombreLab);
    postDataObj.append("type", "search");
    this.laboratorioService.buscarLaboratorio(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.msj === "Success") {
          this.helperService.openModal(true, "Info", "Encontrado exitosamente");
          this.laboratorioData = JSON.parse(respuesta.data)[0];
        } else {
          this.helperService.openModal(true, "Info", "No se encontro");
        }
      },
      (error) => {
        this.helperService.openModal(
          true,
          "Info",
          "Error consumiendo el servicio"+error,
        );
      }
    );
  }

  eliminarLaboratorio() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idLaboratorio", this.laboratorioData.idLaboratorio);
    postDataObj.append("type", "delete");
    console.log('Eliminar');
    console.log(this.laboratorioData.idLaboratorio);
    
    this.laboratorioService.eliminarLaboratorio(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log(respuesta);
        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Eliminado exitosamente");
          this.listarLaboratorios();
          this.limpiarLaboratorio();
        } else {
          this.helperService.openModal(
            true,
            "Info",
            "No se encontro el registro a eliminar"
          );
        }
      },
      (error) => {
        this.helperService.openModal(
          true,
          "Info",
          "Error consumiendo el servicio" + error
        );
      }
    );
  }

  limpiarLaboratorio() {
    this.laboratorioData = {} as ModelLaboratorio;
  }

}

import { Component, OnInit } from '@angular/core';
import { ModelEstanteria } from '../../models/estanteria';
import { HelperService } from '../../util/HelperService';
import { EstanteriaService } from '../../services/estanteria.service';

@Component({
  selector: 'app-estanteria',
  templateUrl: './estanteria.component.html',
  styleUrls: ['./estanteria.component.css']
})
export class EstanteriaComponent implements OnInit {

  estanterias: ModelEstanteria[] = [];
  estanteriaData = {} as ModelEstanteria;

  constructor(public helperService : HelperService,
    public estanteriaService : EstanteriaService) { }

  ngOnInit(): void {
  this.listarEstanteria();
  }

  listarEstanteria(){
    this.estanteriaService.listarEstanterias().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.estanterias = JSON.parse(respuesta.data);
        } else {
          this.estanterias = [];
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

  guardarEstanteria(){
    let postDataObj = new FormData();
    postDataObj.append("idEstanteria", this.estanteriaData.idEstanteria);
    postDataObj.append("nombre", this.estanteriaData.nombre);
    postDataObj.append("descripcion", this.estanteriaData.descripcion);

    if (this.helperService.isValidValue(this.estanteriaData.idEstanteria)) {
      postDataObj.append("type", "update");
    } else {
      postDataObj.append("type", "save");
    }

    this.estanteriaService.guardarEstanteria(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Guardado exitosamente");
          this.listarEstanteria();
          this.limpiarEstanteria();
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

  limpiarEstanteria() {
    this.estanteriaData = {} as ModelEstanteria;
  }

  buscarEstanteria(){
    let postDataObj = new FormData();
    postDataObj.append("nombre", this.estanteriaData.nombre);
    postDataObj.append("type", "search");
    this.estanteriaService.buscarEstanteria(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.msj === "Success") {
          this.helperService.openModal(true, "Info", "Encontrado exitosamente");
          this.estanteriaData = JSON.parse(respuesta.data)[0];
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

  eliminarEstanteria(){

  }



}

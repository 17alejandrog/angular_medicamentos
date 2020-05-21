import { Component, OnInit } from '@angular/core';
import { ModelProveedor } from 'src/app/models/proveedor';
import { HelperService } from 'src/app/util/HelperService';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores: ModelProveedor[] = [];
  proveedorData = {} as ModelProveedor;

  constructor(
    public helperService: HelperService,
    public proveedorService: ProveedorService
  ) { }

  ngOnInit(): void {
    this.listarProveedores();
  }

  listarProveedores() {
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.proveedorService.listarProveedores().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.proveedores = JSON.parse(respuesta.data);
        } else {
          this.proveedores = [];
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

  guardarProveedor() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idProveedor", this.proveedorData.idProveedor);
    postDataObj.append("nombrePro", this.proveedorData.nombrePro);
    postDataObj.append("razonsocial", this.proveedorData.razonsocial);
    postDataObj.append("telefonoPro", this.proveedorData.telefonoPro);
    postDataObj.append("correoPro", this.proveedorData.correoPro);

    if (this.helperService.isValidValue(this.proveedorData.idProveedor)) {
      postDataObj.append("type", "update");
    } else {
      postDataObj.append("type", "save");
    }
    console.log("Guardar O Modificar");
    for (const key in this.proveedorData) {
      console.log('Valor'+key);
      
    }

    this.proveedorService.guardarProveedor(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log("Guardar O Modificar");
        console.log(respuesta);
        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Guardado exitosamente");
          this.listarProveedores();
          this.limpiarProveedor();
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
  
  buscarProveedor() {
    let postDataObj = new FormData();
    postDataObj.append("razonsocial", this.proveedorData.razonsocial);
    postDataObj.append("type", "search");
    
    this.proveedorService.buscarProveedor(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        if (respuesta.msj === "Success") {
          this.helperService.openModal(true, "Info", "Encontrado exitosamente");
          this.proveedorData = JSON.parse(respuesta.data)[0];
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

  eliminarProveedor() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idProveedor", this.proveedorData.idProveedor);
    postDataObj.append("type", "delete");
  
    this.proveedorService.eliminarProveedor(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log(respuesta);
        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Eliminado exitosamente");
          this.listarProveedores();
          this.limpiarProveedor();
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
          "Error consumiendo el servicio"
        );
      }
    );
  }

  limpiarProveedor() {
    this.proveedorData = {} as ModelProveedor;
  }
}
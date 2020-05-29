import { Component, OnInit } from '@angular/core';
import { ModelCliente } from 'src/app/models/cliente';
import { HelperService } from 'src/app/util/HelperService';
import { ClientesService } from '../../services/clientes.service';
import { RedirectService } from '../../services/redirect.service';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: ModelCliente[] = [];
  clienteData = {} as ModelCliente;
  baseUrl = environment.baseUrl;

  constructor(
    public helperService: HelperService,
    public clienteService: ClientesService,
    private opentab: RedirectService
    ) { }


  ngOnInit(): void {
    this.listarClientes();
  }
      
      listarClientes() {
        /*Se llama al metodo de listar roles definido en el servicio*/
        this.clienteService.listarClientes().subscribe(
          (data) => {
            let respuesta: any;
            respuesta = data;
        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          console.log(JSON.parse(respuesta.data));
          this.clientes = JSON.parse(respuesta.data);
        } else {
          this.clientes = [];
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

  guardarCliente() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idCliente", this.clienteData.idCliente);
    postDataObj.append("nombres", this.clienteData.nombres);
    postDataObj.append("apellidos", this.clienteData.apellidos);
    postDataObj.append("cedula", this.clienteData.cedula);
    postDataObj.append("genero", this.clienteData.genero);
    postDataObj.append("edad", this.clienteData.edad);

    if (this.helperService.isValidValue(this.clienteData.idCliente)) {
      postDataObj.append("type", "update");
    } else {
      postDataObj.append("type", "save");
    }

    this.clienteService.guardarCliente(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Guardado exitosamente");
          this.listarClientes();
          this.limpiarCliente();
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
  
  buscarCliente() {
    let postDataObj = new FormData();
    postDataObj.append("cedula", this.clienteData.cedula);
    postDataObj.append("type", "search");
    
    this.clienteService.buscarCliente(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log(respuesta);
        if (respuesta.msj === "Success") {
          this.helperService.openModal(true, "Info", "Encontrado exitosamente");
          this.clienteData = JSON.parse(respuesta.data)[0];
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

  eliminarCliente() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idCliente", this.clienteData.idCliente);
    postDataObj.append("type", "delete");
  
    this.clienteService.eliminarCliente(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log(respuesta);
        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Eliminado exitosamente");
          this.listarClientes();
          this.limpiarCliente();
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

  limpiarCliente() {
    this.clienteData = {} as ModelCliente;
  }

  generarPDFClientes(nombre_rpt,nombre){
    let param = {
      nombre_rpt : nombre_rpt,
      nombre: nombre
    };
    console.log(nombre_rpt);
    console.log(nombre);
    this.opentab.post(param, this.baseUrl + "reporte/gestionPDF.php");
  }


}

import { Component, OnInit } from '@angular/core';
import { ModelInventario } from 'src/app/models/inventario';
import { HelperService } from 'src/app/util/HelperService';
import { InventarioService } from '../../services/inventarios.service';
import { EmpleadosService } from '../../services/empleados.service';
import { ModelEmpleado } from 'src/app/models/empleados';
import { LaboratorioService } from '../../services/laboratorios.service';
import { ModelLaboratorio } from 'src/app/models/laboratorio';
import { EstanteriaService } from '../../services/estanteria.service';
import { ModelEstanteria } from '../../models/estanteria';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.css']
})
export class InventariosComponent implements OnInit {

  inventarios: ModelInventario[] = [];
  inventarioData = {} as ModelInventario;
  empleados: ModelEmpleado[] = [];
  laboratorios: ModelLaboratorio[] = [];
  estanterias : ModelEstanteria[] = [];
  estanteriasData = {} as ModelEstanteria;

  constructor(
    public helperService: HelperService,
    public inventarioService: InventarioService,
    public empleadoService: EmpleadosService,
    public laboratorioService: LaboratorioService,
    public estanteriaService : EstanteriaService
  ) { }

  ngOnInit(): void {
    this.listarInventarios();
    this.listarEmpleadosSelect();
    this.listarLaboratoriosSelect();
    this.listarEstanteriasSelect();
  }

  onNameChange($event) {
    let idInv = this.inventarioData.idInventario;
  }

  listarEstanteriasSelect(){
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
  
  listarEmpleadosSelect() {
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.empleadoService.listarEmpleados().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.empleados = JSON.parse(respuesta.data);
        } else {
          this.empleados = [];
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

  listarLaboratoriosSelect() {
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

  listarInventarios() {
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.inventarioService.listarInventarios().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log(respuesta);
        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.inventarios = JSON.parse(respuesta.data);
        } else {
          this.inventarios = [];
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

  guardarInventario() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    console.log(this.inventarioData.Empleado_idEmpleado);
    
    postDataObj.append("idInventario", this.inventarioData.idInventario);
    postDataObj.append("nombreInv", this.inventarioData.nombreInv);
    postDataObj.append("descripcionInv", this.inventarioData.descripcionInv);
    postDataObj.append("fechaVen", this.inventarioData.fechaVen);
    postDataObj.append("cantidad", this.inventarioData.cantidad);
    postDataObj.append("fechaFab", this.inventarioData.fechaFab);
    postDataObj.append("precio", this.inventarioData.precio);
    postDataObj.append("Empleado_idEmpleado", this.inventarioData.Empleado_idEmpleado);
    postDataObj.append("Laboratorio_idLaboratorio", this.inventarioData.Laboratorio_idLaboratorio);
    postDataObj.append("estanteria", this.inventarioData.idEstanteria);

    if (this.helperService.isValidValue(this.inventarioData.idInventario)) {
      postDataObj.append("type", "update");
    } else {
      postDataObj.append("type", "save");
    }

    this.inventarioService.guardarInventario(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log(respuesta);
        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Guardado exitosamente");
          this.listarInventarios();
          this.limpiarInventario();
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
  
  buscarInventario() {
    let postDataObj = new FormData();
    postDataObj.append("nombreInv", this.inventarioData.nombreInv);
    postDataObj.append("type", "search");
    this.inventarioService.buscarInventario(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        if (respuesta.msj === "Success") {
          this.helperService.openModal(true, "Info", "Encontrado exitosamente");
          this.inventarioData = JSON.parse(respuesta.data)[0];
          console.log("Respuesta busqueda: "+this.inventarioData);
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

  eliminarInventario() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idInventario", this.inventarioData.idInventario);
    postDataObj.append("type", "delete");
  
    this.inventarioService.eliminarInventario(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log(respuesta);
        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Eliminado exitosamente");
          this.listarInventarios();
          this.limpiarInventario();
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

  limpiarInventario() {
    this.inventarioData = {} as ModelInventario;
  }

}
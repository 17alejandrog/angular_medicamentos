import { Component, OnInit } from '@angular/core';
import { ModelEmpleado } from 'src/app/models/empleados';
import { ModelTipousuario } from 'src/app/models/tipousuario';
import { HelperService } from 'src/app/util/HelperService';
import { EmpleadosService } from '../../services/empleados.service';
import { TipousuarioService } from '../../services/tipousuario.service';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  empleados: ModelEmpleado[] = [];
  empleadoData = {} as ModelEmpleado;
  tipousuarios: ModelTipousuario[] = [];
  tipousuarioData = {} as ModelTipousuario;
  
  constructor(
    public helperService: HelperService,
    public empleadoService: EmpleadosService,
    public tipousuarioService: TipousuarioService
  ) { }

  ngOnInit(): void {
    this.listarEmpleados();
    this.listarTiposUsuario();
  }

  listarTiposUsuario() {
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.tipousuarioService.listarTiposUsuarios().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log('Tipos'+respuesta);
        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.tipousuarios = JSON.parse(respuesta.data);
        } else {
          this.tipousuarios = [];
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
      
      listarEmpleados() {
        /*Se llama al metodo de listar roles definido en el servicio*/
        this.empleadoService.listarEmpleados().subscribe(
          (data) => {
            let respuesta: any;
            respuesta = data;
            console.log('Tipos'+respuesta);
        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          console.log(JSON.parse(respuesta.data));
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

  guardarEmpleado() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idEmpleado", this.empleadoData.idEmpleado);
    postDataObj.append("cedula", this.empleadoData.cedula);
    postDataObj.append("nombres", this.empleadoData.nombres);
    postDataObj.append("apellidos", this.empleadoData.apellidos);
    postDataObj.append("correo", this.empleadoData.correo);
    postDataObj.append("usuario", this.empleadoData.usuario);
    postDataObj.append("password", this.empleadoData.password);
    postDataObj.append("idTipoUsuario", this.empleadoData.idTipoUsuario);

    if (this.helperService.isValidValue(this.empleadoData.idEmpleado)) {
      postDataObj.append("type", "update");
    } else {
      postDataObj.append("type", "save");
    }

    this.empleadoService.guardarEmpleado(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Guardado exitosamente");
          this.listarEmpleados();
          this.limpiarEmpleado();
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
  
  buscarEmpleado() {
    let postDataObj = new FormData();
    postDataObj.append("cedula", this.empleadoData.cedula.toString());
    postDataObj.append("type", "search");
    console.log("cedula", this.empleadoData.cedula.toString());
    
    this.empleadoService.buscarEmpleado(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        if (respuesta.msj === "Success") {
          this.helperService.openModal(true, "Info", "Encontrado exitosamente");
          this.empleadoData = JSON.parse(respuesta.data)[0];
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

  eliminarEmpleado() {
    /*Funcion que se encarga de almacenar la informacion del rol*/
    let postDataObj = new FormData();
    postDataObj.append("idEmpleado", this.empleadoData.idEmpleado);
    postDataObj.append("type", "delete");
  
    this.empleadoService.eliminarEmpleado(postDataObj).subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;
        console.log(respuesta);
        if (respuesta.res === "Success") {
          this.helperService.openModal(true, "Info", "Eliminado exitosamente");
          this.listarEmpleados();
          this.limpiarEmpleado();
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

  limpiarEmpleado() {
    this.empleadoData = {} as ModelEmpleado;
  }
}

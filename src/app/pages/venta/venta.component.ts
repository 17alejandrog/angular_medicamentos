import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/util/HelperService';
import { InventarioService } from '../../services/inventario.service';
import { ModelInventario } from '../../models/inventario';
import * as $ from 'jquery';
import { ModelCliente } from '../../models/cliente';
import { VentaService } from '../../services/venta.service';
import { ModelProductosVenta } from '../../models/productosventa';
import swal from 'sweetalert2';
import { ModelVenta } from '../../models/venta';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  totalventa: number = 0;
  idCliente: number = 0;
  productos: ModelInventario[] = [];
  clientes: ModelCliente[] = [];
  productosventa: ModelProductosVenta[] = [];
  ventas: ModelVenta[] = [];

  ids: number[] = [];
  cants: number[] = [];

  constructor(public helperService: HelperService,
    public InventarioService: InventarioService,
    public ventaService: VentaService) { }

  ngOnInit(): void {
    this.listarProductos();
    this.listarClientes();
    this.listarVentas();
  }

  listarVentas(){
    this.ventaService.listarVentas().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.ventas = JSON.parse(respuesta.data);
        } else {
          this.ventas = [];
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

  listarClientes() {
    this.ventaService.listarClientes().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
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

  listarProductos() {
    /*Se llama al metodo de listar roles definido en el servicio*/
    this.InventarioService.listarProductos().subscribe(
      (data) => {
        let respuesta: any;
        respuesta = data;

        if (respuesta.msj === "Success") {
          /*Se convierte en un objeto JSON el listado de datos obtenido*/
          this.productos = JSON.parse(respuesta.data);
        } else {
          this.productos = [];
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

  agrega(id: any, nombre: any, cantidad: any, precio: any) {
    /* alert(id + " el nombre "+ nombre + " cant "+ cantidad + " vale "+precio); */
    if (this.productosventa.find(pro => pro.idInventario == id)) {
      swal.fire('Cuidado!', 'El medicamento ya esta en la venta', 'warning');
    } else {
      this.productosventa.push({
        idInventario: id,
        nombreInv: nombre,
        cantidad: 1,
        cantidadMax: cantidad,
        precio: precio
      });
      this.actu_total();
    }
  }

  elimina(i: any) {
    this.productosventa.splice(i, 1);
    this.actu_total();
  }

  actu_total() {
    let subtotal = 0;
    for (let produ of this.productosventa) {
      subtotal += (produ.cantidad * produ.precio);
    }
    this.totalventa = subtotal;
  }

  vender() {
    this.ids = [];
    this.cants = [];
    if (this.idCliente < 1) {
      swal.fire('Cuidado!', 'Debe elegir un cliente', 'error');
    } else if (this.totalventa == 0) {
      swal.fire('Cuidado!', 'Debe seleccionar productos', 'error');
    } else {

      for (let produ of this.productosventa) {
        this.ids.push(produ.idInventario);
        this.cants.push(produ.cantidad);
      }

      let postDataObj = new FormData();
      postDataObj.append("total", this.totalventa.toString());
      postDataObj.append("cliente", this.idCliente.toString());
      postDataObj.append("arrInv", this.ids.toString());
      postDataObj.append("arrCant", this.cants.toString());
      postDataObj.append("type", "save");

      this.ventaService.guardaVenta(postDataObj).subscribe(
        (data) => {
          let respuesta: any;
          respuesta = data;
          if (respuesta.res === "Success") {
            this.helperService.openModal(true, "Info", "Guardado exitosamente");
            this.limpiarVenta();
            this.listarProductos();
            this.actu_total();
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
  }

  limpiarVenta(){
    this.productosventa = [];
  }




}

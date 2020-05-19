import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/util/HelperService';
import { InventarioService } from '../../services/inventario.service';
import { ModelInventario } from '../../models/inventario';
import * as $ from 'jquery';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  productos: ModelInventario[] = [];

  constructor(public helperService: HelperService,
    public InventarioService: InventarioService) { }

  ngOnInit(): void {
    this.listarProductos();


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

}

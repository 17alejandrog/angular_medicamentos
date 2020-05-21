import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { ModelTipousuario } from '../models/tipousuario';

@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {


  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, public helperService: HelperService) { }
  
  listarTiposUsuarios() {
    return this.http.get<ModelTipousuario>(
      this.baseUrl + "controller/ctlTipoUsuario.php?type=list"
    );
  }


}

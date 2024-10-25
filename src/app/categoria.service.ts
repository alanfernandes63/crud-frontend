import { Injectable } from '@angular/core';
import { Categoria } from './models';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends GenericService<Categoria>{

  constructor(http: HttpClient) {
    super(http, "/categorias");
  }
}

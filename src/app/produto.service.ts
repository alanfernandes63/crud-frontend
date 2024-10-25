import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Produto } from './models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends GenericService<Produto>{
  constructor(http: HttpClient) {
    super(http, "/produtos")
  }
}

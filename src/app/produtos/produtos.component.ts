import { Component, OnInit } from '@angular/core';
import { Categoria, Produto } from '../models';
import { ProdutoService } from '../produto.service';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produto: Produto = { nome: '', preco: 0, idCategoria: null };
  produtos: Produto[] = [];
  isEditMode = false;
  categorias: Array<Categoria> = [];

  ngOnInit(): void {
    this.categoriaService.getAll()
      .subscribe(categorias => { this.categorias = categorias });
    this.listarProdutos();
  }

  constructor(private produtoService: ProdutoService, private categoriaService: CategoriaService) {
  }

  adicionarProduto(): void {
    if (!this.isEditMode) {
      this.produtoService.create(this.produto)
        .subscribe(res => { this.listarProdutos(); this.resetarProduto() });
      return;
    }

    this.produtoService.update(this.produto.id, { nome: this.produto.nome, preco: this.produto.preco, idCategoria: this.produto.idCategoria })
      .subscribe(res => { this.listarProdutos(); this.resetarProduto() });
    this.isEditMode = false;

  }

  update(produto: Produto) {
    this.isEditMode = true;
    this.produto = Object.assign({}, produto);
    console.log(this.produto)
  }

  listarProdutos(): void {
    this.produtoService.getAll()
      .subscribe(produtos => { this.produtos = produtos })
  }

  deletarProduto(id: number): void {
    this.produtoService.delete(id)
      .subscribe(resp => { this.listarProdutos(); })
  }

  resetarProduto(): void {
    this.produto = { nome: '', preco: 0, idCategoria: null };
  }

}

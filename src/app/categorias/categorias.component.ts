import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../models';


@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  ngOnInit(): void {
    this.loadCategorias();
  }

  categorias: Categoria[] = [];
  nome: string = '';
  editingCategoryId: number | null = null;

  constructor(private categoryService: CategoriaService) {
  }

  loadCategorias() {
    this.categoryService.getAll()
      .subscribe(categorias => {
        this.categorias = categorias;
      })
  }

  save() {
    if (this.nome.trim()) {
      this.categoryService.create({ nome: this.nome.trim() })
        .subscribe();
      this.nome = '';
      this.loadCategorias();
    }
  }

  update(id: number) {
    this.editingCategoryId = id;
    this.nome = this.categorias.filter(c => c.id === id).map(c => c.nome).find(c => true);
  }

  updateCategory() {
    if (this.editingCategoryId !== null) {
      this.categoryService.update(this.editingCategoryId, { nome: this.nome })
        .subscribe(resp => { this.loadCategorias(); })
      this.nome = '';
      this.editingCategoryId = null;
    }
  }

  delete(id: number): void {
    this.categoryService.delete(id)
      .subscribe(resp => { this.loadCategorias(); });
  }

  cancelEdit() {
    this.nome = '';
    this.editingCategoryId = null;
  }
}

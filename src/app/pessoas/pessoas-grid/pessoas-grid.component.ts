import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styleUrls: ['./pessoas-grid.component.css']
})
export class PessoasGridComponent {
  filtro= false;
  totalRegistros= 0;
  itensPorPagina= 0;

  @Input() pessoas = [];
  aoMudarPagina() {};

}

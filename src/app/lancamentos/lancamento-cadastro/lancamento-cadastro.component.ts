import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [

    {label : 'Receita', value: 'RECEITA'},
    {label : 'Despesa', value: 'DESPESA'}
  ]

  categorias = [

    {label : 'Alimentacao', value: '1'},
    {label : 'Transporte', value: '2'}
  ]
  pessoas = [

    {label : 'João', value: '4'},
    {label : 'Félix', value: '9'},
    {label : 'Neto da Silva', value: '3'}
  ]
  constructor() { }

  ngOnInit() {
  }

}

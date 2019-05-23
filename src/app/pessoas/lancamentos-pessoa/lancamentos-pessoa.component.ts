import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pessoa',
  templateUrl: './lancamentos-pessoa.component.html',
  styleUrls: ['./lancamentos-pessoa.component.css']
})
export class LancamentosPessoaComponent  {

  pessoas = [
    { nome: 'Manoel Pinheiro', cidade: 'UberlÃ¢ndia', estado: 'MG', ativo: true },
    { nome: 'SebastiÃ£o da Silva', cidade: 'SÃ£o Paulo', estado: 'SP', ativo: false },
    { nome: 'Carla Souza', cidade: 'FlorianÃ³polis', estado: 'SC', ativo: true },
    { nome: 'LuÃ­s Pereira', cidade: 'Curitiba', estado: 'PR', ativo: true },
    { nome: 'Vilmar Andrade', cidade: 'Rio de Janeiro', estado: 'RJ', ativo: false },
    { nome: 'Paula Maria', cidade: 'UberlÃ¢ndia', estado: 'MG', ativo: true }
  ];


}

import { Component, OnInit, Input } from '@angular/core';
import { Contato } from 'app/core/model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contato-pessoa-cadastro',
  templateUrl: './contato-pessoa-cadastro.component.html',
  styleUrls: ['./contato-pessoa-cadastro.component.css']
})
export class ContatoPessoaCadastroComponent implements OnInit {

  @Input() contatos: Array<Contato>;
  exbindoFormularioContato = false;
  contato: Contato;

  contatoIndex: number;

  constructor() { }

  ngOnInit() {
  }

    confirmarContato(frm: FormControl) {
this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
this.exbindoFormularioContato = false;
frm.reset();
}

clonarContato(contato: Contato): Contato {
return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
}


prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exbindoFormularioContato = true;
    this.contatoIndex = index;
  }


prepararNovoContato() {
    this.exbindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.contatos.length;
  }

  removerContato(index: number) {
this.contatos.splice(index, 1);
}

get editando() {
return this.contato && this.contato.codigo;
}

}

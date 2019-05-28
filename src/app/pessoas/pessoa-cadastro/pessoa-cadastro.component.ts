import { Pessoa } from 'app/core/model';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa()

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvarPessoa(form: FormControl) {
    this.pessoaService.adicionarPessoa(this.pessoa)
    .then (() => {
      // nao desenvolvemos then como em outros metodos, porque nao precisamos exibir o conteudo o body de lancamento recentemene adicionado
     this.toasty.success('Pessoa adicionado com sucesso');
     form.reset();
     this.pessoa = new Pessoa();

    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }



}

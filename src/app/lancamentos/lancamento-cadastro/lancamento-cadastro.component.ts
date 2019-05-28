import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'app/categorias/categoria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { PessoaService, PessoaFiltro } from 'app/pessoas/pessoa.service';
import { Lancamento } from 'app/core/model';
import { LancamentoService } from '../lancamento.service';

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

  categorias = [ ]

  pessoas = [ ]

  lancamento = new Lancamento

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,

    private categoriaService: CategoriaService,
    private errorHandlerService: ErrorHandlerService,
    private pessoaService: PessoaService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    this.categoriaService.listarCategorias()
    .then (categorias => {
      this.categorias = categorias.map( c => ({ label: c.nome, value: c.codigo})) } )
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodasPessoas()
    .then (pessoas => {
      this.pessoas = pessoas.map( c => ({ label: c.nome, value: c.codigo})) } )
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  salvar(form: FormControl) {
    // vai chamar o service para fazer o lancamento
    // console.log(this.lancamento);

    this.lancamentoService.adicionar(this.lancamento)
    .then (() => {
      // nao desenvolvemos then como em outros metodos, porque nao precisamos exibir o conteudo o body de lancamento recentemene adicionado
     this.toasty.success('Lancamento adicionado com sucesso');
     form.reset();
     this.lancamento = new Lancamento();

    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

}

import { ToastyService } from 'ng2-toasty';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'app/categorias/categoria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { PessoaService, PessoaFiltro } from 'app/pessoas/pessoa.service';
import { Lancamento } from 'app/core/model';
import { LancamentoService } from '../lancamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
    private pessoaService: PessoaService,
    private route: ActivatedRoute,
    private router: Router,
    private titulo: Title
  ) { }

  ngOnInit() {

    this.titulo.setTitle('Novo Lançamento');

    const codigoLancamento = this.route.snapshot.params['codigo'];
    if ( codigoLancamento ) {

      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  atualizarTituloEdicao() {
    this.titulo.setTitle(`Edição do Lançamento: ${this.lancamento.descricao}`);
  }

  carregarLancamento( codigo: number ) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then( lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  get editando() {
    return Boolean(this.lancamento.codigo)
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

  adicionarLancamento(form: FormControl) {
    // vai chamar o service para fazer o lancamento
    // console.log(this.lancamento);

    this.lancamentoService.adicionar(this.lancamento)
    .then (lancamentoAdicionado => {
      // nao desenvolvemos then como em outros metodos, porque nao precisamos exibir o conteudo o body de lancamento recentemene adicionado
     this.toasty.success('Lancamento adicionado com sucesso');
    // para limpar tela
     // form.reset();
     // this.lancamento = new Lancamento();

     this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);

    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  salvar(form: FormControl) {
  if ( this.editando) {
    this.atualizarLancamento(form)
  } else {
    this.adicionarLancamento(form)
  }
  }

  atualizarLancamento(form: FormControl) {

    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento; // para atualar os dados do back end

      this.toasty.success(' Lancamento alterado com sucesso');
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }
  novo(form: FormControl) {
    form.reset();
    // o metodo abaixo serve para que seja mantidos os valores iniciais dos campos de lancamento
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);
    this.router.navigate(['/lancamentos/novo']);
  }

}

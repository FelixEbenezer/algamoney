import { Pessoa, Contato } from 'app/core/model';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;


  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandlerService: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private titulo: Title
  ) { }

  ngOnInit() {

    this.titulo.setTitle('Nova Pessoa')

    this.carregarEstados();

    const codigoPessoa = this.route.snapshot.params['codigo'];
    if ( codigoPessoa ) {
      this.carregarPessoa(codigoPessoa);
    }

  }

   atualizarTituloEdicao() {
    this.titulo.setTitle(`Edição da Pessoa: ${this.pessoa.nome}`);
  }

   carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo }));
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }


  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }


carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
                this.pessoa.endereco.cidade.estado.codigo : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

    get editando() {
    return Boolean(this.pessoa.codigo)
  }

  atualizarPessoa(form: FormControl) {

    this.pessoaService.atualizar(this.pessoa)
    .then(pessoa => {
      this.pessoa = pessoa; // para atualar os dados do back end

      this.toasty.success(' Pessoa alterado com sucesso');
      // this.router.navigate(['/pessoas']);
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }

  salvarPessoa(form: FormControl) {
  if ( this.editando) {
    this.atualizarPessoa(form)
  } else {
    this.adicionarPessoa(form)
  }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionarPessoa(this.pessoa)
    .then ((pessoaAlterada) => {
      // nao desenvolvemos then como em outros metodos, porque nao precisamos exibir o conteudo o body de lancamento recentemene adicionado
     this.toasty.success('Pessoa adicionado com sucesso');
     form.reset();
     this.pessoa = new Pessoa();
     this.router.navigate(['/pessoas', pessoaAlterada.codigo]);

    })
    .catch(erro => this.errorHandlerService.handle(erro));
  }


  novo(form: FormControl) {
    form.reset();
    // o metodo abaixo serve para que seja mantidos os valores iniciais dos campos de lancamento
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['/pessoas/novo']);
  }




}

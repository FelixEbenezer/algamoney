import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'app/seguranca/auth.service';


@Component({
  selector: 'app-lancamentos-pessoa',
  templateUrl: './lancamentos-pessoa.component.html',
  styleUrls: ['./lancamentos-pessoa.component.css']
})
export class LancamentosPessoaComponent implements OnInit  {

  @ViewChild('tabela') grid;
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(
    private titulo: Title,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private pessoaService: PessoaService,
    public auth: AuthService) {}

  ngOnInit() {
    this.titulo.setTitle('Pesquisa de Pessoas');
  }

  pesquisarPessoa(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.listarPessoas(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisarPessoa(pagina);
  }

  excluir(pessoa: any) {
    this.pessoaService.excluirPessoa(pessoa.codigo)
    .then(() => {
      if (this.grid.first === 0 ) {
        this.pesquisarPessoa();
      } else {
        this.grid.first = 0;
      }
      this.toasty.success('Pessoa excluido com sucesso');
    })
    .catch(erro => this.errorHandler.handle(erro));

  }
  confirmarExclusao( pessoa: any) {

     this.confirmation.confirm({
      message: 'Quer excluir mesmo esta Pessoa?',
      accept: () => {
        this.excluir(pessoa);
      }
     });
    }

    alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  }

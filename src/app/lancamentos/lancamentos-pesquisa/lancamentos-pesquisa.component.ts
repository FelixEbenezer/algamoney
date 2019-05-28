import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';
@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})

export class LancamentosPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
 /* descricao: string;
  // para intervalo de datas
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
*/
  @ViewChild('tabela') grid;
  lancamentos = [];

  constructor(
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService) { }

  ngOnInit() {
    // this.pesquisar();
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
          this.lancamentos = resultado.lancamentos;
        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      if (this.grid.first === 0 )  {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }
      this.toasty.success('Lancamento excluido com sucesso');
    })
     .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao( lancamento: any) {

     this.confirmation.confirm({
      message: 'Quer excluir mesmo?',
      accept: () => {
        this.excluir(lancamento);
      }
     });
    }


}

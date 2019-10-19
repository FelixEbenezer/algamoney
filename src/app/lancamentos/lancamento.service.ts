import { Lancamento } from './../core/model';
// import { Http, Headers, URLSearchParams } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
// import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { MoneyHttp } from 'app/seguranca/money-http';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: MoneyHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
               // dataVencimentoDe é o nomes usado no BDD do API, não pode mudar
      params = params.append('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
              // dataVencimentoFim é o nomes usado no BDD do API, não pode mudar
    if (filtro.dataVencimentoFim) {
      params = params.append('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.lancamentosUrl}?resumo`,
        { params })
      .toPromise()
      .then(response => {
          const lancamentos = response.content;

          const resulado = {
            lancamentos,
            total: response.totalElements
          };
          return resulado;
        })
  }

  excluir(codigo: number): Promise<void> {

    // const headers = new Headers();

    //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`,
        )
      .toPromise()
      .then(() => null);

  }

  adicionar( lancamento: Lancamento): Promise<Lancamento> {

  //  const headers = new Headers();

  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
   // headers.append('Content-Type', 'application/json');

    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
    .toPromise();
  }

  atualizar( lancamento: Lancamento): Promise<Lancamento> {

   // const headers = new Headers();

  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
  //  headers.append('Content-Type', 'application/json');

    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`,
        lancamento)
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });

  }

  buscarPorCodigo ( codigo: number ): Promise<Lancamento> {

   // const headers = new Headers();

   // headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const lancamento = response;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}

import { Lancamento } from './../core/model';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
               // dataVencimentoDe é o nomes usado no BDD do API, não pode mudar
      params.set('dataVencimentoDe',
        moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }
              // dataVencimentoFim é o nomes usado no BDD do API, não pode mudar
    if (filtro.dataVencimentoFim) {
      params.set('dataVencimentoAte',
        moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,
        { headers, search: params })
      .toPromise()
      .then(response => {
          const responseJson = response.json();
          const lancamentos = responseJson.content;

          const resulado = {
            lancamentos,
            total: responseJson.totalElements
          };
          return resulado;
        })
  }

  excluir(codigo: number): Promise<void> {

    const headers = new Headers();

    headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`,
        { headers})
      .toPromise()
      .then(() => null);

  }

  adicionar( lancamento: Lancamento): Promise<Lancamento> {

    const headers = new Headers();

    headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
    .toPromise()
    .then(response => response.json());
  }

}

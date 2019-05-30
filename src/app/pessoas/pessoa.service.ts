import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Pessoa } from 'app/core/model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: Http) {  }

  listarPessoas(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, search: params })
    .toPromise()
    .then(response => {
    const responseJson =  response.json();
    const pessoas = responseJson.content;

    const resultado = {
      pessoas,
      total: responseJson.totalElements
    };
    return resultado;
    })
  }

  listarTodasPessoas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    return this.http.get(`${this.pessoasUrl}`, { headers })
    .toPromise()
    .then(response => response.json().content);

    }

  excluirPessoa(codigo: number): Promise<void> {

    const headers = new Headers();
    headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
    .toPromise()
    .then(() => null) ;

  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionarPessoa( pessoa: Pessoa): Promise<Pessoa> {

    const headers = new Headers();

    headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), { headers })
    .toPromise()
    .then(response => response.json());
  }


}

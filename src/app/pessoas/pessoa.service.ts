import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Pessoa } from 'app/core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;

  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
   }

  listarPessoas(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
  //  const headers = new Headers();
  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { search: params })
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
  //  const headers = new Headers();
  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    return this.http.get(`${this.pessoasUrl}`)
    .toPromise()
    .then(response => response.json().content);

    }

  excluirPessoa(codigo: number): Promise<void> {

   // const headers = new Headers();
   // headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(() => null) ;

  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
  //  const headers = new Headers();
  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
  //  headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  adicionarPessoa( pessoa: Pessoa): Promise<Pessoa> {

  //  const headers = new Headers();

  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
  //  headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
    .toPromise()
    .then(response => response.json());
  }

  buscarPorCodigo ( codigo: number ): Promise<Pessoa> {

  //  const headers = new Headers();

  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const pessoa = response.json() as Pessoa;
        return pessoa;
      });
  }

  atualizar( pessoa: Pessoa): Promise<Pessoa> {

  //  const headers = new Headers();

  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
  //  headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,
        JSON.stringify(pessoa))
      .toPromise()
      .then(response => {
        const pessoaAlterado = response.json() as Pessoa;
        return pessoaAlterado;
      });

  }

}

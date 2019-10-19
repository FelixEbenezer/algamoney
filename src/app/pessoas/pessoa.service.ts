import { HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa, Estado, Cidade } from 'app/core/model';
// import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { MoneyHttp } from 'app/seguranca/money-http';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;
  estadosUrl: string;
  cidadesUrl: string;

  constructor(private http: MoneyHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
   }

  listarPessoas(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.pessoasUrl}`, { params })
    .toPromise()
    .then(response => {
    const pessoas = response.content;

    const resultado = {
      pessoas,
      total: response.totalElements
    };
    return resultado;
    })
  }

  listarTodasPessoas(): Promise<any> {
  //  const headers = new Headers();
  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    return this.http.get<any>(`${this.pessoasUrl}`)
    .toPromise()
    .then(response => response.content);

    }

  excluirPessoa(codigo: number): Promise<void> {

   // const headers = new Headers();
   // headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(() => null) ;

  }

/*  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
  //  const headers = new Headers();
  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
  //  headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

*/

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
        .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }




  adicionarPessoa( pessoa: Pessoa): Promise<Pessoa> {

  //  const headers = new Headers();

  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
  //  headers.append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
    .toPromise();
  }

  buscarPorCodigo ( codigo: number ): Promise<Pessoa> {

  //  const headers = new Headers();

  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
      .toPromise();
  }

  atualizar( pessoa: Pessoa): Promise<Pessoa> {

  //  const headers = new Headers();

  //  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
  //  headers.append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`,
        pessoa)
      .toPromise();
  }

  listarEstados(): Promise<Estado[]> {
return this.http.get<Estado[]>(this.estadosUrl).toPromise();
}

pesquisarCidades(estado): Promise<Cidade[]> {
const params = new HttpParams().append('estado', estado);

return this.http.get<Cidade[]>(this.cidadesUrl, {
params}).toPromise();
}

}

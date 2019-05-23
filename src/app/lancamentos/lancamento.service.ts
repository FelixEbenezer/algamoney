import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'localhost:8080/lancamentos';
  constructor(private http: Http) { }

  pesquisar(): Promise<any> {

  const headers = new Headers();
  headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers: headers})
    .toPromise()
    .then(response => {
      console.log(response.json());
    })
  }



}

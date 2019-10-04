import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
// import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { MoneyHttp } from 'app/seguranca/money-http';

@Injectable()
export class CategoriaService {

  categoriasUrl: string;

  constructor(private http: MoneyHttp) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
   }

  listarCategorias (): Promise<any> {
   // const headers = new Headers();
   // headers.append('Authorization', 'Basic ZkBnLmNvbTphZG1pbg==');
    return this.http.get(`${this.categoriasUrl}`)
    .toPromise();

    }

}

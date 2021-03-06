import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { HttpErrorResponse } from '@angular/common/http';
// import { AuthHttpError } from 'angular2-jwt';
import { Router } from '@angular/router';
import { NotAuthenticatedError } from 'app/seguranca/money-http';


@Injectable()
export class ErrorHandlerService {

  constructor(
    private toasty: ToastyService,
    private router: Router) { }

  handle(errorResponse: any) {
    let msg: string;
    // let msg2: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if ( errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou !!!!!';
      this.router.navigate(['/login']);
    } else if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Ocorreu um erro ao processar seu pedido';
      if (errorResponse.status === 403) {
        msg = 'Voce não tem permissão para executar esta ação';
      }

      try {
        msg = errorResponse.error[0].msgUsuario ;
        // msg2 = errorResponse.error[0].msgDesenvolvedor ;
      } catch (e) { }
      console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.toasty.error(msg);
    /*if (msg2 != null) {
      this.toasty.warning(msg2);
    }*/
  }


}

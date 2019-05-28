import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Response } from '@angular/http';


@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;
    let msg2: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      msg = 'Ocorreu um erro ao processar seu pedido';
      try {
        errors = errorResponse.json();
        msg = errors[0].msgUsuario ;
        msg2 = errors[0].msgDesenvolvedor ;
      } catch (e) { }
      console.error('Ocorreu um erro', errorResponse);
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.toasty.error(msg);
    this.toasty.warning(msg2);
  }


}

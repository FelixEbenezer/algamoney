import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    private titulo: Title,
    private auth: AuthService,
    private errorHandle: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.titulo.setTitle('Login de Aplicação');
  }

    login(usuario: string, senha: string) {
      this.auth.login(usuario, senha)
      .then (() => {
        this.router.navigate(['/dashboard']);
      })
      .catch( erro => {
        this.errorHandle.handle(erro);
      })
  }


}

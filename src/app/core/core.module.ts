import { ErrorHandlerService } from './error-handler.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NevbarComponent } from './nevbar/nevbar.component';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradoComponent } from './pagina-nao-encontrado.component';
import { Title } from '@angular/platform-browser';
import { SegurancaModule } from 'app/seguranca/seguranca.module';
import { AuthService } from 'app/seguranca/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { NaoAutorizadoComponent } from './nao-autorizado.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NevbarComponent, PaginaNaoEncontradoComponent, NaoAutorizadoComponent],
  exports: [NevbarComponent],
  providers: [
    ErrorHandlerService,
    Title,
    AuthService,
    JwtHelper
  ]
})
export class CoreModule { }

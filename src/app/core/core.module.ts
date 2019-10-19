import { ErrorHandlerService } from './error-handler.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NevbarComponent } from './nevbar/nevbar.component';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradoComponent } from './pagina-nao-encontrado.component';
import { Title } from '@angular/platform-browser';
import { SegurancaModule } from 'app/seguranca/seguranca.module';
import { AuthService } from 'app/seguranca/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { RelatoriosService } from 'app/relatorios/relatorios.service';
import { MoneyHttp } from 'app/seguranca/money-http';

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
    DashboardService,
    RelatoriosService,
    MoneyHttp,
    AuthService,
    JwtHelperService
  ]
})
export class CoreModule { }

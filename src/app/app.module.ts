import { PaginaNaoEncontradoComponent } from './core/pagina-nao-encontrado.component';
import { PessoaService } from './pessoas/pessoa.service';
import { LancamentoService } from './lancamentos/lancamento.service';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { ToastyModule } from 'ng2-toasty';
import {  ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';
import { CategoriaService } from './categorias/categoria.service';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPessoaComponent } from './pessoas/lancamentos-pessoa/lancamentos-pessoa.component';
import { Routes, RouterModule } from '@angular/router'
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';


@NgModule({
  declarations: [
    // apagamos os componentes que foram transferidos para lancamentosModule e pessoasModule
    AppComponent
  ],
  imports: [
    // importamos o novo modulo Lancamentos e Pessoas
    LancamentosModule,
    PessoasModule,
    BrowserModule,
    HttpModule,
    SegurancaModule,
//    RouterModule.forRoot(routes),
    AppRoutingModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,


    CoreModule
  ],
  providers: [
    CategoriaService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

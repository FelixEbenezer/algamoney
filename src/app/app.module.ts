import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginaNaoEncontradoComponent } from './core/pagina-nao-encontrado.component';
import { PessoaService } from './pessoas/pessoa.service';
import { LancamentoService } from './lancamentos/lancamento.service';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ToastyModule } from 'ng2-toasty';

import { ConfirmationService } from 'primeng/api';
import { CategoriaService } from './categorias/categoria.service';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPessoaComponent } from './pessoas/lancamentos-pessoa/lancamentos-pessoa.component';
import { Routes, RouterModule } from '@angular/router'
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';

import { NgModule, LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import { BrowserAnimationBuilder } from '@angular/platform-browser/animations/src/animation_builder';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeDECH);

@NgModule({
  declarations: [
    // apagamos os componentes que foram transferidos para lancamentosModule e pessoasModule
    AppComponent
  ],
  imports: [
    // importamos o novo modulo Lancamentos e Pessoas
  //  LancamentosModule,
   // PessoasModule,
    BrowserModule,
    HttpClientModule,
    SegurancaModule,
//    RouterModule.forRoot(routes),
    AppRoutingModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    BrowserAnimationsModule,


    CoreModule
  ],
  providers: [
    CategoriaService,
    LancamentoService,
    PessoaService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'de-ch'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

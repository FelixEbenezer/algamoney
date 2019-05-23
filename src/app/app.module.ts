import { LancamentoService } from './lancamentos/lancamento.service';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {InputTextareaModule} from 'primeng/components/inputtextarea/inputtextarea';
import {CalendarModule} from 'primeng/components/calendar/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SelectButtonModule} from 'primeng/components/SelectButton/selectbutton';
import {DropdownModule} from 'primeng/components/dropdown/dropdown';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {InputMaskModule} from 'primeng/components/inputmask/inputmask';
import {ButtonModule} from 'primeng/components/button/button';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';

import { AppComponent } from './app.component';
// import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NevbarComponent } from './core/nevbar/nevbar.component';
// import { LancamentosPessoaComponent } from './pessoas/lancamentos-pessoa/lancamentos-pessoa.component';
// import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
// import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { MessageComponent } from './shared/message/message.component';
// import { LancamentosGridComponent } from './lancamentos/lancamentos-grid/lancamentos-grid.component';
// import { PessoasGridComponent } from './pessoas/pessoas-grid/pessoas-grid.component';

@NgModule({
  declarations: [
    // apagamos os componentes que foram transferidos para lancamentosModule e pessoasModule
    AppComponent,
    // NevbarComponent,
    // LancamentosPessoaComponent,
    // LancamentoCadastroComponent,
    // PessoaCadastroComponent,
    // MessageComponent,
    // LancamentosGridComponent,
    // PessoasGridComponent
  ],
  imports: [
    // importamos o novo modulo Lancamentos e Pessoas
    LancamentosModule,
    PessoasModule,
    BrowserModule,
    HttpModule,

    CoreModule
   /* InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    CalendarModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    InputMaskModule,
    FormsModule */
  ],
  providers: [LancamentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

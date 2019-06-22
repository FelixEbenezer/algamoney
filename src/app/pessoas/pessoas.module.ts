import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
// import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { LancamentosPessoaComponent } from './lancamentos-pessoa/lancamentos-pessoa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PessoasRoutingModule } from './pessoas-routing.module';

@NgModule({
  imports: [
    PessoasRoutingModule,
    RouterModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    CalendarModule,
    BrowserAnimationsModule,
    // SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    InputMaskModule,
    FormsModule,

    SharedModule
  ],
  declarations: [
    LancamentosPessoaComponent,
    PessoaCadastroComponent,
    PessoasGridComponent
  ],
  exports: [
    LancamentosPessoaComponent,
    PessoaCadastroComponent
  ]
})
export class PessoasModule { }

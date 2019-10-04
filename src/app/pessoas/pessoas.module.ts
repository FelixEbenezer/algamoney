import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
// import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { LancamentosPessoaComponent } from './lancamentos-pessoa/lancamentos-pessoa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PanelModule } from 'primeng/panel';
import { DataTableModule } from 'primeng/datatable';
import { DialogModule} from 'primeng/dialog';
import { ContatoPessoaCadastroComponent } from './contato-pessoa-cadastro/contato-pessoa-cadastro.component'
@NgModule({
  imports: [
    PessoasRoutingModule,
    RouterModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    DataTableModule,
    TooltipModule,
    CalendarModule,
   // BrowserAnimationsModule,
    // SelectButtonModule,
    DropdownModule,
    CurrencyMaskModule,
    InputMaskModule,
    FormsModule,
    PanelModule,
    DialogModule,

    SharedModule
  ],
  declarations: [
    LancamentosPessoaComponent,
    PessoaCadastroComponent,
    PessoasGridComponent,
    ContatoPessoaCadastroComponent
  ],
  exports: [
    LancamentosPessoaComponent,
    PessoaCadastroComponent
  ]
})
export class PessoasModule { }

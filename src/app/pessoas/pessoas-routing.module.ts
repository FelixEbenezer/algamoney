import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LancamentosPessoaComponent } from './lancamentos-pessoa/lancamentos-pessoa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

const routes: Routes = [

  { path: 'pessoas', component: LancamentosPessoaComponent },
      { path: 'pessoas/novo', component: PessoaCadastroComponent },
      { path: 'pessoas/:codigo', component: PessoaCadastroComponent },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule   ]
})
export class PessoasRoutingModule { }


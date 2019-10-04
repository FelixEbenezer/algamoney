import { Routes, RouterModule } from '@angular/router';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPessoaComponent } from './pessoas/lancamentos-pessoa/lancamentos-pessoa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';
import { PaginaNaoEncontradoComponent } from './core/pagina-nao-encontrado.component';
import { NgModule } from '@angular/core';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';

 const routes: Routes = [

// { path: 'lancamentos', loadChildren: 'app/lancamentos/lancamentos.module#LancamentosModule' },
// { path: 'pessoas', loadChildren: 'app/pessoas/pessoas.module#PessoasModule' },

{ path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},

{ path: 'relatorios', loadChildren: './relatorios/relatorios.module#RelatoriosModule'},

 { path: 'lancamentos', loadChildren: './lancamentos/lancamentos.module#LancamentosModule'},
 { path: 'pessoas', loadChildren: './pessoas/pessoas.module#PessoasModule'},

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'pagina-nao-encontrado', component: PaginaNaoEncontradoComponent},
  { path: 'nao-autorizado', component: NaoAutorizadoComponent},
  { path: '**', redirectTo: 'pagina-nao-encontrado'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule { }

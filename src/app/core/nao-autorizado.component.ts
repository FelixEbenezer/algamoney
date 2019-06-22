import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nao-autorizado',
 template: `

  <div class="container">
   <h1 class="text-center">Acesso Negado !!!</h1>
   <button (click)="backClicked()">Back</button>
  </div>
  `,
  styles: []
})
export class NaoAutorizadoComponent implements OnInit {

  constructor(
    private xlocation: Location
  ) { }

  ngOnInit() {
  }

  backClicked() {
    this.xlocation.back();
  }

}

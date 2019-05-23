import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NevbarComponent } from './nevbar/nevbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NevbarComponent],
  exports: [NevbarComponent]
})
export class CoreModule { }

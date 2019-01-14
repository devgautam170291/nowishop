import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreedcrumbComponent } from './breedcrumb/breedcrumb.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
      BreedcrumbComponent
  ],
  declarations: [
    BreedcrumbComponent
  ],
  providers: [
  ]
})
export class GlobalModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from './section-header/section-header.component'
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'



@NgModule({
  declarations: [
    NavBarComponent,
    SectionHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    NavBarComponent,
    SectionHeaderComponent,
  ]
})
export class CoreModule { }

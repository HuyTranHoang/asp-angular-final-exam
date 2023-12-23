import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { ToastrModule } from 'ngx-toastr'
import { BreadcrumbModule } from 'xng-breadcrumb'
import { PagerComponent } from './pager/pager.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    PagerComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BreadcrumbModule,
    FormsModule
  ],
  exports: [
    PagerComponent,
    PaginationModule,
    ToastrModule,
    BreadcrumbModule
  ]
})
export class SharedModule { }

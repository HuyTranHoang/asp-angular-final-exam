import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { ToastrModule } from 'ngx-toastr'
import { BreadcrumbModule } from 'xng-breadcrumb'
import { PagerComponent } from './pager/pager.component'
import { FormsModule } from '@angular/forms'
import { ModalModule } from 'ngx-bootstrap/modal'
import { FilterSortComponent } from './filter-sort/filter-sort.component'

@NgModule({
  declarations: [
    PagerComponent,
    FilterSortComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
      extendedTimeOut: 1500,
    }),
    BreadcrumbModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  exports: [
    PagerComponent,
    FilterSortComponent,
    PaginationModule,
    ToastrModule,
    BreadcrumbModule
  ]
})
export class SharedModule { }

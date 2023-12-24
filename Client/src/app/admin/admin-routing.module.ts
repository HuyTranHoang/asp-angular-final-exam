import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { ProductComponent } from './product/product.component'
import { CreateComponent } from './product/create/create.component'

const routes: Routes = [
  {path: '', component: ProductComponent, data: {breadcrumb: 'Sản phẩm'}},
  {path: 'create', component: CreateComponent, data: {breadcrumb: {alias: 'Thêm mới sản phẩm'}}}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

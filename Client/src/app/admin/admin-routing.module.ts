import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ProductComponent } from './product/product.component'
import { CreateComponent } from './product/create/create.component'
import { AdminComponent } from './admin.component'
import { CategoryComponent } from './category/category.component'

const routes: Routes = [
  {
    path: '', component: AdminComponent, data: { breadcrumb: 'Quản trị'}, children: [
      {path: '', redirectTo: 'product', pathMatch: 'full'},
      {path: 'product', component: ProductComponent, data: {breadcrumb: {alias: 'Danh sách sản phẩm'}}},
      {path: 'product/create', component: CreateComponent, data: {breadcrumb: {alias: 'Thêm mới sản phẩm'}}},
      {path: 'product/:id/edit', component: CreateComponent, data: {breadcrumb: {alias: 'Sửa sản phẩm'}}},
      {path: 'category', component: CategoryComponent, data: {breadcrumb: {alias: 'Danh sách danh mục'}}},
    ]
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

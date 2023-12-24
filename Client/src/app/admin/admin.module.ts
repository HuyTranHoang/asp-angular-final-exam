import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { AdminRoutingModule } from './admin-routing.module'
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './product/create/create.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component'



@NgModule({
  declarations: [
    ProductComponent,
    CreateComponent,
    AdminComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

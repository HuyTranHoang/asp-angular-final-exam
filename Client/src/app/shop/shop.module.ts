import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component'
import { ProductItemComponent } from './product-item/product-item.component'
import { FilterSortComponent } from './filter-sort/filter-sort.component'
import { ProductDetailsComponent } from './product-details/product-details.component'
import { SharedModule } from '../shared/shared.module'
import { ShopRoutingModule } from './shop-routing.module'
import { FormsModule } from '@angular/forms'



@NgModule({
  declarations: [
    ShopComponent,
    ProductItemComponent,
    FilterSortComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    FormsModule
  ]
})
export class ShopModule { }

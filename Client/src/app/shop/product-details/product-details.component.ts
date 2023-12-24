import { Component, OnInit } from '@angular/core'
import { Product } from '../../models/product'
import { ShopService } from '../../services/shop.service'
import { ActivatedRoute } from '@angular/router'
import { BreadcrumbService } from 'xng-breadcrumb'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined
  quantity = 1

  constructor(private activatedRoute: ActivatedRoute, private shopService: ShopService, private bcService: BreadcrumbService) {}

  ngOnInit(): void {
    const id: number = this.activatedRoute.snapshot.params['id']
    if (id) {
      this.shopService.getProduct(id).subscribe({
        next: product => {
          this.product = product
          this.bcService.set('@Chi tiết sản phẩm', product.name)
        },
        error: err => console.log(err)
      })
    }
  }

}

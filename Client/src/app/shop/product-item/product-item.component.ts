import { Component, Input } from '@angular/core'
import { Product } from '../../models/product'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  @Input() product: Product | undefined

  constructor(private toastrService: ToastrService) {}
  addToCart(event: Event) {
    event.stopPropagation();
    this.toastrService.success(`${this.product?.name} added to cart`)
  }
}



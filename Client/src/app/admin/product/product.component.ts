import { Component, OnInit, TemplateRef } from '@angular/core'
import { ProductService } from '../../services/admin/product.service'
import { Product } from '../../models/product'
import { Pagination } from '../../models/pagination'
import { ToastrService } from 'ngx-toastr'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[] = []
  pagination: Pagination = {page: 1, pageSize: 4, totalCount: 0}

  currentDeleteId?: number
  modalRef?: BsModalRef;
  message?: string;

  constructor(private productService: ProductService, private toastrService: ToastrService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.productService.getProducts(this.pagination.pageSize, this.pagination.page).subscribe({
      next: (response) => {
        this.pagination.page = response.page
        this.pagination.pageSize = response.pageSize
        this.pagination.totalCount = response.totalCount
        this.products = response.items
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onPageChanged(event: any) {
    this.pagination.page = event
    this.loadProducts()
  }


  onDelete() {
    if (this.currentDeleteId){
      this.productService.deleteProduct(this.currentDeleteId).subscribe({
        next: () => {
          this.toastrService.success('Xóa sản phẩm thành công')
          this.currentDeleteId = undefined
          this.loadProducts()
        },
        error: (error) => {
          this.toastrService.error('Something went wrong')
          console.log(error)
        }
      })
    }
  }

  openModal(template: TemplateRef<void>, id: number) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.currentDeleteId = id
  }

  confirm(): void {
    this.onDelete()
    this.modalRef?.hide();
  }

  decline(): void {
    this.currentDeleteId = undefined
    this.modalRef?.hide();
  }

}

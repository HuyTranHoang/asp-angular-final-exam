import { Component, OnInit, TemplateRef } from '@angular/core'
import { ProductService } from '../../services/admin/product.service'
import { Product } from '../../models/product'
import { Pagination } from '../../models/pagination'
import { ToastrService } from 'ngx-toastr'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'
import { Category } from '../../models/category'
import { CategoryService } from '../../services/admin/category.service'
import { ProductParams } from '../../models/productParams'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[] = []
  categories: Category[] = []

  pagination : Pagination = {page: 1, pageSize: 4, totalCount: 0}
  productParams = new ProductParams()
  searchTerm = ''

  sortOptions = [
    {name: 'Tên: A -> Z', id: 'name'},
    {name: 'Giá tăng dần', id: 'priceAsc'},
    {name: 'Giá giảm dần', id: 'priceDesc'}
  ]

  currentDeleteId?: number
  currentDeleteName?: string
  modalRef?: BsModalRef;
  message?: string;


  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private toastrService: ToastrService,
              private modalService: BsModalService) {}

  ngOnInit(): void {
    this.loadCategory()
    this.loadProducts()
  }

  loadProducts() {
    this.productService.getProducts(this.productParams).subscribe({
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

  loadCategory() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = [{id: 0, name: 'Tất cả'}, ...response]
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  onCategorySelected(event: any) {
    this.productParams.categoryId = event.target.value
    this.loadProducts()
  }

  onSortSelected(event: any) {
    this.productParams.sortSelected = event.target.value
    this.loadProducts()
  }

  onSearch() {
    this.productParams.searchTerm = this.searchTerm
    this.loadProducts()
  }

  onPageChanged(event: any) {
    this.productParams.pageNumber = event
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

  onReset() {
    this.productParams = new ProductParams()
    this.searchTerm = ''
    this.loadProducts()
  }

  openModal(template: TemplateRef<void>, id: number, name: string) {
    this.modalRef = this.modalService.show(template, { class: '' });
    this.currentDeleteId = id
    this.currentDeleteName = name
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

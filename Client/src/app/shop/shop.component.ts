import { Component, OnInit } from '@angular/core'
import { ShopService } from '../services/shop.service'
import { Product } from '../models/product'
import { Pagination } from '../models/pagination'
import { Category } from '../models/category'
import { ProductParams } from '../models/productParams'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  pagination : Pagination = {} as Pagination
  products: Product[] = []
  categories: Category[] = []

  productParams = new ProductParams()
  searchTerm = ''

  sortOptions = [
    {name: 'Alphabetical', id: 'name'},
    {name: 'Price: Low to High', id: 'priceAsc'},
    {name: 'Price: High to Low', id: 'priceDesc'}
  ]

  constructor(public shopService: ShopService) {}

  ngOnInit(): void {
    this.loadProducts()
    this.loadCategory()
  }

  loadProducts() {
    this.shopService.getProducts(this.productParams).subscribe({
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
    this.shopService.getCategories().subscribe({
      next: (response) => {
        this.categories = [{id: 0, name: 'All'}, ...response]
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

  onReset() {
    this.productParams = new ProductParams()
    this.searchTerm = ''
    this.loadProducts()
  }

  onPageChanged(event: any) {
    this.productParams.pageNumber = event
    this.loadProducts()
  }

}

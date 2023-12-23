import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { environment } from '../../environments/environment.development'
import { Pagination } from '../models/pagination'
import { Product } from '../models/product'
import { Category } from '../models/category'
import { ProductParams } from '../models/productParams'
import { PagedList } from '../models/pagedList'

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getProducts(productParams: ProductParams) {

    let params = new HttpParams()

    if (productParams.categoryId !== 0) {
      params = params.append('categoryId', productParams.categoryId)
    }

    if (productParams.searchTerm) {
      params = params.append('searchTerm', productParams.searchTerm)
    }

    params = params.append('pageNumber', productParams.pageNumber.toString())

    params = params.append('pageSize', productParams.pageSize.toString())

    params = params.append('sort', productParams.sortSelected)

    return this.http.get<PagedList<Product[]>>(this.baseUrl + 'products', { params })
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id)
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'categories')
  }

}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development'
import { HttpClient, HttpParams } from '@angular/common/http'
import { PagedList } from '../../models/pagedList'
import { Product } from '../../models/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getProducts(pageSize: number, pageNumber: number) {
    let params = new HttpParams()

    params = params.append('pageNumber', pageNumber.toString())

    params = params.append('pageSize', pageSize.toString())

    return this.http.get<PagedList<Product[]>>(this.baseUrl + 'products', { params })
  }

  getProduct(id: number) {
    return this.http.get(this.baseUrl + 'products/' + id)
  }

  createProduct(product: any) {
    return this.http.post(this.baseUrl + 'products', product)
  }

  updateProduct(product: any) {
    return this.http.put(this.baseUrl + 'products', product)
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id)
  }

  uploadImage(file: any) {
    const formData = new FormData()
    formData.append('file', file)
    return this.http.post(this.baseUrl + 'products/upload-image', formData)
  }
}

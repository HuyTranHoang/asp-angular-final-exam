import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagedList } from '../../models/pagedList';
import { Product } from '../../models/product';
import { ProductParams } from '../../models/productParams';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(productParams: ProductParams) {
    let params = new HttpParams();

    if (productParams.categoryId !== 0) {
      params = params.append('categoryId', productParams.categoryId);
    }

    if (productParams.searchTerm) {
      params = params.append('searchTerm', productParams.searchTerm);
    }

    params = params.append('pageNumber', productParams.pageNumber.toString());

    params = params.append('pageSize', productParams.pageSize.toString());

    params = params.append('sort', productParams.sortSelected);

    return this.http.get<PagedList<Product[]>>(this.baseUrl + 'products', {
      params,
    });
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.baseUrl + 'products/' + id);
  }

  createProduct(product: any) {
    return this.http.post(this.baseUrl + 'products', product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(this.baseUrl + 'products/' + id, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id);
  }

  uploadImage(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(this.baseUrl + 'products/upload-image', formData);
  }
}

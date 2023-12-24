import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { Category } from '../../models/category'


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'categories')
  }

}

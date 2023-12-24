import { Component, OnInit } from '@angular/core'
import { CategoryService } from '../../services/admin/category.service'
import { Observable } from 'rxjs'
import { Category } from '../../models/category'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories$: Observable<Category[]> | undefined

  constructor(private categoryService: CategoryService, private toastrService: ToastrService){
  }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories()
  }

  notImplemented() {
    this.toastrService.warning('Chức năng này chưa được cài đặt', 'Cảnh báo')
  }

}

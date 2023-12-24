import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../../services/admin/product.service'
import { CategoryService } from '../../../services/admin/category.service'
import { Category } from '../../../models/category'
import { FormBuilder, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  categories: Category[] = []

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    file: [],
    categoryId: ['1', Validators.required]
  })

  isSubmitted = false


  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private toastrService: ToastrService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getFile(event: any) {
    const file = event.target.files[0]
    this.productForm.patchValue({ file })
    this.productForm.get('file')?.updateValueAndValidity()
  }

  onSubmit() {
    const formData = new FormData()

    formData.append('name', this.productForm.value.name!)
    formData.append('description', this.productForm.value.description!)
    formData.append('price', this.productForm.value.price!)
    formData.append('categoryId', this.productForm.value.categoryId!)

    if (this.productForm.value.file) {
      const file = this.productForm.value.file as File
      formData.append('file', file)
    }
    this.isSubmitted = true

    this.productService.createProduct(formData).subscribe({
      next: () => {
        this.toastrService.success('Thêm sản phẩm thành công')
        this.isSubmitted = false
        this.productForm.reset()
      },
      error: (error) => {
        console.log(error)
        this.toastrService.error('Thêm sản phẩm thất bại')
      }
    })
  }

}

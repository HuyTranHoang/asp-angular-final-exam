import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/admin/category.service';
import { ProductService } from 'src/app/services/admin/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  categories: Category[] = [];

  imageSrc: string | ArrayBuffer | null = null;

  productForm = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    file: [],
    oldImage: [''],
    categoryId: ['1', Validators.required],
  });

  isSubmitted = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.loadProduct(id);
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  loadProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (response) => {
        this.productForm.patchValue({
          id: response.id,
          name: response.name,
          description: response.description,
          price: response.price,
          oldImage: response.image,
          categoryId: response.categoryId.toString(),
        });

        this.imageSrc = response.image.includes('http')
          ? response.image
          : `https://localhost:5001/images/${response.image}`;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getFile(event: any) {
    const file = event.target.files[0];
    this.productForm.patchValue({ file });
    this.productForm.get('file')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = (_) => (this.imageSrc = reader.result);

    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.isSubmitted = true;
    const id = this.activatedRoute.snapshot.params['id'];
    if (this.productForm.valid) {
      const formData = new FormData();

      formData.append('id', this.productForm.value.id!.toString());
      formData.append('name', this.productForm.value.name!);
      formData.append('description', this.productForm.value.description!);
      formData.append('price', this.productForm.value.price!.toString());
      formData.append(
        'categoryId',
        this.productForm.value.categoryId!.toString()
      );

      if (this.productForm.value.file) {
        const file = this.productForm.value.file as File;
        formData.append('file', file);
      } else {
        formData.append('oldImage', this.productForm.value.oldImage!);
      }

      this.productService.updateProduct(id, formData).subscribe({
        next: (response) => {
          this.toastrService.success('Cập nhật sản phẩm thành công');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}

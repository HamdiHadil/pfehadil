import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Product} from "./product";
import {ProductService} from "./product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-download-dialog',
  templateUrl: './product-dialog.component.html',
})
export class ProductDialogComponent {
  productForm = this.fb.group({
    name: [this.data ? this.data.name : '', [Validators.required,]],
    useMethod: [this.data ? this.data.useMethod : '', [Validators.required]],
    desc: [this.data ? this.data.desc : '', [Validators.required]],
    qty: [this.data ? this.data.qty : '', [Validators.required, Validators.min(0), Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]]
  })

  constructor(private fb: FormBuilder, private productService: ProductService, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Product) {}
  private product(): Product {
    return {
      ...new Product(),
      id: this.data ? this.data.id : '',
      name: this.productForm.get(['name'])!.value,
      useMethod: this.productForm.get(['useMethod'])!.value,
      desc: this.productForm.get(['desc'])!.value,
      qty: this.productForm.get(['qty'])!.value,
    };
  }
  onSubmit() {
    if (this.productForm.valid) {
      const product: Product = this.product()
      if (this.data && this.data.id) {
        // Update existing sector
        this.productService.update(this.data.id, product).then(() => {
          this.dialogRef.close();
        });
      } else {
        // Create new sector
        this.productService.create(product).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}

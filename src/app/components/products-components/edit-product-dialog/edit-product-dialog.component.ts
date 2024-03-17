import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/class/category.class';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { Product } from 'src/app/class/class';
import { Subject, takeUntil } from 'rxjs';
import { ImageUpdateModel } from 'src/app/class/ImageUpdateModel';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.css']
})
export class EditProductDialogComponent {
  productForm: FormGroup;
  categories: Category[] = [];
  private unsubscribe$ = new Subject<void>();
  displayedImages:  ImageUpdateModel[] = [];
  constructor(public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product, private fb: FormBuilder, private categoryService: CategoryService,
    private productService: ProductService) {
      // Map each URL to the new object structure
      this.displayedImages = data.imageUrls ? data.imageUrls.map(imageInfo => ({
        file: imageInfo.file, index: imageInfo.index, isNew: false 
      })) : [];
      // this.displayedImages = data.imageUrls
     
      
      this.productForm = this.fb.group({
          title: [data.title],
          price: [data.price],
          category: [data.categoryName],
          description: [data.description],
          isPopular: [data.isPopular],  
          image: [data.isPopular]  // This remains unchanged if your form still expects a string[]
      });
     
}

  ngOnInit(): void {
    this.getCatogories();
    console.log("this.displayedImages", this.displayedImages)
    
  }

  getCatogories(){
    this.categoryService.getCatogories().pipe(takeUntil(this.unsubscribe$))
    .subscribe((data: Category[]) => {
      this.categories = data;
    });;
  }
  selectedFiles: { file: File, index: number }[] = [];

  async onFilesSelected(event: any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      for(let i = 0; i < fileList.length; i++) {
        const newIndex = this.displayedImages.length > 0 ? 
          this.displayedImages[this.displayedImages.length - 1].index + 1 : 0;
        this.selectedFiles.push({ file: fileList[i], index: newIndex });
        const fileUrl = await this.readFileAsDataURL(fileList[i]);
        this.displayedImages.push({ file: fileUrl, index: newIndex, isNew: true });
      }
    }
  }


  removeDisplayedImage(index: number) {
    if(index >= 0 && index < this.displayedImages.length) {
      this.displayedImages.splice(index, 1);
    }
  }


async replaceDisplayedImage(event: any, index: number, imageInex: number) {
  const fileList: FileList = event.target.files;
  if (fileList.length > 0) {
      const fileUrl = await this.readFileAsDataURL(fileList[0]);
      this.displayedImages[index] = { file: fileUrl,  index: imageInex, isNew: true };
      this.selectedFiles[index] = { file: fileList[0], index: imageInex };
  }
}

readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
  });
}
triggerFileInput(event: any, index: number) {
  // Find the nearest file input and trigger its click event
  const fileInput = event.target.nextElementSibling;
  fileInput.click();
}


save() {
  // Check if there are images selected
  if (this.displayedImages.length === 0) {
    alert('Please add at least one image for the product.');
    return; // Stop the function execution if no images are added
  }

  const product = new Product(this.productForm.value);
  let selectedCategory = this.productForm.get('category')!.value;
  product.isPopular = this.productForm.get('isPopular')!.value;
  product.categoryName = selectedCategory.name;
  product.productId = this.data.productId;
  product.categoryId = this.data.categoryId;
  product.categoryName = selectedCategory;
  const formData = new FormData();
  formData.append("product", JSON.stringify(product));

  this.selectedFiles.forEach((newImageObj, index) => {
    formData.append("newImages", newImageObj.file);
    formData.append("newImageIndices", newImageObj.index.toString());
  });

  const existingImages = this.displayedImages
    .filter(img => !img.isNew)
    .map(img => ({
        file: img.file, // assuming your object's property for the image URL is named 'file'
        index: img.index
    }));

  formData.append("existingImages", JSON.stringify(existingImages));
  this.dialogRef.close(formData);
}

  
}



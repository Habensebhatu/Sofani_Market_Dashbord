import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Product } from 'src/app/class/class';
import { ProductService } from 'src/app/service/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/class/category.class';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy  {
  private unsubscribe$ = new Subject<void>();
  showPopularOnly = false;
  categories: Category[] | undefined;
  currentPage: number = 1;
  pageSize: number = 9;
  totalProductsOfCategory: number | undefined;
  selectedCategory: string | undefined;
  Math = Math;
  constructor(private router: Router, private productService: ProductService, public dialog: MatDialog, private categoryService: CategoryService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.resetComponent();
      }
    });
  }

  resetComponent(): void {
    // Reset state variabelen naar hun initiële waarden
    this.currentPage = 1;
    this.pageSize = 9;
    this.totalProductsOfCategory = undefined;
    this.selectedCategory = undefined;
    this.showPopularOnly = false;
  
    // Herlaad nodige data
    this.getProductsPageNumber();
    this.getCatogories();
  
    // Reset eventuele UI-gerelateerde variabelen indien nodig
    // Bijvoorbeeld: this.myFilter = defaultFilterValue;
  
    // Scroll terug naar de top van de pagina
    window.scrollTo(0, 0);
  }
  
  displayedColumns: string[] = [
    'product',
    'name',
    'category',
    'price',
    'action',
  ];
  productsSubscription: Subscription | undefined;
  dataSource: Product[] = [];
  
  ngOnInit(): void {
  this.getProductsPageNumber();
  this.getCatogories();
    
  }
  getProducts(){
    if(this.selectedCategory == undefined){
      this.productService.getProducts().pipe(takeUntil(this.unsubscribe$))
    .subscribe((data: Product[]) => {
      this.totalProductsOfCategory = data.length
    });
    }
   
}

getProductsPageNumber(){
  if(this.selectedCategory == undefined){
  this.productService.getProductsPageNumber(this.currentPage, this.pageSize).pipe(takeUntil(this.unsubscribe$))
  .subscribe((data: Product[]) => {
      this.dataSource = data
  });
  this.getProducts();
  window.scrollTo(0, 0);
}
}

getProductsBYCategory(){
  this.productService.getProductsBYCategory(this.selectedCategory!, this.currentPage, this.pageSize).pipe(takeUntil(this.unsubscribe$))
  .subscribe((data: Product[]) => {
      this.dataSource = data
  });
  this.getProductsAllBYCategory();
}

getProductsAllBYCategory(){
  this.productService.getProductsAllBYCategory(this.selectedCategory!).pipe(takeUntil(this.unsubscribe$))
  .subscribe((data: Product[]) => {
    this.totalProductsOfCategory = data.length
  });
  window.scrollTo(0, 0);
}

goToPage(page: number) {
  this.currentPage = page;
  if(this.selectedCategory == undefined){
    this.getProductsPageNumber();
  }
  else{
    this.getProductsBYCategory();
  }
}

get totalPages(): number {
  if (
    this.totalProductsOfCategory === undefined ||
    this.totalProductsOfCategory === 0
  ) {
    return 0;
  }
  return Math.ceil(this.totalProductsOfCategory / this.pageSize);
}

getCatogories(){
  this.categoryService.getCatogories().pipe(takeUntil(this.unsubscribe$))
  .subscribe((data: Category[]) => {
    this.categories = data;
  });;
  
}

OnshowCategoty(newCatagory: string): void {
  this.selectedCategory = newCatagory
  this.currentPage = 1;
  this.showPopularOnly = false
  this.getProductsBYCategory();
}

showPopularOnlyProducts(){
  this.productService.showPopularOnlyProducts().pipe(takeUntil(this.unsubscribe$))
  .subscribe((data: Product[]) => {
    const Popular = data.filter(product => product.isPopular)
    if(this.showPopularOnly){
      this.dataSource = Popular
    }
    if(!this.showPopularOnly){
    if(this.selectedCategory == undefined){
      this.getProductsPageNumber();
    }
    else{
      this.getProductsBYCategory();
    }
  
    }
  });
  
}
previousPage(){
  if (this.currentPage > 1) {
    this.currentPage--;
    if(this.selectedCategory == undefined){
      window.scrollTo(0, 0);
      this.getProductsPageNumber();
    }
    else{
      this.getProductsBYCategory();
    }
  }
}

nextPage(){
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    if(this.selectedCategory == undefined){
      window.scrollTo(0, 0);
      this.getProductsPageNumber();
    }
    else{
      this.getProductsBYCategory();
    }
  }
   
}

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '450px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProducts()
      
    });
  }

  openConfirmDialog(category: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(category);
      }
    });
  }

 

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent , {
      data: product,
      width: '450px',
    });
  
    dialogRef.afterClosed().subscribe(resultFormData => {
      if (resultFormData) {
        this.productService.updateProduct(resultFormData).pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: (next) => {
            if(this.selectedCategory == undefined){
              this.getProductsPageNumber();
            }
           else{
            this.getProductsBYCategory();
           }
          }
        });
      }
    });
  }

  remove(product: Product) {
    var productId =  product.categoryId 
    this.productService.removeProducts(product).pipe(takeUntil(this.unsubscribe$))
    .subscribe({
        next: (next) => {
          this.categoryService.getCategoryById(productId).pipe(takeUntil(this.unsubscribe$))
    .subscribe({
        next: (category) => {
         category.quantityProduct -= 1;
         this.categoryService.updateCategory(category).pipe(takeUntil(this.unsubscribe$))
         .subscribe({
             next: (next) => {
              if(this.selectedCategory == undefined){
                this.getProductsPageNumber();
              }
             else{
              this.getProductsBYCategory();
             }
             }
         });
         
        }
    });
        }
    });
   
    
  }

  
  ngOnDestroy(): void {
    // this.productService.productsUpdated.unsubscribe();
   
  }
}

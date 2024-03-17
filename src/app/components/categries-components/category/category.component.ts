import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddCategoryDialogComponent } from '../add-category-dialog/add-category-dialog.component';
import { Category } from 'src/app/class/category.class';
import { CategoryService } from 'src/app/service/category.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';
import { Subject, takeUntil } from 'rxjs';




@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router,  private categoryService: CategoryService ){

  }

  displayedColumns = ['CATEGORIES', 'QuantityProduct', 'action'];
  dataSource :Category[]  = [];
  showCard = false;
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    // this.dataSource = this.categoryService.getCatogories();
    this.getCatogories();
    this.categoryService.categoriesUpdated.subscribe(updatedCategories => {
      this.dataSource = updatedCategories;
      console.log("shoild work", this.dataSource)
      
    });
    console.log("hhshjshhj",  this.dataSource)
  }
  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent, {
      width: '450px',
      height: '350px',
      data: {name: '', }
    })

  }
  
  getCatogories(){
    this.categoryService.getCatogories().pipe(takeUntil(this.unsubscribe$))
    .subscribe((data: Category[]) => {
      this.dataSource = data;
      console.log("mmmmmmm",  this.dataSource)
      console.log("csscs", this.dataSource)
    });;
  }
  openConfirmDialog(category: Category): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.remove(category);
      }
    });
  }

  editCategory(category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: category,
      width: '450px',
      height: '350px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.findIndex(cat => cat.categoryId === category.categoryId);
        if (index !== -1) {
          this.dataSource[index] = { ...category, ...result };
          this.categoryService.updateCategory(this.dataSource[index]).pipe(takeUntil(this.unsubscribe$))
          .subscribe({
              next: (next) => {
                this.getCatogories();
      
              }
          });
        }
      }
    });
  }

  remove(category: Category) {
    console.log("eeeerrrrr",category)
    this.categoryService.removeCategory(category).pipe(takeUntil(this.unsubscribe$))
    .subscribe({
        next: (next) => {
          this.getCatogories();

        }
    });;
  }
}

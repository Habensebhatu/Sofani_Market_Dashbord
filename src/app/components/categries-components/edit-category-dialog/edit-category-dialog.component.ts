import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Category } from 'src/app/class/category.class';

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
})
export class EditCategoryDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        Name: [data.name, Validators.required],
      });
    }

  save() {
    
    this.dialogRef.close(this.form.value);
  }
}

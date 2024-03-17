import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AddCategoryDialogComponent } from './components/categries-components/add-category-dialog/add-category-dialog.component';
import { ProductsComponent } from './components/products-components/products/products.component';
import { AddProductComponent } from './components/products-components/add-product/add-product.component';
import { ProductService } from './service/product.service';
import { CategoryComponent } from './components/categries-components/category/category.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EditCategoryDialogComponent } from './components/categries-components/edit-category-dialog/edit-category-dialog.component';
import { EditProductDialogComponent } from './components/products-components/edit-product-dialog/edit-product-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import { LOCALE_ID } from '@angular/core';
import { OrderComponent } from './components/orders-components/order/order.component';
import { OrderDetailsComponent } from './components/orders-components/order-details/order-details.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomersComponent } from './components/customers/customers.component';


registerLocaleData(localeNl, 'nl');
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddCategoryDialogComponent,
    ProductsComponent,
    AddProductComponent,
    CategoryComponent,
    ConfirmDialogComponent,
    EditCategoryDialogComponent,
    EditProductDialogComponent,
    OrderComponent,
    LoginComponent,
    OrderDetailsComponent,
    SafeUrlPipe,
    CustomersComponent,
  ],
  exports: [
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule, 
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    MatTreeModule,
    MatSelectModule,
    HttpClientModule,
    MatCheckboxModule,
    
    
  ],
  providers: [ProductService, AuthGuard, DatePipe,  {provide: LOCALE_ID, useValue: 'nl' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

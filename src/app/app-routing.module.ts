import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products-components/products/products.component';
import { AddProductComponent } from './components/products-components/add-product/add-product.component';
import { CategoryComponent } from './components/categries-components/category/category.component';
import { OrderComponent } from './components/orders-components/order/order.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/login/login.component';
import { OrderDetailsComponent } from './components/orders-components/order-details/order-details.component';
import { CustomersComponent } from './components/customers/customers.component';
import { HeaderComponent } from './components/header/header.component';

// app-routing.module.ts
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Voeg deze regel toe
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HeaderComponent, // Gebruik HeaderComponent als layout voor child routes
    children: [
      { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
      { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
      { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'order', component: OrderComponent },
      { path: 'order-details/:id', component: OrderDetailsComponent },
      { path: 'customers', component: CustomersComponent },
     
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}



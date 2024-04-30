import { Injectable } from '@angular/core';
import { Product } from '../class/product';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  productsUpdated = new Subject<Product[]>();
  // private readonly apiUrl = 'https://localhost:7087/api/Product';
  private readonly apiUrl =
    'https://webshopfilimon.azurewebsites.net/api/Product';
  constructor(private http: HttpClient) { }

  private getConnectionStringName(): string {
    const adminString = localStorage.getItem('Admin');
    let connectionStringName = 'DefaultConnection'; 

    if (adminString) {
      const adminObject = JSON.parse(adminString);
      const username = adminObject.username;
      if (username === 'Aitmaten') {
        connectionStringName = 'Aitmaten';
      } else if (username === 'SofaniMarket') {
        connectionStringName = 'SofaniMarket';
      }
    }

    return connectionStringName;
  }


  setProducts(productData: FormData): Observable<Product> {
    const connectionStringName = this.getConnectionStringName();
    return this.http.post<Product>(`${this.apiUrl}/AddProduct`, productData, {
      params: new HttpParams().set('connectionString', connectionStringName)
    });
  }


  addProductToCache(product: Product): void {
    this.products.push(product);
    this.productsUpdated.next([...this.products]);
  }

  getProducts(): Observable<Product[]> {
    console.error('gygmgygm,gygmygmmfjfikj');
    const connectionStringName = this.getConnectionStringName();
    const params = new HttpParams().set('connectionString', connectionStringName);
    const observable = this.http.get<Product[]>(`${this.apiUrl}/AllProducts`, { params });
    observable.subscribe({
      next: (pruducts) => {
        this.products = pruducts;
        console.log("this.productsthis.products", this.products)
      },
      error: (error) => {
        console.error('Error getting categories: ', error);
      },
    });
    console.log("observableobservable", observable)
    return observable;
  }


  getProductsPageNumber(
    pageNumber: number,
    pageSize: number
  ): Observable<Product[]> {
    const connectionStringName = this.getConnectionStringName();
    const observable = this.http.get<Product[]>(
      `${this.apiUrl}/PageNumber/?pageNumber=${pageNumber}&pageSize=${pageSize}&connectionString=${connectionStringName}`
    );
    observable.subscribe({
      next: (pruducts) => {
        this.products = pruducts;
      },
      error: (error) => {
        console.error('Error getting categories: ', error);
      },
    });

    return observable;
  }


  getProductsBYCategory(
    category: string,
    pageNumber: number,
    pageSize: number
  ): Observable<Product[]> {
    const connectionStringName = this.getConnectionStringName();
    const observable = this.http.get<Product[]>(
      `${this.apiUrl}/ByCategory/${category}?pageNumber=${pageNumber}&pageSize=${pageSize}&connectionString=${connectionStringName}`
    );
    observable.subscribe({
      next: (pruducts) => {
        this.products = pruducts;
      },
      error: (error) => {
        console.error('Error getting categories: ', error);
      },
    });

    return observable;
  }

  getProductsAllBYCategory(category: string): Observable<Product[]> {
    const connectionStringName = this.getConnectionStringName();
    const observable = this.http.get<Product[]>(
      `${this.apiUrl}/GetProductsByCategory/${category}?connectionString=${connectionStringName}`
    );
    observable.subscribe({
      next: (pruducts) => {
        this.products = pruducts;
      },
      error: (error) => {
        console.error('Error getting categories: ', error);
      },
    });

    return observable;
  }

  showPopularOnlyProducts(): Observable<Product[]> {
    const connectionStringName = this.getConnectionStringName();
    const params = new HttpParams().set('connectionString', connectionStringName);
    const observable = this.http.get<Product[]>(`${this.apiUrl}/AllProducts`, { params });
    observable.subscribe({
      next: pruducts => {
        this.products = pruducts;
      },
      error: error => {
        console.error('Error getting categories: ', error);
      }
    });

    return observable;
  }

  getPopularProducts(): Product[] {
    return this.products.filter((product) => product.isPopular);
  }

  removeProducts(product: Product): Observable<Product> {
    const connectionStringName = this.getConnectionStringName();
    return this.http.delete<Product>(
      `${this.apiUrl}/RemoveProduct/${product.productId}?connectionString=${connectionStringName}`
    );
  }

  updateProduct(formData: FormData) {
    const connectionStringName = this.getConnectionStringName();
      const params = new HttpParams().set('connectionString', connectionStringName);
    return this.http.put<Product>(`${this.apiUrl}/UpdateProduct`, formData, { params });
  }
}

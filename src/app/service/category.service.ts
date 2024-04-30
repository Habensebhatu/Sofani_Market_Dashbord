import { Injectable } from '@angular/core';
import { Category } from '../class/category.class';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];
  categoriesUpdated = new Subject<Category[]>();
  //  private readonly apiUrl = 'https://localhost:7087/api/Category';
  private readonly apiUrl = 'https://webshopfilimon.azurewebsites.net/api/Category';

  constructor(private http: HttpClient) {

  }
  private getConnectionStringName(): string {
    // Haal het Admin object uit de lokale opslag
    const adminString = localStorage.getItem('Admin');
    let connectionStringName = 'DefaultConnection'; // Standaard fallback
  
    if (adminString) {
      const adminObject = JSON.parse(adminString);
      const username = adminObject.username;
  
      // Bepaal de connection string op basis van de username
      if (username === 'Aitmaten') {
        connectionStringName = 'Aitmaten';
      } else if (username === 'SofaniMarket') {
        connectionStringName = 'SofaniMarket';
      }
    }
  
    return connectionStringName;
  }

  setCatogories(category: Category): Observable<Category>{
    this.categories.push(category);
    this.categoriesUpdated.next([...this.categories]);
    const connectionStringName = this.getConnectionStringName();
    return this.http.post<Category>(`${this.apiUrl}/AddCategory`, category, {
      params: new HttpParams().set('connectionString', connectionStringName)
    });
    
  }


  getCatogories(): Observable<Category[]> {
    const connectionStringName = this.getConnectionStringName();
    const params = new HttpParams().set('connectionString', connectionStringName);
    console.log(" connectionStringName connectionStringName connectionStringName",  connectionStringName)
    const observable = this.http.get<Category[]>(`${this.apiUrl}/GetAllCategories`, { params });
  
    observable.subscribe({
      next: categories => {
        this.categories = categories;
        localStorage.setItem('categories', JSON.stringify(categories));
      },
      error: error => {
        console.error('Error getting categories: ', error);
      }
    });
  
    return observable;
  }

  getCategoryById(id: string): Observable<Category> {
    const connectionStringName = this.getConnectionStringName();
    return this.http.get<Category>(`${this.apiUrl}/GetCategoryById/${id}`, {
      params: new HttpParams().set('connectionString', connectionStringName)
    });
  }

  removeCategory(category: Category): Observable<Category> {
    const connectionStringName = this.getConnectionStringName();
    return this.http.delete<Category>(`${this.apiUrl}/DeleteCategory/${category.categoryId}`, {
      params: new HttpParams().set('connectionString', connectionStringName)
    });
  }

  updateCategory(category: Category): Observable<Category> {
    const connectionStringName = this.getConnectionStringName();
    return this.http.put<Category>(`${this.apiUrl}/UpdateCategory/${category.categoryId}`, category, {
      params: new HttpParams().set('connectionString', connectionStringName)
    });
  }
}

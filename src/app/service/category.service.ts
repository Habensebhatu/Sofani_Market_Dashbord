import { Injectable } from '@angular/core';
import { Category } from '../class/category.class';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [];
  categoriesUpdated = new Subject<Category[]>();
  // private readonly apiUrl = 'https://localhost:7087/api/Category';
  private readonly apiUrl = 'https://webshopfilimon.azurewebsites.net/api/Category';

  constructor(private http: HttpClient) {

  }


  setCatogories(category: Category): Observable<Category> {
    this.categories.push(category);
    // localStorage.setItem('categories', JSON.stringify(this.categories));
    this.categoriesUpdated.next([...this.categories]);
    return this.http.post<Category>(`${this.apiUrl}/AddCategory`, category);
    
  }


  getCatogories(): Observable<Category[]> {
    const observable = this.http.get<Category[]>(`${this.apiUrl}/GetAllCategories`);
    observable.subscribe({
      next: categories => {
        this.categories = categories;
        // localStorage.setItem('categories', JSON.stringify(categories));
      },
      error: error => {
        console.error('Error getting categories: ', error);
      }
    });

    return observable;
  }

  getCategoryById(id: string): Observable<Category> {
    console.log('gegete', id)
    return this.http.get<Category>(`${this.apiUrl}/GetCategoryById/${id}`);
  }

  removeCategory(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/DeleteCategory/${category.categoryId}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/UpdateCategory/${category.categoryId}`, category);
  }
}

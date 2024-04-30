import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../class/order.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private readonly apiUrl = 'https://localhost:7087/api/Order';
  private readonly baseApiUrl = 'https://webshopfilimon.azurewebsites.net/api';
 
  constructor(private http: HttpClient) { }

  private getConnectionStringName(): string {
    const adminString = localStorage.getItem('Admin');
    if (adminString) {
      const adminObject = JSON.parse(adminString);
      return adminObject.username === 'Aitmaten' ? 'Aitmaten' : 'SofaniMarket';
    }
    return 'DefaultConnection'; 
  }

  private getApiUrl(): string {
    const connectionStringName = this.getConnectionStringName();
    if (connectionStringName === 'Aitmaten') {
      return `${this.baseApiUrl}/OrderAit`;
    } else {
      return `${this.baseApiUrl}/Order`;
    }
  }

  getOrders(): Observable<Order[]> {
    const apiUrl = this.getApiUrl();
    const params = new HttpParams().set('connectionString', this.getConnectionStringName());
    const observable = this.http.get<Order[]>(`${apiUrl}/AllOrders`, { params });
    observable.subscribe({
      next: order => console.log(order),
      error: error => console.error('Error getting categories: ', error)
    });
    return observable;
  }

  getOrderById(id: string): Observable<Order> {
    const apiUrl = this.getApiUrl();
    const params = new HttpParams().set('connectionString', this.getConnectionStringName());
    return this.http.get<Order>(`${apiUrl}/GetOrderById/${id}`, { params });
  }
}

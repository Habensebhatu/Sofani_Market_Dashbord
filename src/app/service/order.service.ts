import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../class/order.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private readonly apiUrl = 'https://localhost:7087/api/Order';
  private readonly apiUrl = 'https://webshopfilimon.azurewebsites.net/api/Order';
  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]>{
    const observable = this.http.get<Order[]>(`${this.apiUrl}/AllOrders`);
     observable.subscribe({
       next: order => {
        console.log(order)
       },
       error: error => {
         console.error('Error getting categories: ', error);
       }
     });
   
     return observable;
     }

     getOrderById(id: string): Observable<Order> {
      console.log('order', id)
     return this.http.get<Order>(`${this.apiUrl}/GetOrderById/${id}`);
   }
}

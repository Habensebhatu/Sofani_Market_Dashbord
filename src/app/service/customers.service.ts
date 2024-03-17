import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../class/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  // private readonly apiUrl = 'https://localhost:7087/api/Customer';
  private readonly apiUrl = 'https://webshopfilimon.azurewebsites.net/api/Customer';
  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]>{
    const observable = this.http.get<Customer[]>(`${this.apiUrl}/GetCustomerByEmail`);
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

}

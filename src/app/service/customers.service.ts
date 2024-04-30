import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../class/customer';
import { Observable } from 'rxjs';
import { UserRegistration } from '../class/UserRegistration';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  //private readonly apiUrl = 'https://localhost:7087/api/Registration';
  private readonly apiUrl = 'https://webshopfilimon.azurewebsites.net/api/Registration';
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

     getAllUsers(): Observable<UserRegistration[]> {
      const connectionStringName = this.getConnectionStringName();
      const params = new HttpParams().set('connectionString', connectionStringName);
      const observable = this.http.get<UserRegistration[]>(`${this.apiUrl}/get-all-users`, { params });
      observable.subscribe({
        next: users => {
         console.log(users)
        },
        error: error => {
          console.error('Error getting categories: ', error);
        }
      });
       console.log("observableobservable", observable)
      return observable;
    }

    approveUser(userId: string): Observable<any> {
     const connectionStringName = this.getConnectionStringName();
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const params = new HttpParams().set('connectionString', connectionStringName);
      return this.http.post(`${this.apiUrl}/approve-user/${userId}`, {}, {
        params: params,
        headers: headers
      });
  }
  
  rejectUser(userId: string): Observable<any> {
    const connectionStringName = this.getConnectionStringName();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams().set('connectionString', connectionStringName);
    return this.http.post(`${this.apiUrl}/reject-user/${userId}`, {}, {
      params: params,
      headers: headers
    });
}

  

}

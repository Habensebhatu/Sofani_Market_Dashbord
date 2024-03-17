import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Customer } from 'src/app/class/customer';
import { CustomersService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent {
  displayedColumns: string[] = [
    'recipientName',
    'customerEmail',
    'phoneNumber',
    'city',
    'line1',
  ];
  dataSource: Customer[] = [];
  private unsubscribe$ = new Subject<void>();
  constructor(public customerService: CustomersService) {}

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.customerService
      .getCustomers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((customers: Customer[]) => {
        this.dataSource = customers;
      });
  }
}

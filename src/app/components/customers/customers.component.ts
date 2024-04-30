import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserRegistration } from 'src/app/class/UserRegistration';
import { CustomersService } from 'src/app/service/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'bedrijfsNaam', 'kvkNummer', 'name', 'phoneNumber', 'city', 'adres', 'isApprove', 'action', 
  ];
  dataSource: UserRegistration[] = [];
  private unsubscribe$ = new Subject<void>();
  isAitmaten: boolean = false;

  constructor(private customerService: CustomersService) {}

  ngOnInit(): void {
    this.determineUserType();
    this.getAllUsers();
  }

  private determineUserType() {
    const adminString = localStorage.getItem('Admin');
    if (adminString) {
      const adminObject = JSON.parse(adminString);
      this.isAitmaten = adminObject.username === 'SofaniMarket';
      if (this.isAitmaten) {
        this.displayedColumns = this.displayedColumns.filter(col => !['bedrijfsNaam', 'kvkNummer', 'isApprove'].includes(col));
      }
    }
  }

  getAllUsers() {
    this.customerService.getAllUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((customers: UserRegistration[]) => {
        this.dataSource = customers;
        console.log("this.dataSource", this.dataSource)
      });
  }

  approveUser(userId: string) {
    this.customerService.approveUser(userId).subscribe(() => {
      this.getAllUsers(); // Refresh list after approval
    });
  }

  rejectUser(userId: string) {
    this.customerService.rejectUser(userId).subscribe(() => {
      this.getAllUsers(); // Refresh list after rejection
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

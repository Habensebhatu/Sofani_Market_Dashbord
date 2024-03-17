import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Order } from 'src/app/class/order.class';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  customerColumns: string[] = ['orderDate', 'recipientName', 'customerEmail', 'phoneNumber'];
  orderItemColumns: string[] = ['photo', 'title', 'quantity', 'price', 'amountTotal'];
  orderId: string | null = null;
  dataSource: Order | undefined; 
  private unsubscribe$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.getOrderById();
  }

  getOrderById(){
    this.orderService.getOrderById(this.orderId!).pipe(takeUntil(this.unsubscribe$))
    .subscribe((orders: Order) => {
      console.log("order", orders)
      this.dataSource = orders;
    });;
  }
}

import { Product } from "./class";
import { OrderDetails } from "./orderDetails.class";


export class Order {
  orderId: number;
    customerId: number;
    products: Product[];
    orderDetails : OrderDetails[];
    dateOrdered: Date;
    status: string;
    total: number;
    recipientName: string;
    city : string;
    line1 : string;
    postalCode : string
    OrderNumber : number;

    constructor(orderInfo: any) {
      this.orderId = orderInfo.id;
      this.customerId = orderInfo.customerId;
      this.products = orderInfo.products;
      this.orderDetails = orderInfo.orderDetails;
      this.dateOrdered = new Date();
      this.status = orderInfo.status || 'pending';
      this.total = this.calculateTotal();
      this.recipientName = orderInfo.recipientName;
      this.city = orderInfo.city;
      this.line1 = orderInfo.line1;
      this.postalCode = orderInfo.postalCode;
      this.OrderNumber = orderInfo.OrderNumber;

    }
  
    calculateTotal(): number {
      return this.products.reduce((total, product) => total + product.price, 0);
    }
  }
  
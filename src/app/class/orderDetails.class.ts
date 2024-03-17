export class OrderDetails {
    orderDetailId : string;
    orderId : string;
    productId: string;
    title : string;
    quantity: string;
    amountTotal : string;
    imageUrl : string;
    price : string


    
    constructor(orderDetailsInfo: any) {
      this.orderDetailId = orderDetailsInfo.orderDetailId;
      this.orderId = orderDetailsInfo.orderId;
      this.productId = orderDetailsInfo.productId;
      this.title = orderDetailsInfo.title;
      this.quantity = orderDetailsInfo.quantity;
      this.amountTotal = orderDetailsInfo.amountTotal;
      this.imageUrl = orderDetailsInfo.imageUrl;
      this.price = orderDetailsInfo.price;
    }
  
    
  }
  
export interface Product {
    items: Array<CartItem>;
  }
  
  export interface CartItem {
    product: string;
    name: string;
    category: string;
    price: number;
    id: number;
  }

  export interface DialogData {
    name: string;
    quantity: string;
  }
  
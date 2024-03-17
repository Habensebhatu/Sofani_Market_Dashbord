import { v4 as uuidv4 } from 'uuid';

export class Category {
      public categoryId: string;
      public name: string;
      public quantityProduct : number;
     
      constructor(data: any) {
        this.categoryId = uuidv4();
        this.name = data.Name;
        this.quantityProduct = data.quantityProduct
       
    }

  }
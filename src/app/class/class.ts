import { v4 as uuidv4 } from 'uuid';
import { ImageUpdateModel } from './ImageUpdateModel';

export class Product {
      public productId: string;
      public categoryId: string;
      public title: string;
      public price: number;
      public categoryName: string;
      public description: string;
      public isPopular: boolean;
      public kilo: number;
      public imageUrls: ImageUpdateModel[];


      constructor(data: any) {
        this.productId = uuidv4();
        this.categoryId = data.categoryId
        this.title = data.title;
        this.price = data.price;
        this.kilo = data.kilo
        this.categoryName = data.categoryName;
        this.description = data.description;
        this.imageUrls = data.imageUrls;
        this.isPopular = data.isPopular;

    }

  }
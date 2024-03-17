export class Customer{
  public customerId: number;
  public customerEmail: string;
  public recipientName: string;
  public line1: string;
  public city: string;
  public postalCode: string;
  public phoneNumber: string;

  constructor(data: any){
    this.customerId = data.customerId; 
    this.customerEmail = data.recipientName;
    this.recipientName = data.recipientName;
    this.line1 = data.line1;
    this.city = data.city;
    this.postalCode = data.postalCode;
    this.phoneNumber = data.phoneNumber;
  }
}
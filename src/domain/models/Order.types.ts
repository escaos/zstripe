export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

export interface IPaymentData {
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCVC: string;
}

export type IOrder = {
  product: IProduct;
  paymentInfo?: IPaymentData;
  completed: boolean;
};

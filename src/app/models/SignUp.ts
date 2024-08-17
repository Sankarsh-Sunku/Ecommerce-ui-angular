export interface signUp {
  name: string;
  password: string;
  email: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface AddProduct {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id : number;
  quantity : undefined | number
  productId : undefined | number
}

export interface Cart {
  name: string;
  price: number;
  category: string;
  color: string;
  image: string;
  description: string;
  id : number | undefined;
  quantity : undefined | number;
  userId :  number;
  productId : undefined | number;
}

export interface PriceSummary{
  price:number,
  tax:number,
  delivery:number,
  total:number
}

export interface order {
  email:string,
  address:string,
  contact:string,
  totalPrice:number,
  userId:string,
  id : undefined | number
}
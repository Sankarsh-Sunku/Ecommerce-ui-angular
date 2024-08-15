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
  price: string;
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
  price: string;
  category: string;
  color: string;
  image: string;
  description: string;
  id : number | undefined;
  quantity : undefined | number;
  userId :  number;
  productId : undefined | number;
}
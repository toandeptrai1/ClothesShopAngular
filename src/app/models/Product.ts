import { Category } from "./Category";

export class Product{
  productId?:string;
  categoryId?:number=1;
  created_at?: string
  delete_at?: string
  desc?: string
  image?: string
  category?:Category
  price?: number
  productName?: string
  page:number=0
  size:number=8
  update_at?: string
  quantity?:number
  totalPrice?:number
}

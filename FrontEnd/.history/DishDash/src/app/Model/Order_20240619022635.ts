import { CartDish } from "./CartDish"
import { address } from "./address"
export class Order {
    orderId:string
    restaurantId:string
    customerId:string
    customerName:string
    customerEmail:string
    timeStamp:string
    totalPrice:number
    discount:number
    billingPrice:number
    totalItems:number
    customerAddress:address
    paymentMethod:string
    cartItems:CartDish[]
}
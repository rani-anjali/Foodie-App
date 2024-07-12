import { address } from "./address"
import { favdishes } from "./favdishes"
import { favrestaurant } from "./favrestaurant"
export class customer {
    customerId:string
    customerName?: string
    customerEmail?: string
    customerPassword?: string
    customerProfilePic?: string
    customerPhone?: string
    customerAddress?:address[]
    customerFavRestaurants?:string[]
    customerFavDishes?:favdishes[]
    customerOrderHistory?:string[] 
}

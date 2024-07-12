import { address } from "./address"
import { favdishes } from "./favdishes"
import { favrestaurant } from "./favrestaurant"

export class customer {
    customerName: string
    customerEmail: string
    customerPassword: string
    customerProfilePic?: string
    customerPhone: number
    customerAddress?:address[]
    customerFavRestaurants?:string[]
    customerFavDishes?:favdishes[]
    customerCartId?:string
}

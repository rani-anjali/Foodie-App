import { dish } from "./dish"

export class restaurant {
    resId:string
    resName:string
    resAddress:string
    resCity:string
    resRating:string
    resDescription:string
    resCategories?:string[]
    resImages?:string[]
    resCuisines?:string[]
    resMenu?:dish[]
}
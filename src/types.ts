export interface Products {
    id: number
    title: string
    price: number,
    image: string,
    description?: string
}

export type CartItem = {
    id: number
    quantity: number
}

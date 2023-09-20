import { ReactNode, createContext } from "react"
import { ShoppingCartCanvas } from "../components/ShoppingCartCanvas"
import { CartItem, Products } from "../types"
import { useShoppingCartAdapter } from "../hooks/useShoppingCartAdapter"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    products: Products[]
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
}

export const ShoppingCartContext = createContext<ShoppingCartContext | undefined>(undefined)

export const ShoppingCartProvider = (props: ShoppingCartProviderProps) => {
    const { children } = props
    const { products, getItemQuantity, increaseCartQuantity, isCartOpen, decreaseCartQuantity, removeFromCart, closeCart, cartQuantity, openCart, cartItems } = useShoppingCartAdapter()

    return (
        <ShoppingCartContext.Provider value={{products, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart}}>
            { children }
            <ShoppingCartCanvas isCartOpen={isCartOpen} />
        </ShoppingCartContext.Provider>
    )
}

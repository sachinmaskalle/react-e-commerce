import { ReactNode, createContext, useState } from "react"
import { ShoppingCartCanvas } from "../components/ShoppingCartCanvas"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useFetchProducts } from "../hooks/useFetchProducts"
import { CartItem, Products } from "../types"

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

    const { products } = useFetchProducts()
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false)    
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])

    const getItemQuantity = (id: number) => cartItems.find(item => item.id === id)?.quantity || 0

    const increaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return {...item , quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity == 1) {
                return currItems.filter((item) => item.id !== id)
            } else {
                return currItems.map((item) => {
                    if (item.id === id) {
                        return {...item , quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currItems => currItems.filter(item => item.id !== id))
    }

    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    return (
        <ShoppingCartContext.Provider value={{products, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart,cartItems, cartQuantity, openCart, closeCart}}>
            { children }
            <ShoppingCartCanvas isCartOpen={isCartOpen} />
        </ShoppingCartContext.Provider>
    )
}

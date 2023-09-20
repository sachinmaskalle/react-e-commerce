import { useState } from "react"
import { CartItem } from "../types"
import { useLocalStorage } from "./useLocalStorage"
import { useFetchProducts } from "./useFetchProducts"

export const useShoppingCartAdapter = () => {
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

    return {
        cartItems,
        cartQuantity,
        closeCart,
        decreaseCartQuantity,
        getItemQuantity,
        increaseCartQuantity,
        isCartOpen,
        openCart,
        products,
        removeFromCart,
    }
}

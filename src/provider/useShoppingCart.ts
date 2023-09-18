import { useContext } from "react"
import { ShoppingCartContext } from './ShoppingCartContext'

export const useShoppingCart = () => {
    const context = useContext(ShoppingCartContext)
    if (context === undefined) {
        throw new Error('useShoppingCart must be used within a ShoppingCartProvider')
    }

    return context 
}

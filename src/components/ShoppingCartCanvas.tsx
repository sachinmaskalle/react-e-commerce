import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../provider/useShoppingCart"
import { CartItem } from "./CartItem"
import { currencyFormatter } from "../utils/currencyFormatter"

type ShoppingCartCanvasProps = {
    isCartOpen: boolean
}

export const ShoppingCartCanvas = (props: ShoppingCartCanvasProps) => {
    const { isCartOpen } = props 

    const { closeCart, cartItems, products } = useShoppingCart()

    const totalCurrencyValue = cartItems.reduce((total, cartItem) => {
        const item = products.find(item => item.id === cartItem.id)
        return total + (item?.price || 0) * cartItem.quantity
    }, 0)
    
    return (
        <Offcanvas show={isCartOpen} placement='end' onHide={closeCart}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {
                        cartItems.map((item) => (
                            <CartItem key={item.id} {...item} />
                        ))
                    }
                    <div className='ms-auto fw-bold fs-5'>
                        Total { currencyFormatter(totalCurrencyValue) }
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

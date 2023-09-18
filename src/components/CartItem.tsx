import { useShoppingCart } from "../provider/useShoppingCart"
import { Button, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils/currencyFormatter"

type CartItemProps = {
    id: number
    quantity: number
} 

export const CartItem = (props : CartItemProps) => {
    const { id, quantity } = props
    const { removeFromCart, products } = useShoppingCart()
    const item = products.find(item => item.id === id)
    if (item == null) return null

    return(
        <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
            <img src={item?.image} style={{width: '125px', height: '75px', objectFit: 'cover'}} />
            <div className='me-auto'>
                <div>
                    {item?.title} {" "}
                    {quantity > 1 && (
                        <span className='text-muted' style={{fontSize: '0.65rem'}}>x{quantity}</span>
                    )} 
                </div>
                <div className='text-muted' style={{fontSize: '0.75rem'}}>
                    { item && currencyFormatter(item?.price) }
                </div>
            </div>
            <div>   
                { item && currencyFormatter(item?.price * quantity) }
                </div>
                <Button size='sm' variant='outline-danger' onClick={() => item && removeFromCart(item?.id)}>&times;</Button>
        </Stack>
    )
}

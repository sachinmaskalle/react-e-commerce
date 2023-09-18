import { Card } from 'react-bootstrap'
import { currencyFormatter } from '../utils/currencyFormatter'
import { AddToCardButton } from './AddToCardButton'
import { CartOperations } from './CartOperations'
import { useShoppingCart } from '../provider/useShoppingCart'

type ProductsProps = {
    id: number
    title: string
    price: number,
    image: string,
    description?: string
}

export const StoreItem = (props: ProductsProps) => {
    const { id, title, image, price } = props
    
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const quantity = getItemQuantity(id)
    
    return (
        <Card className='h-100'>
            <Card.Img variant='top' src={image} height='200px' style={{objectFit: 'cover'}} />
            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className='fs-5 text-truncate'>{title}</span>
                    <span className='ms-2 text-muted'>{currencyFormatter(price)}</span>
                </Card.Title>
                <div className='mt-auto'>
                    {
                        quantity === 0 ? 
                        <AddToCardButton id={id} increaseCartQuantity={increaseCartQuantity} />
                        : <CartOperations id={id} quantity={quantity} increaseCartQuantity={increaseCartQuantity} decreaseCartQuantity={decreaseCartQuantity} removeFromCart={removeFromCart} />
                    }
                </div>
            </Card.Body>
        </Card>
    )
}

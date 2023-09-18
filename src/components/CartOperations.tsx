import { Button, Stack } from "react-bootstrap"

type CartOperationsProps = {
    id: number
    quantity: number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
}

export const CartOperations = (props: CartOperationsProps) => {
    const { id, decreaseCartQuantity, increaseCartQuantity, removeFromCart, quantity } = props
    
    return (
        <Stack>
            <div className='d-flex align-items-center flex-column' style={{ gap: '0.5rem' }}>
                <div className='d-flex align-items-center justify-content-center' style={{ gap: '0.5rem' }}>
                    <Button onClick={() => decreaseCartQuantity(id)}>
                        -
                    </Button>
                    <div>
                        <span className='fs-3 '>{quantity}</span>
                        {" "} in cart
                    </div>
                    <Button onClick={() => increaseCartQuantity(id)}>
                        +
                    </Button>
                </div>
                <Button variant='danger' size='sm' onClick={() => removeFromCart(id)}>Remove</Button>
            </div>
        </Stack>
    )
}

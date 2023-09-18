import { Button } from 'react-bootstrap'

type AddToCardButtonProps = {
    id: number
    increaseCartQuantity: (id: number) => void
}

export const AddToCardButton = (props: AddToCardButtonProps) => {
    const { id, increaseCartQuantity } = props

    return (
        <Button className='w-100' onClick={() => increaseCartQuantity(id)}>+ Add to cart</Button>
    )
}

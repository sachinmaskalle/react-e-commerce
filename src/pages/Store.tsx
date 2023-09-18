import {Col, Row, Spinner } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'
import { useFetchProducts } from '../hooks/useFetchProducts'

export const Store = () => {
    const { loading, products } = useFetchProducts()
    
    return (
        <>
        <h1>Store</h1>
        {loading ? <Spinner animation="border" /> : null}
        <Row className='g-3' xs={1} md={2} lg={3} xl={4}>
            {
                products.map((product) => (
                    <Col key={product.id}>
                        <StoreItem {...product} />
                    </Col>
                ))
            }
        </Row>
        </>
    )
}
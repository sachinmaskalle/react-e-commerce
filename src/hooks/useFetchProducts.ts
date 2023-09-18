import { useState, useEffect } from "react"
import { Products } from "../types"


export const useFetchProducts = () => {
    const [products, setProducts] = useState<Products[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        
        let active = true
        
        const getProducts = async () => {
            try {
                setLoading(true)
                const API_URL = `https://fakestoreapi.com/products`
                const response = await fetch(API_URL, {
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    })
                })
                if (!active) {
                    return
                }
                if (response.ok) {
                    const products = await response.json()
                    setProducts(products)
                }
            } catch(err) {
                console.log(`Error fetching products`, err)
            } finally {
                setLoading(false)
            }
        }

        getProducts()

        return () => {
            active = false
        }

    }, [])

    return {
        loading,
        products
    }
}
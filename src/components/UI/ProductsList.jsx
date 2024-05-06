import React from 'react'
import ProductCard from './ProductCard'

const ProductsList = ({ data }) => {
    return (
        <>
            {data?.map((item) => (
                <ProductCard key={item.id} item={item} />
            ))}
        </>
    )
}

export default ProductsList
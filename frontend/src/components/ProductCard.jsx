import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
      <p>Stock: {product.stock}</p>
      <p>Expiration Date: {product.expiration_date}</p>
      <p>Prescription Required: {product.prescription_required ? 'Yes' : 'No'}</p>
    </div>
  )
}

export default ProductCard
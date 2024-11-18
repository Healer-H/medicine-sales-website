import React, { useState } from 'react'

const ProductForm = ({ onSubmit, initialData = {} }) => {
  const [product, setProduct] = useState(initialData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(product)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={product.name || ''} onChange={handleChange} placeholder="Product Name" required />
      <input type="number" name="price" value={product.price || ''} onChange={handleChange} placeholder="Price" required />
      <textarea name="description" value={product.description || ''} onChange={handleChange} placeholder="Description" required />
      <input type="number" name="stock" value={product.stock || ''} onChange={handleChange} placeholder="Stock" required />
      <input type="date" name="expiration_date" value={product.expiration_date || ''} onChange={handleChange} placeholder="Expiration Date" required />
      <label>
        Prescription Required:
        <input type="checkbox" name="prescription_required" checked={product.prescription_required || false} onChange={(e) => setProduct({ ...product, prescription_required: e.target.checked })} />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ProductForm
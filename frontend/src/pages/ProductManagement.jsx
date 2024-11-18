import React from 'react'
import Sidebar from '../components/Sidebar'
import ProductList from '../components/ProductList'
import ProductForm from '../components/ProductForm'

const ProductManagement = () => {
  const handleAddProduct = (product) => {
    // Call API to add product
  }

  return (
    <div className="product-management">
      <Sidebar />
      <main>
        <h2>Product Management</h2>
        <ProductForm onSubmit={handleAddProduct} />
        <ProductList />
      </main>
    </div>
  )
}

export default ProductManagement
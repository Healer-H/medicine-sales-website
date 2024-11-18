import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/products">Products</Link></li>
      </ul>
    </aside>
  )
}

export default Sidebar
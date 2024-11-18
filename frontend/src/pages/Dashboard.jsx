import React from 'react'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>
        <h2>Dashboard</h2>
        {/* Add dashboard content here */}
      </main>
    </div>
  )
}

export default Dashboard
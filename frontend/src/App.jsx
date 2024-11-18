import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import ProductManagement from './pages/ProductManagement'
import Login from './pages/Login'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/products" component={ProductManagement} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Login} />
      </Switch>
    </Router>
  )
}

export default App
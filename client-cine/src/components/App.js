import React from "react";
import { Route, BrowserRouter ,Switch } from 'react-router-dom'
import Home  from './home/Home.js'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        
        <Route path="/" component={Home} />
  </Switch>
  </BrowserRouter>
    // <Router>
    //   <Routes>
    //       <Route path='/' element={Home} />
    //   </Routes>
    // </Router>
  )
}

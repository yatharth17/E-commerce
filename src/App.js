import React from 'react';
import './App.css'
import HomePage from './pages/homepage/homepage'
import ShopePage from './pages/shop/shoppage'
import {Route, Switch} from 'react-router-dom'


function App() {
  return (
    <div >
     <Switch>
     <Route exact path='/' component={HomePage}/>
     <Route path='/shop' component={ShopePage}/> 
     </Switch>
    
     
    </div>
  );
}

export default App;

import React from 'react';
import './App.css'
import HomePage from './pages/homepage/homepage'
import ShopePage from './pages/shop/shoppage'
import {Route, Switch} from 'react-router-dom'
import Header from './components/header/header'
import SignInSignUp from './pages/sign-insign-up/sign-in-sign-up'
function App() {
  return (
    <div >
    <Header/>
     <Switch>
     <Route exact path='/' component={HomePage}/>
     <Route path='/shop' component={ShopePage}/> 
     <Route path='/signin' component={SignInSignUp}/>
     </Switch>
    
     
    </div>
  );
}

export default App;

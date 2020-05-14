import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import ShopePage from "./pages/shop/shoppage";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header/header";
import SignInSignUp from "./pages/sign-insign-up/sign-in-sign-up";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import {connect} from 'react-redux'
import {setCurrentUser} from './redux/user/user-action'
class App extends React.Component {
  

  unSubscribeFromAuth = null;
  componentDidMount() {
    const {setCurrentUser}=this.props
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser( {
              id: snapShot.id,
              ...snapShot.data()
            }
          );

        });
      }

      setCurrentUser(userAuth );
    });
  }
  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopePage} />
          <Route path="/signin" component={SignInSignUp} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(App);

import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import ShopePage from "./pages/shop/shoppage";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header/header";
import SignInSignUp from "./pages/sign-insign-up/sign-in-sign-up";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
class App extends React.Component {
  state = {
    currentUser: null
  };

  unSubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }
  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopePage} />
          <Route path="/signin" component={SignInSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/index";
import Navbar from "./components/navbar/index";
import Login from "./pages/login/index";
import CheckOut from "./pages/checkout/index";
import Profile from "./pages/profile/index";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/checkout" exact component={CheckOut} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

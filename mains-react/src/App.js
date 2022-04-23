import Home from "./pages/home/Home";
import Login from "./components/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./components/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/profile/:username">
          <Profile />
        </Route>
        </Switch>
    </Router>

  )
};

export default App;

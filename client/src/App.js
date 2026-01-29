import React, { useEffect, createContext, useReducer, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reducer, initialState } from './reducers/userReducer';
import './App.css';

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import BloodBank from './components/screens/BloodBank';
import Dashboard from './components/screens/Dashboard';
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Profile from './components/screens/Profile';

toast.configure();
export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {dispatch} = useContext(UserContext)

  useEffect(() => {
      try {
        const user = JSON.parse(localStorage.getItem("user"))
        if(user) {
          dispatch({ type:"USER", payload: user });
        } else {
          if(window.location.pathname !== "/" && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
            history.push("/login");
          }
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
        localStorage.removeItem("isAdmin");
        if(window.location.pathname !== "/" && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
          history.push("/login");
        }
      }
  }, [dispatch, history])

  return (
    <Switch>  
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/bank" component={BloodBank} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
    </Switch>
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <Router>
        <Navbar />
        <Routing />
        <Footer />
      </Router>
    </UserContext.Provider>
  );
}

export default App;

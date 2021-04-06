import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, NavLink, Redirect, Switch, useHistory } from 'react-router-dom';

import { Container, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Feed from "./components/Feed";
import AppBar from "./components/AppBar";
import UserPage from "./components/UserPage";
import PostDetails from "./components/PostDetails"

import UserContext from './UserContext';


import authService from './services/authService';
import EditPage from './components/EditPage';

function App() {
  const useStyles = makeStyles((theme) => ({
    appBar: {
      marginBottom: "110px"
    },
  }));

  const [user, setUser] = useState(null);
  //const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  });


  const logIn = (userObject) => {
    setUser(userObject);
    //setLoggedIn(true);
  }

  const logOut = async () => {
    setUser(null);
    localStorage.clear();
    await authService.logOut();
    history.push('/login');
    //setLoggedIn(false);
  }

  const isLoggedIn = user;
  return (
    <UserContext.Provider value={{ user, logIn, logOut, }}>
      <BrowserRouter>
        <Switch>
          <Route path="/profile/:id" exact component={UserPage} />
          <Route path="/profile/:id/saved" component={UserPage} />
          <Route path="/profile/:id/edit" exact component={EditPage} />

          <Route path="/" exact>
            {isLoggedIn ? (
              <Grid container direction={'column'} alignItems={'center'}>
                <Feed />
              </Grid>
            ) : (<Redirect to="/login" />)}

          </Route>


          <Route path="/register">
            {isLoggedIn ? (<Redirect to="/" />) : (<SignUp />)}
          </Route>

          <Route path="/login">
            {isLoggedIn ? (<Redirect to="/" />) : (<SignIn />)}
          </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

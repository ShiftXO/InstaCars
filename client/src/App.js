import React, { useState } from 'react';
import { Route, Link, NavLink, Redirect, Switch } from 'react-router-dom';

import { Container, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Card from "./components/Card";
import AppBar from "./components/AppBar";
import TransitionsModal from "./components/Create";
import ImageUploadCard from "./components/ImageUpload";
import UserPage from "./components/UserPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const useStyles = makeStyles((theme) => ({
    appBar: {
      marginBottom: "110px"
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Route path="/" exact>
        <Grid className={classes.appBar}>
          <AppBar />
        </Grid>
        <Grid container direction={'column'} alignItems={'center'}>
          <Card />
        </Grid>
      </Route>
      <Route path="/profile" exact component={UserPage} />
      <Route path="/login" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />
    </>
  );
}

export default App;

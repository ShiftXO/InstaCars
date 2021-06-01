import React, { useContext } from 'react'
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom'


import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Card from "./components/Card";
import AppBar from "./components/AppBar";
import TransitionsModal from "./components/Create";
import ImageUploadCard from "./components/ImageUpload";
import UserPage from "./components/UserPage";
import PostDetails from "./components/PostDetails"
import Chat from './components/Chat';

import UserContext from './UserContext';

const Navigation = () => {
    const context = useContext(UserContext)
    const loggedIn = context.user && context.user.loggedIn

    const useStyles = makeStyles((theme) => ({
        appBar: {
            marginBottom: "110px"
        },
    }));

    const classes = useStyles();
    return (
        <Switch>

            <Route path="/" exact>
                {loggedIn ? (
                    <>
                        <Grid className={classes.appBar}>
                            <AppBar />
                        </Grid>
                        <Grid container direction={'column'} alignItems={'center'}>
                            <Card />
                        </Grid>
                    </>
                ) : (<Redirect to="/login" />)}
            </Route>

            <Route path="/p/:id" >
                <Grid className={classes.appBar}>
                    <AppBar />
                </Grid>
                <PostDetails />
            </Route>
            <Route path="/profile/:id" component={UserPage} ></Route>

            <Route path="/inbox" exact >
                <Grid className={classes.appBar}>
                    <AppBar />
                </Grid>
                <Chat />
            </Route>

            <Route path="/register">
                {loggedIn ? (<Redirect to="/" />) : (<SignUp />)}
            </Route>
            <Route path="/login">
                {loggedIn ? (<Redirect to="/" />) : (<SignIn />)}
            </Route>
        </Switch>
    )
}

export default Navigation
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import io from "socket.io-client";
import { Button } from '@material-ui/core';

import UserContext from '.././UserContext';

import authService from '../services/authService';

let socket;
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    },
    right: {
        backgroundColor: '#3f50b5',
        borderRadius: 25,
        float: 'right',
        padding: '10px 10px'
    },
    left: {
        borderRadius: 25,
        border: '1px solid gray',
        float: 'left',
        padding: '10px 10px'
    }
});

const Messages = ({ message, own }) => {
    const classes = useStyles();
    const context = useContext(UserContext);
    console.log(message);

    return (
        <>
            {own ? (
                <ListItem key={message._id} >
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography className={classes.right} align="right" >{message.text}</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            ) : (
                <ListItem key={message._id}>
                    <Grid container spacing={1}>
                        <Avatar alt="Remy Sharp" src="https://content.api.news/v3/images/bin/a6923adbc7bece73803221613f410782" />
                        <Grid item xs={10}>
                            <Typography className={classes.left} align="right" >{message.text}</Typography>
                        </Grid>
                    </Grid>
                </ListItem>
            )}

        </>
    );
}

export default Messages;
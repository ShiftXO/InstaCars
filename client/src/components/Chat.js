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
import Messages from './Messages';

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

const Chat = () => {
    const classes = useStyles();
    const context = useContext(UserContext);

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    const [users, setUsers] = useState([]);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    function receivedMessage(message) {
        setMessages(oldMsgs => [...oldMsgs, message]);
    }

    useEffect(async () => {
        socket = io('http://localhost:5000');
        console.log('here');

        // let data = await authService.getUsers();
        // if (data.result) {
        //     console.log(data.result);
        //     setUsers(data.result)
        // }
    }, []);

    useEffect(() => {
        //setName(context.user._id)
        //socket.emit('register', context.user.username);
        // socket.on("user connected", (user) => {
        //     console.log(user);
        //     //initReactiveProperties(user);
        //     setUsers(oldState => [...oldState, users])
        // });

        socket.on("users", (users) => {
            users.forEach((user) => {
                user.self = user.userID === socket.id;
                //initReactiveProperties(user);
            });

            setUsers(oldState => [...oldState, users])
        });

        // socket.emit('join', { name, room }, (msg) => {
        //     console.log(msg);
        //     setMessages(msg);
        // });

        // socket.on('message', (msg) => {
        //     console.log('return msg', msg.message);
        //     console.log('msgesss', messages);
        //     receivedMessage(msg.message)
        // });
        socket.on("private message", ({ content, from }) => {
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                if (user.userID === from) {
                    messages.push({
                        content,
                        fromSelf: false,
                    });
                    // if (user !== this.selectedUser) {
                    //   user.hasNewMessages = true;
                    // }
                    break;
                }
            }
        });

        socket.on("connect", () => {
            users.forEach((user) => {
                if (user.self) {
                    user.connected = true;
                }
            });
        });

        socket.on("disconnect", () => {
            users.forEach((user) => {
                if (user.self) {
                    user.connected = false;
                }
            });
        });

        return () => {
            socket.emit('leave');
            socket.off();
        }
    }, [room]);

    //refresh after getting message
    //  useEffect(() => {
    //      socket.on('message', (msg) => {
    //          console.log('return msg', msg.message);
    //          receivedMessage(msg.message)
    //      });
    //  }, [messages]);

    useEffect(() => {
        socket.on('users', (users) => {
            users.forEach((user) => {
                user.self = user.userID === socket.id;
                //initReactiveProperties(user);
            });
        });
    }, [users]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(message);
        socket.emit("private message", {
            message,
            to: name,
        });
        // this.selectedUser.messages.push({
        //     content,
        //     fromSelf: true,
        //   });
        // socket.emit('message', { message }, () => {
        //     setMessages([...messages, message]);
        // });
        setMessage('')
    }

    const changeChat = (userId) => {
        setRoom(userId);
        console.log(userId);
    }
    console.log(users);
    return (
        <div>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt={context.user.username} src={context.user.profileImage} />
                            </ListItemIcon>
                            <ListItemText primary={context.user.username}></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        <>
                            {users.map(x =>
                                <ListItem button key={x._id} onClick={() => changeChat(x._id)}>
                                    <ListItemIcon>
                                        <Avatar alt={x.username} src="https://content.api.news/v3/images/bin/a6923adbc7bece73803221613f410782" />
                                    </ListItemIcon>
                                    <ListItemText primary={x.username}></ListItemText>
                                    <ListItemText secondary={x.connected ? 'online' : 'offline'} align="right"></ListItemText>
                                </ListItem>
                            )}
                        </>

                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        <Messages messages={messages} />
                    </List>
                    <Divider />
                    <form onSubmit={(e) => sendMessage(e)}>
                        <Grid container style={{ padding: '20px' }}>
                            <Grid item xs={11}>
                                <TextField id="outlined-basic-email" label="Type Something" fullWidth value={message} onChange={(e) => setMessage(e.target.value)} />
                            </Grid>
                            <Grid xs={1} align="right">
                                <Fab onClick={(e) => sendMessage(e)} color="primary" aria-label="add"><SendIcon /></Fab>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;
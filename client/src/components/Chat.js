import React, { useState, useEffect, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import io from "socket.io-client";
import UserContext from '.././UserContext';
import Conversation from '../components/Conversation';

import authService from '../services/authService';
import Messages from './Messages';
import chatService from '../services/chatService';
import { Typography } from '@material-ui/core';

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

    const { user } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();

    // useEffect(async () => {
    //     let res = await chatService.getConversationsTwo();
    //     console.log(res);
    // }, []);

    useEffect(async () => {
        socket.current = io("localhost:5000");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
            setMessages(msg => [...msg, arrivalMessage]);
            console.log(messages);
        }
        // arrivalMessage &&
        //     currentChat?.members.includes(arrivalMessage.sender) &&
        //     setMessages(arr => [...arr, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                user.following.filter((f) => users.some((u) => u.userId === f))
            );
        });

    }, [user]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await chatService.getConversations(user._id);
                setConversations(res);
                console.log(conversations);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, []);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await chatService.getMessages(currentChat?._id);
                console.log(res);
                setMessages(res);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage == '') return
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
        });

        try {
            const res = await chatService.sendMessage(message);
            setMessages([...messages, res]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
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
                        {conversations.map(x => {
                            return <div onClick={() => setCurrentChat(x)}>
                                <Conversation conversation={x} currentUser={user} />
                            </div>
                        })}
                    </List>
                </Grid>
                <Grid item xs={9}>
                    {currentChat != null ? (
                        <>
                            <List className={classes.messageArea}>
                                {messages.map((m) => (
                                    <div ref={scrollRef}>
                                        <Messages message={m} own={m.sender === user._id} />
                                    </div>
                                ))}
                            </List>
                            <Divider />
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <Grid container style={{ padding: '20px' }}>
                                    <Grid item xs={11}>
                                        <TextField label="Type Something" fullWidth value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                                    </Grid>
                                    <Grid xs={1} align="right">
                                        <Fab color="primary" aria-label="add" onClick={(e) => handleSubmit(e)}><SendIcon /></Fab>
                                    </Grid>
                                </Grid>
                            </form>
                        </>
                    ) : (
                        <Grid style={{ fontSize: 25 }}>
                            <span>Select Chat</span>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
}

export default Chat;
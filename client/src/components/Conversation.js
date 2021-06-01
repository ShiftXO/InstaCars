import React, { useEffect, useState, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import authService from '../services/authService';


export default function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try {
                const res = await authService.getUser(friendId);
                console.log(res);
                setUser(res.result);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation]);

    return (
        <ListItem button key={user?._id}>
            <ListItemIcon>
                <Avatar alt={user?.username} src={user?.profileImage} />
            </ListItemIcon>
            <ListItemText primary={user?.username}></ListItemText>
            <ListItemText secondary={user?.connected ? 'online' : 'offline'} align="right"></ListItemText>
        </ListItem>
    );
}
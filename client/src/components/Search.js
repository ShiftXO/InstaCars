import React, { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Input, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

import authService from '../services/authService';

const useStyles = makeStyles({
    list: {
        position: 'absolute',
        zIndex: 10,
        color: 'black',
        backgroundColor: 'white',
        border: '1px solid grey',
        borderBottomLeftRadius: '5px',
        borderBottomRightRadius: '5px',
        width: '193px',
    },
    listItem: {
        '&:hover': {
            backgroundColor: '#f5f5f5'
        },
    }
});

const useClickOutside = (handler) => {
    let domNode = useRef();

    useEffect(() => {
        let maybeHandler = (event) => {
            if (!domNode.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", maybeHandler);

        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    });

    return domNode;
};

export default function CountrySelect(props) {
    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [options, setOptions] = useState(null);
    const [isShowed, setIsShowed] = useState(false);

    useEffect(async () => {
        if (search.length > 0) {

            const data = await authService.usersSearch(search);
            console.log('data', data.result);
            setOptions(data.result);
        } else {
            setOptions(null);
        }
    }, [search]);

    const showList = () => {
        setOptions(null);
        setIsShowed(true);
    }

    const searchNode = useClickOutside(() => {
        setIsShowed(false);
    });

    return (
        <Grid ref={searchNode}>
            <TextField placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} onFocus={showList} />
            {isShowed && options && <List className={classes.list}>
                {options.map(x =>
                    <Link key={x._id} to={`/profile/${x._id}`}>
                        <ListItem className={classes.listItem}>
                            <ListItemAvatar>
                                <Avatar alt={x.username} src={x.profileImage} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={x.username}
                            />
                        </ListItem>
                    </Link>
                )}
            </List>}
        </Grid>
    );
}

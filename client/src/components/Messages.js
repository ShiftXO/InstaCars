import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import UserContext from '.././UserContext';

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
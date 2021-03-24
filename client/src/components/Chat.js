import React from 'react';
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

    return (
        <div>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://specials-images.forbesimg.com/imageserve/1144022172/960x0.jpg?fit=scale" />
                            </ListItemIcon>
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://content.api.news/v3/images/bin/a6923adbc7bece73803221613f410782" />
                            </ListItemIcon>
                            <ListItemText primary="Greta">Greta</ListItemText>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                        <ListItem button key="Alice">
                            <ListItemIcon>
                                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Alice">Alice</ListItemText>
                        </ListItem>
                        <ListItem button key="CindyBaker">
                            <ListItemIcon>
                                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={9}>
                    <List className={classes.messageArea}>
                        <ListItem key="1" >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className={classes.right} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container spacing={1}>
                                <Avatar alt="Remy Sharp" src="https://content.api.news/v3/images/bin/a6923adbc7bece73803221613f410782" />
                                <Grid item xs={10}>
                                    <Typography className={classes.left} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className={classes.right} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="1" >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className={classes.right} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container spacing={1}>
                                <Avatar alt="Remy Sharp" src="https://content.api.news/v3/images/bin/a6923adbc7bece73803221613f410782" />
                                <Grid item xs={10}>
                                    <Typography className={classes.left} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className={classes.right} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="1" >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className={classes.right} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container spacing={1}>
                                <Avatar alt="Remy Sharp" src="https://content.api.news/v3/images/bin/a6923adbc7bece73803221613f410782" />
                                <Grid item xs={10}>
                                    <Typography className={classes.left} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className={classes.right} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="1" >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className={classes.right} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container spacing={1}>
                                <Avatar alt="Remy Sharp" src="https://content.api.news/v3/images/bin/a6923adbc7bece73803221613f410782" />
                                <Grid item xs={10}>
                                    <Typography className={classes.left} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className={classes.right} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="1" >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className={classes.right} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container spacing={1}>
                                <Avatar alt="Remy Sharp" src="https://content.api.news/v3/images/bin/a6923adbc7bece73803221613f410782" />
                                <Grid item xs={10}>
                                    <Typography className={classes.left} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography className={classes.right} variant="button" align="right" primary="Hey man, What's up ?">XDDXDX</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>

                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                        </Grid>
                        <Grid xs={1} align="right">
                            <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;
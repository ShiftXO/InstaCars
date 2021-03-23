import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import { Grid, Input, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';

import NewComment from "./NewComment";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        //maxWidth: '940px'
    },
    head: {
        borderBottom: '1px solid #D3D3D3',
        paddingBottom: '10px'
    },
    red: {
        backgroundColor: 'red'
    },
    image: {
        objectFit: 'cover',
        maxWidth: '600px'
    },
    avatar: {
        paddingLeft: '10px'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TransitionsModal(props) {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <Grid className={classes.root} container spacing={2} >

                            <Grid item >
                                <img className={classes.image} src="https://mediapool.bmwgroup.com/cache/P9/202010/P90403620/P90403620-bmw-m4-competition-x-kith-10-2020-2002px.jpg" />
                            </Grid>

                            <Grid item  >
                                <Grid container justify="flex-start" className={classes.head} >
                                    <Grid item xs={2} >
                                        <Avatar src="https://mediapool.bmwgroup.com/cache/P9/202010/P90403620/P90403620-bmw-m4-competition-x-kith-10-2020-2002px.jpg" />
                                    </Grid>

                                    <Grid item >
                                        <Typography variant="h5" >aaaaa</Typography>
                                    </Grid>

                                    {/* <Grid item xs={1}>
                                        <IconButton aria-label="delete" className={classes.margin} >
                                            <MoreHorizIcon />
                                        </IconButton>
                                    </Grid> */}
                                </Grid>

                                <Grid container  >
                                    <NewComment />
                                </Grid>

                                <Grid container >
                                    <Grid>
                                        <IconButton>
                                            <FavoriteBorderRoundedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <ChatBubbleOutlineRoundedIcon />
                                        </IconButton>
                                        <IconButton>
                                            <BookmarkBorderRoundedIcon />
                                        </IconButton>
                                    </Grid>
                                    <TextField
                                        id="standard-basic"
                                        label="Add a comment..."
                                        fullWidth
                                        InputProps={{ endAdornment: <Button color="primary" type="submit">Post</Button> }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

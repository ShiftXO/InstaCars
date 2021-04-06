import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Divider, Avatar, Grid, Paper, Typography, IconButton } from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { makeStyles } from '@material-ui/core/styles';
import postService from "../services/postService";

const useStyles = makeStyles((theme) => ({
    link: {
        color: 'black',
        fontWeight: "600",
        underline: "none",
        display: 'inline',
        marginRight: "10px",
        cursor: 'pointer',
    },
    comment: {
        //maxHeight: 25
    }
}));

export default function Comments(props) {
    const classes = useStyles();
    const [comments, setComments] = useState(props.comments);

    //console.log(props);
    //console.log(comments);
    return (
        <>
            {comments.map(x =>
                <Grid key={x._id} container style={{ padding: "0px 20px" }}>
                    <Grid container item alignItems="center" wrap="nowrap" spacing={2}>
                        <Grid container item>
                            <Grid item  >
                                <Link to={`/profile/${x.user._id}`} className={classes.link}>{x.user.username}</Link>
                            </Grid>
                            <Grid item >
                                <Typography className={classes.comment} variant="inherit">{x.content}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item >
                            <IconButton style={{ float: "right" }}>
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
}
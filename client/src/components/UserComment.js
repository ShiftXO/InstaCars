import React from "react";
import { Divider, Avatar, Grid, Paper, Link, Typography, IconButton } from "@material-ui/core";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { makeStyles } from '@material-ui/core/styles';

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
        maxHeight: 25
    }
}));

export default function Comment() {
    const classes = useStyles();

    return (
        <div className={classes.comment}>
            <Grid container style={{ padding: "0px 20px" }}>
                <Grid container item alignItems="center" wrap="nowrap" spacing={2}>
                    <Grid container item>
                        <Grid item  >
                            <Link href="xd.com" className={classes.link}>Michel Michel</Link>
                        </Grid>
                        <Grid item >
                            <Typography className={classes.comment} variant="inherit">OMEGALUL</Typography>
                        </Grid>
                    </Grid>
                    <Grid item  >
                        <IconButton style={{ float: "right" }}>
                            <FavoriteBorderIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
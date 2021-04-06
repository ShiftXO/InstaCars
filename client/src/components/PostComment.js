import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { Grid, Typography, IconButton } from "@material-ui/core";
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';

import { makeStyles } from '@material-ui/core/styles';
import postService from "../services/postService";
import UserContext from "../UserContext";

const useStyles = makeStyles((theme) => ({
    link: {
        color: 'black',
        fontWeight: "600",
        underline: "none",
        display: 'inline',
        marginRight: "10px",
        cursor: 'pointer',
    }
}));

export default function Comments(props) {
    const classes = useStyles();
    const context = useContext(UserContext);
    const [comment, setComment] = useState(props.comment)
    const [likesCount, setLikesCount] = useState(comment.usersLiked.length)
    const liked = comment.usersLiked.some(x => x == context.user._id);
    const [isLiked, setIsLiked] = useState(liked);

    const handleLike = async (_id) => {
        console.log(comment);
        let userId = context.user._id;

        let data = {
            _id: _id,
            userId: userId,
            postId: comment.post
        };

        isLiked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
        setIsLiked(!isLiked);
        let res = await postService.likeComment(data);
    }

    return (
        <Grid key={comment._id} container style={{ padding: "0px 20px" }}>
            <Grid container item alignItems="center" wrap="nowrap" spacing={2}>
                <Grid container item>
                    <Grid item  >
                        <Link to={`/profile/${comment.user._id}`} className={classes.link}>{comment.user.username}</Link>
                    </Grid>
                    <Grid item >
                        <Typography className={classes.comment} variant="inherit">{comment.content}</Typography>
                    </Grid>
                </Grid>
                <Grid item >
                    <IconButton style={{ float: "right" }} onClick={() => handleLike(comment._id)}>
                        {isLiked ? (
                            <>
                                <Typography>{likesCount}</Typography>
                                <FavoriteRoundedIcon color="secondary" />
                            </>
                        ) : (
                            <>
                                <Typography>{likesCount}</Typography>
                                <FavoriteBorderRoundedIcon />
                            </>
                        )}
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
}
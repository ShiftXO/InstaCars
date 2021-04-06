import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button, Container, Grid } from '@material-ui/core';
import UserContext from '../UserContext';

import PostComments from './PostComment';
import Comment from "./Comment";

import postService from "../services/postService";
import PrimarySearchAppBar from './AppBar';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 640,
        maxWidth: 640,
        marginBottom: "30px"
    },
    cardHeader: {
        padding: '10px 10px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[900],
    },
}));

export default function RecipeReviewCard(props) {
    const context = useContext(UserContext)
    const classes = useStyles();

    const [post, setPost] = useState(props.post)
    const postComments = props.post.comments;
    const [comments, setComments] = useState(postComments);
    console.log(comments);

    const [likes, setLikes] = useState(props.post.usersLiked);
    const [likesCount, setLikesCount] = useState(likes.length);
    const isLiked = likes.some(x => x == context.user._id);
    const [liked, setLiked] = useState(isLiked);

    const isSaved = post.usersSaved.some(x => x == context.user._id);
    const [saved, setSaved] = useState(isSaved);

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLike = async (_id) => {
        let userId = context.user._id;

        let data = {
            _id: _id,
            userId: userId
        };

        liked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
        setLiked(!liked)
        let res = await postService.like(data);
    };

    const handleSave = async (_id) => {
        let userId = context.user._id;
        let data = {
            _id: _id,
            userId: userId
        };
        let res = await postService.save(data);
        setSaved(!saved);
        console.log(res);
    };

    return (
        <Card className={classes.root} >
            <CardHeader className={classes.cardHeader}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={post.owner.profileImage} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Link to={`/profile/${post.owner._id}`}>
                        <Typography color="inherit">{post.owner.username}</Typography>
                    </Link>
                }
            />

            <CardMedia className={classes.media} image={post.imageUrl} onDoubleClick={() => handleLike(post._id)} />

            <CardContent>
                <Typography component="span">{post.owner.username} </Typography>
                <Typography variant="body2" color="textSecondary" component="span">{post.description}</Typography>
                <Typography>Show more</Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="like" color="secondary" onClick={() => handleLike(post._id)} >
                    <Typography>{likesCount > 0 ? likesCount : 0}</Typography>
                    {liked ? (<FavoriteIcon />) : (<FavoriteBorderRoundedIcon />)}
                </IconButton>
                <IconButton aria-label="save" onClick={() => handleSave(post._id)}>
                    {saved ? (<BookmarkRoundedIcon />) : (<BookmarkBorderRoundedIcon />)}
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                </IconButton>
            </CardActions>


            {comments.map(x =>
                <PostComments key={x._id} comment={x} />
            )}

            <Typography style={{ color: "gray", margin: "10px 20px" }}>{props.createdAt}</Typography>
            <Comment postId={post._id} post={post} comments={comments} setComments={setComments} />
        </Card>
    );
}
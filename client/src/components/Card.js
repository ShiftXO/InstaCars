import React, { useEffect, useState } from 'react';
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
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Bookmark from '@material-ui/icons/Bookmark';
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button, Container, Grid } from '@material-ui/core';

import UserComment from './UserComment';
import Comment from "./Comment";

import postService from "../services/postService";

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

export default function RecipeReviewCard() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLike = async (_id) => {
        let userId = localStorage.getItem('_id');
        let data = {
            _id: _id,
            userId: userId
        };
        let res = await postService.like(data);
        console.log(res);
    };

    const handleSave = async (_id) => {
        let userId = localStorage.getItem('_id');
        let data = {
            _id: _id,
            userId: userId
        };
        let res = await postService.save(data);
        console.log(res);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await postService.getAll();
            console.log(data);
            if (data.result) {
                setPosts(data.result);
            }
        };

        fetchData();
    }, [])

    return (
        <div>
            {posts.map(x =>
                <Card key={x._id} className={classes.root} >
                    <CardHeader className={classes.cardHeader}
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar} src={x.imageUrl} />
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={
                            <Link to={`/profile/${x.owner._id}`}>
                                <Typography color="inherit">{x.owner.username}</Typography>
                            </Link>
                        }
                    />

                    <CardMedia className={classes.media} image={x.imageUrl} onDoubleClick={() => handleLike(x._id)} />

                    <CardContent>
                        <Typography component="span">{x.owner.username} </Typography>
                        <Typography variant="body2" color="textSecondary" component="span">{x.description}</Typography>
                        <Typography>Show more</Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        <IconButton aria-label="like" color="secondary" onClick={() => handleLike(x._id)} >
                            <Typography>{x.usersLiked.length > 0 ? x.usersLiked.length : ''}</Typography>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="send">
                            <SendIcon />
                        </IconButton>
                        <IconButton aria-label="save" onClick={() => handleSave(x._id)}>
                            <BookmarkBorder />
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
                    <UserComment></UserComment>
                    <UserComment></UserComment>

                    <Typography style={{ color: "gray", margin: "10px 20px" }}>1 min</Typography>
                    <Comment></Comment>
                </Card>
            )
            }
        </div >
    );
}
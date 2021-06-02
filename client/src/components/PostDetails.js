import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import IconButton from '@material-ui/core/IconButton';
import { Grid, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderRoundedIcon from '@material-ui/icons/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import CommentSection from "./CommentSection";
import Comment from './Comment';
import postService from '../services/postService';
import UserContext from '../UserContext';

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
    const context = useContext(UserContext);

    const [currentPost, setcurrentPost] = useState(undefined);
    const [comments, setComments] = useState([]);
    const [isOwner, setIsOwner] = useState(false);

    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchData = async ({ post } = props) => {
            if (!post) return

            const data = await postService.getPost(post);
            console.log('data', data);
            setcurrentPost(data.result);
            setComments(data.result.comments);
            setLikesCount(data.result.usersLiked.length);
            setIsOwner(data.result.owner._id == context.user._id ? true : false);
            const isSaved = data.result.usersSaved.some(x => x == context.user._id);
            const isLiked = data.result.usersLiked.some(x => x == context.user._id);
            setSaved(isSaved);
            setLiked(isLiked);
        };

        fetchData();
    }, [])

    const handleLike = async (_id) => {
        let userId = context.user._id;

        let data = {
            _id: _id,
            userId: userId
        };

        liked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
        setLiked(!liked)
        // let res = await postService.like(data);
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

    const handleDelete = async (id) => {
        console.log(id);
        let res = await postService.deletePost(id);
        console.log('delete', res);
        setAnchorEl(null);
    }

    return (
        <div>
            {currentPost ? (
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

                                <Grid item>
                                    <img className={classes.image} src={currentPost.imageUrl} />
                                </Grid>

                                <Grid item>
                                    <Grid container justify="flex-start" className={classes.head} >
                                        <Grid item xs={2} >
                                            <Avatar src={currentPost.owner.profileImage} />
                                        </Grid>

                                        <Grid item xs={9}>
                                            <Typography variant="h5" >{currentPost.owner.username}</Typography>
                                        </Grid>
                                        {isOwner ? (
                                            <Grid item xs={1}>
                                                <IconButton aria-label="delete" className={classes.margin} onClick={handleClick} >
                                                    <MoreHorizIcon />
                                                </IconButton>
                                                <Menu
                                                    id="long-menu"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={open}
                                                    onClose={handleClose}
                                                    PaperProps={{
                                                        style: {
                                                            maxHeight: ITEM_HEIGHT * 4.5,
                                                            width: '20ch',
                                                        },
                                                    }}
                                                >
                                                    <MenuItem onClick={() => handleDelete(currentPost._id)}>
                                                        Delete
                                                </MenuItem>
                                                </Menu>
                                            </Grid>
                                        ) : ('')}
                                    </Grid>

                                    <Grid container>
                                        <CommentSection ownerComment={currentPost} comments={comments} />
                                    </Grid>

                                    <Grid container >
                                        <Grid>
                                            <IconButton aria-label="like" color="secondary" onClick={() => handleLike(currentPost._id)} >
                                                <Typography>{likesCount}</Typography>
                                                {liked ? (<FavoriteIcon />) : (<FavoriteBorderRoundedIcon />)}
                                            </IconButton>

                                            <IconButton aria-label="save" onClick={() => handleSave(currentPost._id)}>
                                                {saved ? (<BookmarkRoundedIcon />) : (<BookmarkBorderRoundedIcon />)}
                                            </IconButton>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Comment postId={currentPost._id} post={currentPost} comments={comments} setComments={setComments} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </Fade>
                </Modal>
            ) : ''}
        </div>
    );
}

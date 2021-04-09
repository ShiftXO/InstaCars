import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as MLink } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserContext from '../UserContext';
import postService from '../services/postService';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '300px',
        maxHeight: '400px',
        overflowY: 'scroll',
    },
}));


export default function Comment(props) {
    const classes = useStyles();
    const context = useContext(UserContext);
    const [comment, setComment] = useState(props.comment);
    const [likesCount, setLikesCount] = useState(props.comment.usersLiked.length);
    const [isLiked, setIsLiked] = useState(false);

    const createdAt = moment(comment.createdAt).fromNow();

    useEffect(() => {
        const like = comment.usersLiked.some(x => x == context.user._id);
        setIsLiked(like);
    }, [])

    const handleLike = async (_id) => {
        let userId = context.user._id;

        let data = {
            _id: _id,
            userId: userId
        };

        isLiked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
        setIsLiked(!isLiked)
        let res = await postService.likeComment(data);
        console.log(res);
    };

    return (
        <ListItem key={comment._id}>
            <ListItemAvatar>
                <Avatar alt={comment.user.username} src={comment.user.profileImage} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Link to={`/profile/${comment.user._id}`}>{comment.user.username} </Link>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {comment.content}
                        </Typography>
                    </React.Fragment>
                }
                secondary={
                    (createdAt) +
                    (likesCount == 0 ? `` : likesCount > 1 ? ` ${likesCount} likes` : ` ${likesCount}  like`)
                }
            />
            <ListItemSecondaryAction>
                <IconButton color="secondary" edge="end" onClick={() => handleLike(comment._id)} >
                    {isLiked ? (
                        <FavoriteRoundedIcon />
                    ) : (
                        <FavoriteBorderRoundedIcon />
                    )}
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

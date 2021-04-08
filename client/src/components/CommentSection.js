import React from 'react';
import { Link } from 'react-router-dom';
import { Link as MLink } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

import Comment from './CommentSectionComment'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '300px',
        maxHeight: '400px',
        overflowY: 'scroll',
    },
}));


export default function InteractiveList(props) {
    const classes = useStyles();
    const history = useHistory();
    const createdAt = moment(props.ownerComment.createdAt).fromNow();
    console.log('id', props);

    return (
        <Grid item xs={12} className={classes.root}>
            <List >
                <ListItem >
                    <ListItemAvatar>
                        <Avatar alt={props.ownerComment.username} src={props.ownerComment.owner.profileImage} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <MLink >{props.ownerComment.username} </MLink>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {props.ownerComment.description}
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            createdAt
                        }
                    />
                </ListItem>
                {props.comments.map(x =>
                    <Comment key={x._id} comment={x} />
                )}
            </List>
        </Grid>
    );
}

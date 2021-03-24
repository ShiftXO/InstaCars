import React from 'react';
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
import { Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '300px',
        overflowY: 'scroll',
    },
}));


export default function InteractiveList() {
    const classes = useStyles();
    return (
        <Grid xs={12} className={classes.root}>
            <List >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Link>user </Link>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    Ali ConnorsAli
                            </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            '10h 12likes'
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <FavoriteBorderRoundedIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Grid>
    );
}

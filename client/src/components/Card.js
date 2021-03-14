import React from 'react';
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
import { Button, Container, Grid, Link } from '@material-ui/core';

import UserComment from './UserComment';
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
    root: {
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
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader className={classes.cardHeader}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                     </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Link href="google.com">
                        <Typography color="inherit">user profile</Typography>
                    </Link>
                }
            />
            <CardMedia
                className={classes.media}
                image="https://www.focus2move.com/wp-content/uploads/2020/01/Tesla-Roadster-2020-1024-03.jpg"
            />

            <CardContent>
                <Typography component="span">Username </Typography>
                <Typography variant="body2" color="textSecondary" component="span">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                </Typography>
                <Typography>Show more</Typography>
            </CardContent>

            <CardActions disableSpacing>
                <IconButton aria-label="like">
                    <Typography variant="p">12</Typography>
                    <FavoriteBorderIcon />
                </IconButton>
                <IconButton aria-label="send">
                    <SendIcon />
                </IconButton>
                <IconButton aria-label="save">
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

    );
}
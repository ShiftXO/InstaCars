import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Avatar from '@material-ui/core/Avatar';
import { Divider, Grid, GridList, GridListTile } from '@material-ui/core';
import authService from '../services/authService';
import { Link } from 'react-router-dom';
import Modal from './PostDetails';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "red",
        flexGrow: 1,
    },
    gridList: {
        height: "auto"
    },
    list: {
        width: 293,
        height: 293
    },
    imageContainer: {
        width: "935px",
        margin: "auto"
    },
    image: {
        "&:hover": {
            opacity: 0.55
        },
        width: 295,
        height: 295,
        objectFit: "cover",
        cursor: "pointer"
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
}));

export default function UserPage(props) {
    const classes = useStyles();
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState('');

    const handleOpen = (id) => {
        setPost(id)
        setOpen(true);
    };

    const handleClose = () => {
        setPost('');
        setOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await authService.getUser(props.match.params.id);
            if (data.result) {
                setUser(data.result);
            }
        };

        fetchData();
    }, [])

    return (
        <>
            {user != null ?
                (
                    <>
                        <Grid container direction="row" justify="center" >
                            <Grid item xs={2} >
                                <Avatar alt="Remy Sharp" className={classes.large} src={user.profileImage} />
                            </Grid>
                            <Grid container item xs={4} justify="center" >
                                <Grid container spacing={3} direction="row" justify="flex-start" >
                                    <Grid item>
                                        <Typography variant="h5" className={classes.username}>{user.username}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" size="small" color="primary">follow</Button>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4}>
                                    <Grid item>
                                        <b>{user.posts.length} </b>
                                        <span> posts</span>
                                    </Grid>
                                    <Grid item>
                                        <b>{user.followers.length} </b>
                                        <span>followers</span>
                                    </Grid>
                                    <Grid item>
                                        <b>{user.following.length} </b>
                                        <span>following</span>
                                    </Grid>
                                </Grid>
                                <Grid container item>
                                    <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider component="hr" variant="fullWidth" />

                        <Grid className={classes.imageContainer} container >
                            {user.posts.map(post =>
                                < Grid key={post._id} item xs={4} >
                                    {/* <Link to={`/p/${post._id}`}> */}
                                    < img className={classes.image} src={post.imageUrl} onClick={() => handleOpen(post._id)} />
                                    {/* </Link> */}
                                </Grid>
                            )}

                            {post ? (
                                <Modal handleOpen={handleOpen} handleClose={handleClose} open={open} post={post} />
                            ) : ''}
                        </Grid>
                    </>
                ) : ('')
            }
        </>
    );
}
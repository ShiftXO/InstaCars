import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Avatar from '@material-ui/core/Avatar';
import { Divider, Grid, GridList, GridListTile } from '@material-ui/core';
import authService from '../services/authService';
import { Link } from 'react-router-dom';
import Modal from './PostDetails';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import UserContext from '../UserContext';
import Posts from './Posts';
import PrimarySearchAppBar from './AppBar';

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
    divider: {
        margin: '15px 0px 15px',
    },
    tabs: {
        marginBottom: '15px'
    }
}));

export default function UserPage({ ...props }) {
    const classes = useStyles();
    const context = useContext(UserContext)
    const history = useHistory();
    console.log(props);

    const [user, setUser] = useState(null);
    const [page, setPage] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);

    const [isOwner, setIsOwner] = useState(false);

    const tabNameToIndex = {
        0: "",
        1: "saved"
    };

    const indexToTabName = {
        posts: 0,
        saved: 1
    };

    const handleChange = (event, newValue) => {
        //console.log(context);
        history.push(`/profile/${context.user._id}/${tabNameToIndex[newValue]}`);
        setPage(newValue);
    };

    const handleFollow = async (id) => {
        let users = {
            userId: context.user._id,
            followedUserId: id,
        }
        let res = await authService.followUser(users);
        console.log(res);
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await authService.getUser(props.match.params.id);
            if (data.result) {
                setUser(data.result);
                console.log('titlte', props);
                setIsOwner(data.result._id == context.user._id);
                document.title = data.result.username;
                if (data.result.followers.some(x => x == context.user._id)) {
                    setIsFollowed(true);
                }
            }
        };

        fetchData();
    }, []);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        let userId = context.user._id;
        //let res = await authService.deleteUser(userId);
        context.logOut();
    }

    const handleEdit = async () => {
        let userId = context.user._id;
        history.push(`/profile/${userId}/edit`);
        //let res = await authService.deleteUser(userId);
        //context.logOut();
    }

    return (
        <>
            {user != null ?
                (
                    <>
                        <PrimarySearchAppBar />
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
                                        {!isOwner ? (
                                            <Button variant="contained" size="small" color="primary" onClick={() => handleFollow(user._id)}>{isFollowed ? 'Unfollow' : 'Follow'}</Button>
                                        ) : (
                                            <>
                                                <IconButton
                                                    aria-label="more"
                                                    aria-controls="long-menu"
                                                    aria-haspopup="true"
                                                    onClick={handleClick}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
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
                                                    <MenuItem onClick={handleEdit}>Edit profile</MenuItem>
                                                    <MenuItem onClick={handleDelete}>Delete profile</MenuItem>
                                                </Menu>
                                            </>
                                        )}
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
                        <Divider component="hr" variant="fullWidth" className={classes.divider} />
                        {isOwner ?
                            (
                                <>
                                    <Tabs
                                        className={classes.tabs}
                                        value={page}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        onChange={handleChange}
                                        centered
                                    >
                                        <Tab label="Posts" />
                                        <Tab label="Saved" />
                                    </Tabs>

                                    {page === 0 && <Posts user={user} page={page} />}
                                    {page === 1 && <Posts user={user} page={page} />}
                                </>
                            ) : (<Posts user={user} page={page} />)
                        }
                    </>
                ) : ('')
            }
        </>
    );
}
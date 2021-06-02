import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import authService from '../services/authService';
import Modal from './PostDetails';

import UserContext from '../UserContext';

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

export default function Posts(props) {
    const classes = useStyles();
    const context = useContext(UserContext)
    console.log(props);
    const [open, setOpen] = useState(false);
    const [post, setPost] = useState('');
    const [posts, setPosts] = useState([]);

    const handleOpen = (id) => {
        setPost(id)
        setOpen(true);
        //history.push(`/p/${id}`)
    };

    const handleClose = () => {
        setPost('');
        setOpen(false);
        //history.back()
    };

    useEffect(() => {
        const fetchData = async () => {
            if (props.page == 0) {
                const data = await authService.getUser(props.user._id);
                setPosts(data.result.posts);
            } else {
                const data = await authService.getUserSavedPosts(props.user._id);
                console.log('aidee fsfsfs', data);
                setPosts(data.result.savedPosts);
            }
        };

        fetchData();
    }, [])

    return (
        <Grid className={classes.imageContainer} container >

            <>
                {posts.map(post =>
                    < Grid key={post._id} item xs={4} >
                        {/* <Link to={`/p/${post._id}`}> */}
                        < img className={classes.image} src={post.imageUrl} onClick={() => handleOpen(post._id)} />
                        {/* </Link> */}
                    </Grid>
                )}
            </>


            {post ? (
                <Modal handleOpen={handleOpen} handleClose={handleClose} open={open} post={post} />
            ) : ''}
        </Grid>
    );
}
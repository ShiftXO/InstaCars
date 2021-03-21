import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import postService from '../services/postService';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

export default function BasicTextFields(props) {
    const classes = useStyles();
    const [comment, setComment] = useState('');

    const userId = localStorage.getItem('_id');
    const handleSubmit = async (e) => {
        e.preventDefault();
        let postId = props.postId
        let data = { postId, comment, userId }
        console.log(data);
        let res = await postService.addComment(data);
        console.log(res);
        setComment('');
    };

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
            <TextField
                id="standard-basic"
                label="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                InputProps={{ endAdornment: <Button color="primary" type="submit">Post</Button> }}
            />
        </form>
    );
}
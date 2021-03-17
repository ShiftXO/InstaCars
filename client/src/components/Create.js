import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

import ImageUploadCard from "./ImageUpload";

import postService from "../services/postService";

import config from "../config/index";

const useStyles = makeStyles((theme) => ({
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
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    spiner: {
        alignContent: 'center',
        alignItems: 'center',
        display: 'inline-block'
    },
    successIcon: {
        color: "green"
    }
}));

export default function TransitionsModal(props) {
    const classes = useStyles();

    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmited, setIsSubmited] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmited(true);
        setLoading(true);

        let userId = localStorage.getItem('_id');

        let cloudinaryData = new FormData();
        cloudinaryData.append('upload_preset', config.CLAUDINARY_PRESET_NAME);
        cloudinaryData.append('file', file);

        let cloudinaryResponse = await fetch(`${config.CLAUDINARY_API_URL}/image/upload`, {
            method: 'POST',
            body: cloudinaryData,
        });

        let image = await cloudinaryResponse.json();
        let imageUrl = image.secure_url;

        console.log(description, imageUrl, userId);
        let result = await postService.create({ description, imageUrl, userId });
        console.log(result);
        if (imageUrl && result._id) {
            setLoading(false);
            setIsSubmited(false);
            props.handleClose();
        }
    }

    return (
        <div>
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
                        <form onSubmit={(e) => handleSubmit(e)} >
                            <div className={classes.root}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    autoComplete="description"
                                    autoFocus
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <ImageUploadCard file={file} setFile={setFile} />
                            </div>

                            <Button variant="contained" color="primary" fullWidth={true} type="submit">Post</Button>
                        </form>

                        {isSubmited ? (
                            <>
                                {loading ? (
                                    <div className={classes.spiner}>
                                        <CircularProgress></CircularProgress>
                                    </div>
                                ) : (<CheckCircleIcon fontSize="large" className={classes.successIcon} />)}
                            </>
                        ) : null}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

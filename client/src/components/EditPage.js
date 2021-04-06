import React, { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import authService from '../services/authService';
import ImageUpload from './ImageUpload';
import config from '../config';
import UserContext from '../UserContext';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp(props) {
    const classes = useStyles();
    document.title = 'Edit profile ● Instacars';
    const history = useHistory();
    const context = useContext(UserContext);

    const [file, setFile] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    async function handleEdit(e) {
        e.preventDefault();
        let userId = context.user._id;
        if (file) {
            let cloudinaryData = new FormData();
            cloudinaryData.append('upload_preset', config.CLAUDINARY_PRESET_NAME);
            cloudinaryData.append('file', file);

            let cloudinaryResponse = await fetch(`${config.CLAUDINARY_API_URL}/image/upload`, {
                method: 'POST',
                body: cloudinaryData,
            });

            let image = await cloudinaryResponse.json();
            setProfileImage(image.secure_url);
        }

        let res = await authService.edit({ email, fullName, profileImage, bio, username, userId });
        console.log('hello');
        history.push('/');
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await authService.getUser(props.match.params.id);
            if (data.result) {
                console.log('eidt pga', data);
                const { email, fullName, username, bio, profileImage } = data.result;
                setEmail(email);
                setFullName(fullName);
                setUsername(username);
                setBio(bio);
                setProfileImage(profileImage);
            }
        };

        fetchData();
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit profile
                </Typography>
                <form className={classes.form} noValidate onSubmit={(e) => handleEdit(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="uname"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Bio"
                                type="text"
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ImageUpload file={file} setFile={setFile} />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Save changes
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to={`/profile/${context.user._id}`} variant="body2">
                                Go back
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
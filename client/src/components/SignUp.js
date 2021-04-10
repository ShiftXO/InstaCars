import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Toaster from './Toaster';

import authService from '../services/authService';
import ImageUpload from './ImageUpload';
import config from '../config';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/">
                Instacars
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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

export default function SignUp() {
    document.title = 'Register'
    const classes = useStyles();
    const history = useHistory();
    const [errors, setErrors] = useState({});

    const [file, setFile] = useState();
    //const [imageUrl, setImageUrl] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    async function handleRegister(e) {
        e.preventDefault();
        let errors = validate();
        setErrors(errors);
        let imageUrl = '';

        if (file) {
            let cloudinaryData = new FormData();
            cloudinaryData.append('upload_preset', config.CLAUDINARY_PRESET_NAME);
            cloudinaryData.append('file', file);

            let cloudinaryResponse = await fetch(`${config.CLAUDINARY_API_URL}/image/upload`, {
                method: 'POST',
                body: cloudinaryData,
            });

            let image = await cloudinaryResponse.json();
            imageUrl = image.secure_url;
        }

        if (Object.keys(errors).length == 0) {
            let res = await authService.register({ email, fullName, imageUrl, username, password });
            if (res.error) {
                let errorObj = { ...res.error }
                setMessage(errorObj.message)
                setOpen(true);
            } else {
                history.push('/');
            }
        }
    }

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
        ) {
            errors.email = 'Invalid email address';
        }

        if (!fullName) {
            errors.fullName = 'Required'
        } else if (fullName.length < 4) {
            errors.fullName = 'Full name lenght should be at least 4'
        }

        if (!username) {
            errors.username = 'Required'
        } else if (username.length < 4) {
            errors.username = 'Username lenght should be at least 4'
        }

        if (!password) {
            errors.password = 'Required'
        } else if (
            !/^(?=.*\d).{4,8}$/i.test(password)
        ) {
            errors.password = 'Password must be between 4 and 8 digits long and include at least one numeric digit.'
        }

        return errors;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {open ? (
                <Toaster open={open} type={'error'} message={message} setOpen={setOpen} />
            ) : ('')}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={(e) => handleRegister(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.email ? true : false}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="fullName"
                                variant="outlined"
                                required
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                error={errors.fullName ? true : false}
                                helperText={errors.fullName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="uname"
                                name="username"
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                error={errors.username ? true : false}
                                helperText={errors.username}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password ? true : false}
                                helperText={errors.password}
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
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
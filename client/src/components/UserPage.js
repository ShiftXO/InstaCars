import React from 'react';
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
            opacity: 0.25
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

export default function UserPage() {
    const classes = useStyles();

    return (
        <>
            <Grid container direction="row" justify="center"  >
                <Grid item xs={2} >
                    <Avatar alt="Remy Sharp" className={classes.large} src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29_2.jpg" />
                </Grid>
                <Grid container item xs={4} justify="center" >
                    <Grid container spacing={3} direction="row" justify="flex-start" >
                        <Grid item>
                            <Typography variant="h5" className={classes.username}>Billi Hlapeto</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" size="small" color="primary">follow</Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item>
                            <b>230 </b>
                            <span> posts</span>
                        </Grid>
                        <Grid item>
                            <b>1.5m </b>
                            <span>followers</span>
                        </Grid>
                        <Grid item>
                            <b>23 </b>
                            <span>following</span>
                        </Grid>
                    </Grid>
                    <Grid container item>
                        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id nulla id elit gravida accumsan. Morbi odio nunc, euismod eget urna vitae, molestie elementum ex. Pellentesque nec tellus turpis. Nulla sagittis magna at finibus placerat. Duis nisi odio, ullamcorper eu gravida at, facilisis sed urna. Phasellus eu orci vel leo vulputate euismod. Proin egestas urna dui, non blandit massa eleifend ut. Donec a pharetra mauris. In varius tristique nisi, quis vestibulum lectus auctor nec. Nullam lorem purus, facilisis in arcu sit amet, aliquam malesuada ipsum. Mauris malesuada turpis bibendum justo viverra egestas.</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider component="hr" variant="fullWidth" />

            <Grid className={classes.imageContainer} container >
                <Grid item xs={4} >
                    <img className={classes.image} src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29_2.jpg" />
                </Grid>
                <Grid item xs={4} >
                    <img className={classes.image} src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29_2.jpg" />
                </Grid>
                <Grid item xs={4} >
                    <img className={classes.image} src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29_2.jpg" />
                </Grid>
                <Grid item xs={4} >
                    <img className={classes.image} src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29_2.jpg" />
                </Grid>
            </Grid>
        </>
    );
}
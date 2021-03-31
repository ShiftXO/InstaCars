import React from "react";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import blue from "@material-ui/core/colors/blue";
import { withStyles } from "@material-ui/core/styles";

import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const styles = theme => ({
    root: {
        //width: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    input: {
        display: "none"
    },
    button: {
        color: blue[900],
        margin: 10
    },
});

class ImageUploadCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainState: "initial", // initial, uploaded
            imageUploaded: 0,
            selectedFile: null,
            file: null,
        }
    };

    handleUploadClick = event => {
        var file = event.target.files[0];
        console.log(file);
        this.props.setFile({
            file
        })
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                selectedFile: [reader.result]
            });
        }.bind(this);

        this.setState({
            mainState: "uploaded",
            selectedFile: event.target.files[0],
            imageUploaded: 1,
            file: reader.result
        });
        this.props.setFile(event.target.files[0]);
    };

    renderInitialState() {
        const { classes, theme } = this.props;
        const { value } = this.state;

        return (
            <React.Fragment>
                <CardContent>
                    <Grid container justify="center" alignItems="center">
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            type="file"
                            name="file"
                            value={this.selectedFile}
                            onChange={this.handleUploadClick}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab component="span" className={classes.button}>
                                <AddPhotoAlternateIcon />
                            </Fab>
                        </label>
                    </Grid>
                </CardContent>
            </React.Fragment>
        );
    }

    renderUploadedState() {
        const { classes, theme } = this.props;

        return (
            <React.Fragment>
                <CardActionArea onClick={this.imageResetHandler}>
                    <img
                        width="100%"
                        className={classes.media}
                        src={this.state.selectedFile}
                    />
                </CardActionArea>
            </React.Fragment>
        );
    }

    imageResetHandler = event => {
        console.log("Click!");
        this.setState({
            mainState: "initial",
            selectedFile: null,
            imageUploaded: 0
        });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Card className={this.props.cardName}>
                        {(this.state.mainState == "initial" && this.renderInitialState()) ||
                            (this.state.mainState == "uploaded" &&
                                this.renderUploadedState())}
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);

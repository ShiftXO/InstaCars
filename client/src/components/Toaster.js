import { React, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

export default function Toaster(props) {
    const [open, setOpen] = useState(props.open);
    console.log(props);
    const handleClose = () => {
        //setOpen(false);
        props.setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            open={open}
            onClose={handleClose}
            autoHideDuration={6000}>
            <Alert severity={props.type}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}

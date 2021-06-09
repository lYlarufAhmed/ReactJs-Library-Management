import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";

export default function FeedbackDialog({open, handleClose, feedback}) {
    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Feedback!</DialogTitle>
            <DialogContent>
                <DialogContentText color={feedback === 'Success!' ? 'primary' : 'secondary'}>
                    {feedback}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}
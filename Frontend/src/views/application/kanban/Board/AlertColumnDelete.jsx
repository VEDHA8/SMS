import PropTypes from 'prop-types';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ==============================|| KANBAN BOARD - COLUMN DELETE ||============================== //

export default function AlertColumnDelete({ title, open, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            keepMounted
            maxWidth="xs"
            aria-labelledby="column-delete-title"
            aria-describedby="column-delete-description"
        >
            {open && (
                <>
                    <DialogTitle id="column-delete-title">{title} - Are you sure you want to delete?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="column-delete-description">
                            By deleting column, all task inside that column will also be deleted.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ mr: 2 }}>
                        <Button onClick={() => handleClose(false)} color="error">
                            Cancel
                        </Button>
                        <Button variant="contained" size="small" onClick={() => handleClose(true)} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}

AlertColumnDelete.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string
};

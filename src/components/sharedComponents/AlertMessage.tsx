import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertMessage({
    title = "",
    isOpenModal = false,
    isSuccess = false,
    setIsOpenModal = (value: boolean) => { },
}: any) {
    const handleClose = () => {
        setIsOpenModal(false);
    };

    return (
        <React.Fragment>
            {/* <Button variant="outlined">
        Open alert dialog
      </Button> */}
            <Dialog
                open={isOpenModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className='flex flex-col items-center' style={{ minWidth: 250 }}>
                            {isSuccess ? <svg width="40" height="40" viewBox="0 0 40 40" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="20" cy="20" r="19.375" stroke="#66CD66" stroke-width="1.25" />
                                <path d="M10 21.5352L17.3446 27.2L30 13.2" stroke="#66CD66" stroke-width="1.25" />
                            </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#fff">
                                    <path d="M16 8L8 16M8.00001 8L16 16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                     stroke="#fc1717" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>}
                            {title && <p className="font-bold mt-3">{title}</p>}
                        </div>
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                    <Button>Cancel</Button>
                    <Button onClick={handleClose} autoFocus> Save </Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    );
}
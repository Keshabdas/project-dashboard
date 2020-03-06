import React, {useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import MultilineTextFields from './SelectInputField';

const dialogStyle = makeStyles(theme => ({
  dialog: {
    width: '100%',
  },
  fullWidth: {
    width: "100%",
  }
}))

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: "550px",
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);



export default function CustomizedDialogs({open, handleClose, AddRow, PriorityValues, formattedTime, Catergories}) {
  const classes = dialogStyle();

  const [Category, setCategory] = useState('');
  const [Priority, setPriority] = useState('');

  const onChangeCatergoryHandler = (Value) => {
    setCategory(Value);
  };

  const onChangePriorityHandler = (Value) => {
    setPriority(Value)
  };

  const handleSubmit = () =>{
    let RowData = {
      ProjectName : document.getElementById('ProjectName').value,
      ClientName : document.getElementById('ClientName').value,
      ContactPerson : document.getElementById('ContactPerson').value,
      category :Category,
      Priority : Priority || 'Low',
      remarks: document.getElementById('remarks').value || 'no remarks yet',
    }
    AddRow(RowData)
  }

  
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} className={classes.fullWidth}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Project
        </DialogTitle>
        <DialogContent dividers>
          <div >
            <TextField  
              required
              id="ProjectName"
              label="Project Name"
              margin="normal"
              variant="outlined"
              defaultValue="Default Value"
              className={classes.fullWidth}
            />
          </div>
          <div>
            <TextField
              required
              id="ClientName"
              label="Client Name"
              margin="normal"
              variant="outlined"
              defaultValue="Default Value"
              className={classes.fullWidth}
            />
          </div>
          <div>
            <TextField
              required
              id="ContactPerson"
              label="Contact Person"
              margin="normal"
              variant="outlined"
              defaultValue="Default Value"
              className={classes.fullWidth}
            />
          </div>
          <div>
            <MultilineTextFields status={"3D"} onChangeHandle={onChangeCatergoryHandler} options={Catergories} formattedTime={formattedTime}  inputLabel="Select Category" />
          </div>
          <div>
            <MultilineTextFields status={"Low"} onChangeHandle={onChangePriorityHandler} options={PriorityValues} formattedTime={formattedTime}  inputLabel="Select Priority" />
          </div>
          <div> 
            <TextField
                id="remarks"
                label="Remarks"
                multiline
                rows="2"
                defaultValue="Type your remarks here"
                margin="normal"
                className={classes.fullWidth}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

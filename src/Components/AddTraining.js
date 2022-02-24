import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: null,
        duration: '',
        activity: '',
        customer: props.link
    });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name] : event.target.value});
    }

    const handleSave = () => {
        props.addTraining(training);
        setOpen(false);
    }

    const handleDateChange = (date) => {
      setTraining({...training, date: date.toISOString() })
      console.log(date.toISOString())
  }

    return (
        <div>
      <Button style={{ marginTop: 10 }} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <DateTimePicker
            format="dd-MM-y, hh:mm a"
            margin="dense"
            label="Date"
            name="date"
            value={training.date}
            onChange={handleDateChange}
            fullWidth
          /> 
          </MuiPickersUtilsProvider>
           <TextField
            margin="dense"
            label="Duration"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            fullWidth
          />
           <TextField
            margin="dense"
            label="Activity"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;
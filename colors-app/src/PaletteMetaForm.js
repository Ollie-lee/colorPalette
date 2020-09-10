import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

export default function PaletteMetaForm(props) {
  const { handleSubmit,
    handleInputChange,
    input,
    setFormShowing
  } = props
  const [open, setOpen] = React.useState(true);


  const handleClose = () => {
    setFormShowing(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your new palette...
            Make sure it's unique!
          </DialogContentText>
          <TextValidator
            value={input["newPaletteName"]}
            onChange={handleInputChange}
            name='newPaletteName'
            validators={['required', 'isPaletteNameUnique']}
            errorMessages={['Please enter the palette name~', 'Palette name needs to be unique~']}
            label='Palette Name'
            fullWidth
            margin='normal'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            type='submit'
          >
            Save Palette
              </Button >
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}

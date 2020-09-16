import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  addColor: {
    width: '100%',
    padding: '.5rem 1rem',
    marginTop: '1rem',
    fontSize: '1.5rem'
  },
  colorNameInput: {
    width: '100%',
    height: '70px',
  }
}));

export default function ColorPickerForm(props) {
  const classes = useStyles();
  const {
    ColorPicker,
    addNewColor,
    input,
    handleInputChange,
    colors,
    maxColors,
    currentColor,

  } = props

  return (
    <div className={classes.root}>
      <ColorPicker />

      <ValidatorForm 
      onSubmit={addNewColor}
      instantValidate={false}
      >
        <TextValidator
          value={input["newColorName"]}
          onChange={handleInputChange}
          name='newColorName'
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={['this field is required', 'same color name existed', 'same color already used']}
          className={classes.colorNameInput}
          variant='filled'
          margin='normal'
          placeholder='Color Name'
        />

        <Button
          variant='contained'
          color='primary'
          style={{
            backgroundColor: colors.length >= maxColors
              ? 'grey'
              : currentColor
          }}
          type={"submit"}
          disabled={colors.length >= maxColors}
          className={classes.addColor}
        >
          {colors.length >= maxColors ? 'Palette is full' : 'Add color'}
        </Button>
      </ValidatorForm>


    </div>
  )
}

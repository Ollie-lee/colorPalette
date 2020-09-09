import React, { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


export default function ColorPickerForm(props) {
  const {
    ColorPicker,
    addNewColor,
    input,
    handleInputChange,
    colors,
    maxColors,
    currentColor
  } = props

  return (
    <>
      <ColorPicker />

      <ValidatorForm onSubmit={addNewColor}>
        <TextValidator
          value={input["newColorName"]}
          onChange={handleInputChange}
          name='newColorName'
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={['this field is required', 'same color name existed', 'same color already used']}
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
        >
          {colors.length >= maxColors ? 'Palette is full' : 'Add color'}
        </Button>
      </ValidatorForm>


    </>
  )
}

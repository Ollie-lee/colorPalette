import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useInputChange } from './hooks/useInputChange'
import DraggableColorList from './DraggableColorList'
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav'

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

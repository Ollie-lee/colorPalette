import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom'

export default function PaletteFormNav(props) {

  const { classes,
    open,
    handleDrawerOpen,
    handleInputChange,
    handleSubmit,
    input
  } = props
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color='default'
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              value={input["newPaletteName"]}
              onChange={handleInputChange}
              name='newPaletteName'
              validators={['required', 'isPaletteNameUnique']}
              errorMessages={['Please enter the palette name~', 'Palette name needs to be unique~']}
              label='Palette Name'
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
            >
              Save Palette
          </Button >
            <Link
              to='/'
            >
              <Button
                variant='contained'
                color='secondary'
              >Go Back</Button>
            </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>

    </>
  )
}

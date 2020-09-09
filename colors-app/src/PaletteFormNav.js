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
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navBtns: {

  }
}));

export default function PaletteFormNav(props) {
  const classes = useStyles();
  const {
    open,
    handleDrawerOpen,
    handleInputChange,
    handleSubmit,
    input
  } = props
  return (
    <React.Fragment className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color='default'
      >
        <Toolbar
          className={classes.toolBar}
        >
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
            Create a Palette
          </Typography>

          <div
            className={classes.navBtns}
          >
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
            </ValidatorForm>
            <Link
              to='/'
            >
              <Button
                variant='contained'
                color='secondary'
              >Go Back</Button>
            </Link>
          </div>

        </Toolbar>
      </AppBar>

    </React.Fragment >
  )
}
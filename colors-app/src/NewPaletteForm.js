import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker, SketchPicker } from 'react-color';
import { Button } from '@material-ui/core';
import DraggableColorBox from './DraggableColorBox'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useInputChange } from './hooks/useInputChange'


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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height: "calc(100vh - 64px)",
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NewPaletteForm() {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState([{ color: 'blue', name: 'blue' }])
  const [currentColor, setCurrentColor] = useState("teal");
  //customized hook, control input
  // initial value of input is an empty object
  //which includes different input's data
  const [input, handleInputChange, resetInputChange] = useInputChange()

  useEffect(() => {
    //add customized validator
    // value:the value of input
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => (
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    ));
    ValidatorForm.addValidationRule('isColorUnique', (value) => (
      colors.every(({ color }) => color !== currentColor)
    ));
  }, [colors, currentColor])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: input["newName"]
    }
    resetInputChange("newName")
    setColors([...colors, newColor])
  }

  const ColorPicker = () => {


    const handleColorChange = (color) => {
      setCurrentColor(color.hex)
    };

    const handleSmoothChange = (color) => {

    }



    return (
      <div className="color-picker">
        <ChromePicker
          color={currentColor}
          onChangeComplete={handleColorChange}
          onChange={handleSmoothChange}
        />
      </div>
    );
  };


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
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
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        <Typography variant='h4'>
          Design you palette!
        </Typography>
        <div>
          <Button variant='contained' color='secondary'>
            Clear Palette
          </Button>
          <Button variant='contained' color='primary'>
            random Color
            </Button>
        </div>
        <ColorPicker />

        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            value={input["newName"]}
            onChange={handleInputChange}
            name='newName'
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['this field is required', 'same color name existed', 'same color already used']}
          />

          <Button
            variant='contained'
            color='primary'
            style={{ backgroundColor: currentColor }}
            type={"submit"}
          >
            Add color
          </Button>
        </ValidatorForm>


      </Drawer>
      <main
        //conditionally add classes.contentShift if open is true
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        {colors.map(color => (
          <DraggableColorBox
            color={color.color}
            name={color.name}
          />
        ))}

      </main>
    </div>
  )
}


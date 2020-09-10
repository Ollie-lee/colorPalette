import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
import ColorPickerForm from './ColorPickerForm'
// import useStyles from './styles/NewPaletteFormStyle'

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    display: 'flex',
    alignItems: "center"
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
  container: {
    height: '100%',
    width: '90%',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    width: '100%',
  },
  button: {
    width: '50%',
  },
  picker: {
    marginTop: '2rem'
  }
}));

NewPaletteForm.defaultProps = {
  maxColors: 20
}

export default function NewPaletteForm(props) {
  const { maxColors } = props
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [colors, setColors] = useState(props.palettes[0].colors)
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
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
      props.palettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    ));
  }, [colors, currentColor, props.palettes])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: input["newColorName"]
    }
    resetInputChange("newColorName")
    setColors([...colors, newColor])
  }

  const deleteColorBox = (clickedColorName) => {
    const newColors = colors.filter(color => color.name !== clickedColorName)
    setColors(newColors);
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
          className={classes.picker}
          width='100%'
        />
      </div>
    );
  };

  const handleSubmit = (emoji) => {
    let newName = input["newPaletteName"];
    const newPalette = {
      paletteName: newName,
      colors: colors,
      id: newName.toLowerCase().replace(/ /g, "-"),
      emoji: emoji
    }
    props.savePalette(newPalette);
    //redirect to homepage
    props.history.push('/')
  }

  const handleRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * props.palettes[0].colors.length)
    setColors([...colors, props.palettes[0].colors[randomIndex]])
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };


  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
      />
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
        <div className={classes.container}>
          <Typography variant='h4' gutterBottom >
            Design you palette!
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => setColors([])}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={handleRandomColor}
              disabled={colors.length >= maxColors}
              className={classes.button}
            >
              random Color
            </Button>
          </div>
          <ColorPickerForm
            ColorPicker={ColorPicker}
            addNewColor={addNewColor}
            input={input}
            handleInputChange={handleInputChange}
            colors={colors}
            maxColors={maxColors}
            currentColor={currentColor}
          />
        </div>
      </Drawer>
      <main
        //conditionally add classes.contentShift if open is true
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors} //sortable items
          deleteColorBox={deleteColorBox}
          axis='xy'
          onSortEnd={onSortEnd}
        />


      </main>
    </div>
  )
}


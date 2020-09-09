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
import ColorPickerForm from './ColorPickerForm'


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

NewPaletteForm.defaultProps = {
  maxColors: 20
}

export default function NewPaletteForm(props) {
  const { maxColors } = props
  const classes = useStyles();
  const theme = useTheme();
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
        />
      </div>
    );
  };

  const handleSubmit = () => {
    let newName = input["newPaletteName"];
    const newPalette = {
      paletteName: newName,
      colors: colors,
      id: newName.toLowerCase().replace(/ /g, "-"),
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
        classes={classes}
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
        <Typography variant='h4'>
          Design you palette!
        </Typography>
        <div>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setColors([])}
          >
            Clear Palette
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={handleRandomColor}
            disabled={colors.length >= maxColors}
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


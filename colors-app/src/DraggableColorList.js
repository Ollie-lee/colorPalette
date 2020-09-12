import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    "@media only screen and (max-width: 700px)": {
      marginTop: '4rem'
    },
    "@media only screen and (max-width: 550px)": {
      marginTop: '6rem'
    },
  },


}));

const DraggableColorList = SortableContainer(({
  colors,
  deleteColorBox
}) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}>
      {/* the height of DraggableColorBox is relative to its parent
      however the first div has no height, so we set 100% to recover */}
      {colors.map((color, i) => (
        <DraggableColorBox
          key={color.name}
          color={color.color}
          name={color.name}
          deleteColorBox={() => deleteColorBox(color.name)}
          //for dnd
          index={i}
        />
      ))}
    </div>
  );
})

export default DraggableColorList

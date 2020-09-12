import React from 'react'
import { withStyles } from '@material-ui/styles'
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import { SortableElement } from 'react-sortable-hoc'


const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    "&:hover svg": {
      color: "white",
      transform: 'scale(1.5)',
    },
    "& svg": {
      transition: 'all 0.2s ease-in-out'

    },
    "@media only screen and (max-width: 900px)":{
      width: '25%',
      height: '20%'
    },
    "@media only screen and (max-width: 700px)":{
      width: '50%',
      height: '10%'
    },
    "@media only screen and (max-width: 500px)":{
      width: '100%',
      height: '5%'
    },
  },
  boxContent: {
    position: 'absolute',
    padding: '10px',
    width: '100%',
    left: '0px',
    bottom: '0px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    color: 'rgba(0,0,0,0.5)',
  },
  deleteIcon: {
  }
}

const DraggableColorBox = SortableElement((props) => {
  const { classes, name, deleteColorBox } = props;

  // const handleDeleteColorBox = () => {
  //   props.deleteColorBox(name)
  // }

  return (
    <div
      style={{ backgroundColor: props.color }}
      className={classes.root}
    >
      <div className={classes.boxContent}>
        <span>{props.name}</span>
        <span
          className={classes.deleteIcon}
          onClick={deleteColorBox}
        ><DeleteForeverTwoToneIcon /></span>
      </div>
    </div>
  )
})

export default withStyles(styles)(DraggableColorBox)

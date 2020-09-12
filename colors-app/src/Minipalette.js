import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MinipaletteStyle'
import DeleteIcon from '@material-ui/icons/Delete'

function Minipalette(props) {
  const { classes,
    paletteName,
    emoji,
    colors,
    deletePalette,
    id
  } = props
  const miniColorBoxes = colors.map((color) => {
    return <div className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}

    ></div>
  })

  const handleDeletePalette = (e) => {
    e.stopPropagation();
    deletePalette(id);
  }

  return (
    <div className={classes.root}
      onClick={props.goToPalette}
    >
      <div className={classes.delete}>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={handleDeletePalette}
        />
      </div>
      <div className={classes.colors}>
        {/* mini color boxes */}
        {miniColorBoxes}
      </div>
      <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>

    </div>
  )
}

export default withStyles(styles)(Minipalette)

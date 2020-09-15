import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MinipaletteStyle'
import DeleteIcon from '@material-ui/icons/Delete'

const Minipalette = React.memo((props) => {
  const { classes,
    paletteName,
    emoji,
    colors,
    deletePalette,
    id,
    openDialog,
    updateSelectedId
  } = props
  const miniColorBoxes = colors.map((color) => {
    return <div className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}

    ></div>
  })
  console.log("paletteName", paletteName)

  const handleDeletePalette = (e) => {
    e.stopPropagation();
    // deletePalette(id);
    updateSelectedId(id)
    openDialog()
  }
  return (
    <div className={classes.root}
      onClick={() => props.goToPalette(id)}
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
})

export default withStyles(styles)(Minipalette)

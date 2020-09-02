import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/MinipaletteStyle'

function Minipalette(props) {
  const { classes, paletteName, emoji, colors } = props
  const miniColorBoxes = colors.map((color) => {
    return <div className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}

    ></div>
  })

  return (
    <div className={classes.root}
      onClick={props.goToPalette}
    >
      <div className={classes.colors}>
        {/* mini color boxes */}
        {miniColorBoxes}
      </div>
      <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>

    </div>
  )
}

export default withStyles(styles)(Minipalette)

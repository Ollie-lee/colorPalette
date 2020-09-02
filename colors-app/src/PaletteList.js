import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Minipalette from './Minipalette'
import { withStyles } from '@material-ui/core/styles';
import Palette from './Palette';
import styles from './styles/PaletteListStyle'



class PaletteList extends Component {

  goToPalette = (id) => {
    this.props.history.push(`/palette/${id}`)
  }

  render() {
    const { palettes, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>

          <nav className={classes.nav}>
            {/* header */}
            <h1>React Colors</h1>
          </nav>
          <div className={classes.palettes}>
            {/* bunch of palettes */}
            {palettes.map(palette =>
              <Minipalette {...palette}
                goToPalette={() => this.goToPalette(palette.id)}
                // onClick={() => this.props.history.push(`/palette/${palette.id}`)}
              />
            )}
          </div>
        </div>

      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)

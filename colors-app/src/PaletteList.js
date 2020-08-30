import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Minipalette from './Minipalette'
import { withStyles } from '@material-ui/core/styles';
import Palette from './Palette';

const styles = {
  root: {
    backgroundColor: "blue",
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',

  },
  nav: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color:'white'
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3,30%)',
    gridGap: '5%'
  }
}

class PaletteList extends Component {
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
              <Minipalette {...palette} />
            )}
          </div>
        </div>

      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)

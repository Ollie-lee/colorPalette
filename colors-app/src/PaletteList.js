import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Minipalette from './Minipalette'
import { withStyles } from '@material-ui/core/styles';
import Palette from './Palette';
import styles from './styles/PaletteListStyle'
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';


class PaletteList extends Component {

  goToPalette = (id) => {
    this.props.history.push(`/palette/${id}`)
  }

  render() {
    const { palettes, classes, deletePalette } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>

          <nav className={classes.nav}>
            {/* header */}
            <h1>React Colors</h1>
            <Link to='/palette/new'>Create palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {/* bunch of palettes */}
            {palettes.map(palette =>
              <CSSTransition
                key={palette.id}
                classNames='fade'
                timeout={500}
              >
                <Minipalette {...palette}
                  goToPalette={() => this.goToPalette(palette.id)}
                  deletePalette={deletePalette}
                  key={palette.id}
                // onClick={() => this.props.history.push(`/palette/${palette.id}`)}
                />
              </CSSTransition>
            )}
          </TransitionGroup>
        </div>

      </div>
    )
  }
}

export default withStyles(styles)(PaletteList)

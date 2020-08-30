import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Minipalette from './Minipalette'

export default class PaletteList extends Component {
  render() {
    const { palettes } = this.props;

    return (
      <div>
        <h1>React colors</h1>
        {palettes.map(palette =>
          // <p>
          //   {/* <Link to={`/palette/${palette.id}`}><Minipalette /></Link> */}
          // </p>
          <Minipalette {...palette} />
        )}
      </div>
    )
  }
}

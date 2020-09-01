import React, { Component } from 'react'
import { colors } from '@material-ui/core'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'

export default class SingleColorPalette extends Component {

  constructor(props) {
    super(props)
    const { palette, colorId } = this.props
    this._shades = this.gatherShades(palette, colorId)
    this.state = { format: 'hex' }
  }


  gatherShades = (palette, colorTofFilterBy) => {
    let shades = []
    let allColors = palette.colors
    for (const key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorTofFilterBy)
      )
    }
    return shades.slice(1)
  }

  changeFormat = (val) => {
    this.setState({ format: val })
  }
  render() {
    const { format } = this.state
    const { paletteName, emoji } = this.props.palette
    const colorBoxes = this._shades.map((color) =>
      <ColorBox key={color.id}
        name={color[format]}
        background={color[format]}
        showLink={false} />
    )
    return (
      <div className='Palette' >
        <Navbar
          handleChange={this.changeFormat}
          showingAllColors={false}
        />
        <div className='Palette-colors'>{colorBoxes}</div>
        <PaletteFooter
          paletteName={paletteName}
          emoji={emoji}
        />
      </div>
    )
  }
}

import React, { Component } from 'react'
import { colors } from '@material-ui/core'
import ColorBox from './ColorBox'

export default class SingleColorPalette extends Component {

  constructor(props) {
    super(props)
    const { palette, colorId } = this.props
    this._shades = this.gatherShades(palette, colorId)
  }


  gatherShades = (palette, colorTofFilterBy) => {
    let shades = []
    let allColors = palette.colors
    for (const key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorTofFilterBy)
      )
    }
    console.log("SingleColorPalette -> gatherShades -> shades.slice(1)", shades.slice(1))
    return shades.slice(1)
  }
  render() {
    const colorBoxes = this._shades.map((color) =>
      <ColorBox key={color.id}
        name={color.name}
        background={color.hex}
        showLink={false} />
    )
    return (
      <div className='Palette'>
        SingleColorPalette
        <div className='Palette-colors'>{colorBoxes}</div>
      </div>
    )
  }
}

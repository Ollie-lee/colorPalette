import React, { Component } from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import './Palette.css'
export class Palette extends Component {
    state = { level: 500, format: 'hex' }
    changeLevel = (newLevel) => {
        this.setState({ level: newLevel })
    }

    changeFormat = (val) => {
        this.setState({ format: val })
    }

    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color =>
            (<ColorBox background={color[format]}
                name={color[format]}
                key={color.id}
                id={color.id}
                paletteId={id} />))
        return (
            <div className='Palette'>
                <Navbar level={level}
                    changeLevel={this.changeLevel}
                    handleChange={this.changeFormat} />

                {/* todo: navbar */}
                <div className='Palette-colors'>
                    {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* footer eventually */}
                <footer className='Palette-footer'>
                    {paletteName}
                    <span className='emoji'>{emoji}</span>
                </footer>
            </div>
        )
    }
}

export default Palette

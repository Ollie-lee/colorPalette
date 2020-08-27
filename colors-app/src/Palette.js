import React, { Component } from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import './Palette.css'
export class Palette extends Component {
    state = { level: 500 }
    changeLevel = (newLevel) => {
        this.setState({ level: newLevel })
    }
    render() {
        const { colors } = this.props.palette;
        const { level } = this.state;
        const colorBoxes = colors[level].map(color =>
            (<ColorBox background={color.hex}
                name={color.name} />))
        return (
            <div className='Palette'>
                <Navbar level={level} changeLevel={this.changeLevel} />

                {/* todo: navbar */}
                <div className='Palette-colors'>
                    {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* footer eventually */}
            </div>
        )
    }
}

export default Palette

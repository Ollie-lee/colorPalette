import React, { Component } from 'react'
import ColorBox from './ColorBox'
import './Palette.css'
export class Palette extends Component {

    render() {
        const colorBoxes = this.props.palette.colors[600].map(color =>
            (<ColorBox background={color.hex}
                name={color.name} />))
        return (
            <div className='Palette'>
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

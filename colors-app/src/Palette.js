import React, { Component } from 'react'
import ColorBox from './ColorBox'
import 'rc-slider/assets/index.css';

import './Palette.css'
import Slider, { Range } from 'rc-slider';
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
                <div className='slider'>
                    <Slider defaultValue={this.state.level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={this.changeLevel} />
                </div>

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

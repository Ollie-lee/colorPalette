import React, { Component } from 'react'
import 'rc-slider/assets/index.css';
import './Navbar.css'
import Slider, { Range } from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';



export class Navbar extends Component {
  state = { format: 'hex' }
  handleChange = (e) => {
    this.setState({ format: e.target.value }, () => {
      this.props.handleChange(this.state.format)
    })
  }

  render() {
    const { level, changeLevel} = this.props;
    const { format } = this.state;

    return (
      <header className='Navbar'>
        <div className='logo'>
          <a href="/">react color picker</a>
        </div>
        <div className='slider-container'>
          <span>Level: {level}</span>
          <div className='slider'>
            <Slider defaultValue={level}
              min={100}
              max={900}
              step={100}
              onAfterChange={changeLevel} />
          </div>
        </div>

        <div className='select-container'>
          <Select value={format} onChange={this.handleChange}>
            <MenuItem value='hex'>Hex - #ffffff</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>

          </Select>
        </div>
      </header>
    )
  }
}

export default Navbar

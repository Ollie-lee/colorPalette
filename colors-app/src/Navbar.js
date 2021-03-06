import React, { Component } from 'react'
import 'rc-slider/assets/index.css';
import './styles/Navbar.css'
import Slider, { Range } from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'



export class Navbar extends Component {
  static defaultProps = {
    showingAllColors: true
  }
  state = { format: 'hex', open: false }
  handleFormatChange = (e) => {
    this.setState({ format: e.target.value }, () => {
      this.props.handleChange(this.state.format)
      this.setState({ open: true })
    })
  }

  closeSnackbar = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    this.setState({ open: false })
  }
  render() {
    const { level, changeLevel, showingAllColors } = this.props;
    const { format, open } = this.state;

    return (
      <header className='Navbar'>
        <div className='logo'>
          <Link to='/'>react color picker</Link>
        </div>
        {showingAllColors && (
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
        )}

        <div className='select-container'>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value='hex'>Hex - #ffffff</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0)</MenuItem>

          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={3000}
          message={<span id='message-id'>Format changed to {format.toUpperCase()} now~</span>}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          action={[
            <IconButton onClick={this.closeSnackbar}
              color={'inherit'}
              key='close'
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          ]}
          onClose={this.closeSnackbar}

        />
      </header>
    )
  }
}

export default Navbar

import React, { Component } from 'react'
import './styles/ColorBox.css'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom'
import chroma from 'chroma-js'


export default class ColorBox extends Component {
    static defaultProps = {
        showLink: true
    }
    state = { copied: false }

    changeCopyState = () => {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500)
        })
    }
    render() {
        const { name, background, paletteId,
            id, showLink } = this.props
        const { copied } = this.state;
        const isDarkColor = chroma(background).luminance() <= 0.05
        const isLightColor = chroma(background).luminance() >= 0.8

        return (
            <div style={{ background }} className='ColorBox' >
                <div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
                <div className={`copy-msg ${copied && 'show'} ${isLightColor && 'dark-text'}`}>
                    <h1>Copied!</h1>
                    <p>{name}</p>
                </div>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span className={`${isDarkColor && 'light-text'}`}>{name}</span>
                    </div>
                    <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                        <button className='copy-button'>
                            Copy
                        </button>
                    </CopyToClipboard>
                </div>

                {/* prevent trigger this.changeCopyState */}
                {showLink && (<Link to={`/palette/${paletteId}/${id}`} onClick={(e) => e.stopPropagation()}>
                    <span className={`see-more ${isLightColor && 'dark-text'}`}>More</span>
                </Link>)}
            </div >
        )
    }
}

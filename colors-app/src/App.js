import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import Palette from './Palette'
import seedColors from './seedColors'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import './App.css'
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from "./colorHelper";
import { TransitionGroup, CSSTransition } from 'react-transition-group'

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))

  const [palettes, setPalettes] = useState(savedPalettes || seedColors)

  const findPalette = (id) => {
    return palettes.find((palette) => {
      //return the first object in the array
      return palette.id === id
    })
  }

  const savePalette = (newPalette) => {
    //setPalettes is still async
    setPalettes([...palettes, newPalette]);
  }

  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes))
  }, [palettes])

  const deletePalette = (id) => {
    const newPalettes = palettes.filter((palette) => palette.id !== id)
    setPalettes(newPalettes)
  }

  return (
    <Route render={({ location }) => (
      <TransitionGroup>
        <CSSTransition
          classNames='fade'
          key={location.key}
          timeout={500}
        >
          <Switch location={location}>
            <Route exact path='/' render={(routeProps) =>
              <div className='page'>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                  {...routeProps}
                />
              </div>} />

            <Route exact
              path='/palette/new'
              render={(routeProps) =>
                <div className='page'>
                  <NewPaletteForm
                    savePalette={savePalette}
                    palettes={palettes}
                    {...routeProps}
                  />
                </div>}
            />

            <Route
              exact
              path='/palette/:id'
              render={(routeProps) =>
                <div className='page'>
                  <Palette
                    palette={generatePalette(
                      findPalette(routeProps.match.params.id)
                    )} />
                </div>}
            />

            <Route
              exact
              path='/palette/:paletteId/:colorId'
              render={(routeProps) =>
                <div className='page'>
                  <SingleColorPalette
                    palette={generatePalette(
                      findPalette(routeProps.match.params.paletteId)
                    )}
                    colorId={routeProps.match.params.colorId}
                  />
                </div>}
            />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )} />

    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;

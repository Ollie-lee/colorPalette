import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import Palette from './Palette'
import seedColors from './seedColors'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import './styles/App.css'
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from "./colorHelper";
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Page from './Page'
import './styles/Page.css'


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
          classNames='page'
          key={location.key}
          timeout={500}
        >
          <Switch location={location}>
            <Route exact path='/' render={(routeProps) =>
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                  {...routeProps}
                />
              </Page>} />

            <Route exact
              path='/palette/new'
              render={(routeProps) =>
                <Page>
                  <NewPaletteForm
                    savePalette={savePalette}
                    palettes={palettes}
                    {...routeProps}
                  />
                </Page>}
            />

            <Route
              exact
              path='/palette/:id'
              render={(routeProps) =>
                <Page>
                  <Palette
                    palette={generatePalette(
                      findPalette(routeProps.match.params.id)
                    )} />
                </Page>}
            />

            <Route
              exact
              path='/palette/:paletteId/:colorId'
              render={(routeProps) =>
                <Page>
                  <SingleColorPalette
                    palette={generatePalette(
                      findPalette(routeProps.match.params.paletteId)
                    )}
                    colorId={routeProps.match.params.colorId}
                  />
                </Page>}
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

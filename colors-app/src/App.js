import React, { useState, useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import Palette from './Palette'
import seedColors from './seedColors'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import './App.css'
import NewPaletteForm from './NewPaletteForm'
import { generatePalette } from "./colorHelper";


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


  return (
    <Switch>
      <Route exact path='/' render={(routeProps) => <PaletteList
        palettes={palettes}
        {...routeProps}
      />} />

      <Route exact
        path='/palette/new'
        render={(routeProps) => <NewPaletteForm
          savePalette={savePalette}
          palettes={palettes}
          {...routeProps}
        />}
      />

      <Route
        exact
        path='/palette/:id'
        render={(routeProps) => <Palette
          palette={generatePalette(
            findPalette(routeProps.match.params.id)
          )} />}
      />

      <Route
        exact
        path='/palette/:paletteId/:colorId'
        render={(routeProps) => <SingleColorPalette
          palette={generatePalette(
            findPalette(routeProps.match.params.paletteId)
          )}
          colorId={routeProps.match.params.colorId}
        />}
      />
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
